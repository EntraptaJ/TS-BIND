import { createReadStream, exists, pathExists } from 'fs-extra';
import { createInterface } from 'readline';
import { ZONE, IP, VRECORD, SOA } from './types';

const VALUEXP = /\s+(NS|CNAME|TXT)\s+/

const IPEXP = /\s+(A|AAAA)\s+/

export const processFile = async (file: string): Promise<ZONE> => {

  // Throw error if the path requested does not exists.
  if (!await pathExists(file)) throw new Error('ZONE FILE DOES NOT EXIST')
  // Open File here
  const fileStream = createReadStream(file);

  // Async Interface for line by line processing
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  // @ts-ignore
  let Zone: ZONE = { $origin: '', soa: {}, ns: [], a: [], aaaa: [], cname: [], txt: [] };
  let soa = '';
  let SOASEC;
  // Iterate through file async line by line
  for await (let line of rl) {
    // Remove comments from current line
    line = line.replace(/(^|[^\\]);.*/g, '');

    // Convert current line to uppercase
    const uLine = line.toUpperCase();

    // IF upercase line has $ORIGIN then set Zone Origin to current line
    if (uLine.indexOf('$ORIGIN') === 0) Zone.$origin = line.split(/\s+/g)[1];

    // If line is the first line of a SOA line enable SOA Parser
    if (/\s+SOA\s+/.test(uLine)) SOASEC = true;

    // Append data to SOA String
    if (SOASEC && /(?<=\s+)\S+/.test(line)) soa = soa + line;
    
    // If final line of SOA then disable SOA Mode
    if (SOASEC && /(?<=\s{10})\S+\s+\)/.test(line)) SOASEC = false;

    // Test for value record and process with value extractor
    if (VALUEXP.test(line))
      Zone[VALUEXP.exec(line)[1].toLowerCase()].push({
        ...await ProcessValueRecord(line)
      });

    // Test if IP Reccord.
    if (IPEXP.test(line)) Zone[IPEXP.exec(line)[1].toLowerCase()].push({ ...await ProcessIPRecord(line) });
  }
  // If their is no SOA at this point it is an INVALID Zone File
  if (soa.length === 0) throw new Error('INVALID ZONE FILE')
  // Extract the SOA Information into a line of the info
  soa = /\([\s\S]*?\)/gim.exec(soa)[0].replace(/\s+/gm, ' ').replace(/\(|\)/g, '').trim()

  // Extract all values with named capture groups
  Zone.soa = { ...RegExp(/(?<contact>^\S+)\s(?<serial>\d+)\s(?<refresh>\d+)\s(?<retry>\d+)\s(?<expire>\d+)\s(?<mttl>\d+)/g).exec(soa).groups as SOA }

  return Zone;
};

const ProcessValueRecord = async (line: string): Promise<VRECORD> => {
  let [host, , value1, value] = line.split(/\s+/g);
  if (!value) value = value1
  value = value.replace(/\"/g, '');
  return { host, value };
};

// Extract host and IP from Line
const ProcessIPRecord = async (line: string): Promise<IP> =>
  /(?<host>^\S+).*\s(?<ip>\S+)/g.exec(line).groups as IP;