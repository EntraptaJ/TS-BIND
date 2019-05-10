import { createReadStream } from 'fs-extra';
import { createInterface } from 'readline';
import { ZONE, A, VRECORD, SOA } from './types';

const VALUEXP = /\s+(NS|CNAME|TXT)\s+/

export const processFile = async (file: string): Promise<ZONE> => {
  // Open File here
  const fileStream = createReadStream(file);

  // Async Interface for line by line processing
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  // @ts-ignore
  let Zone: ZONE = { $origin: '', ns: [], soa: {}, a: [], cname: [], txt: [] };
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

    if (/\s+SOA\s+/.test(uLine)) SOASEC = true;
    if (SOASEC && /(?<=\s+)\S+/.test(line)) soa = soa + line;
    if (SOASEC && /(?<=\s{10})\S+\s+\)/.test(line)) SOASEC = false;

    // Test for value record and process with value extractor
    if (VALUEXP.test(line))
      Zone[VALUEXP.exec(line)[1].toLowerCase()].push({
        ...await ProcessValueRecord(line)
      });

    // Test if IP Reccord.
    if (/\s+A\s+/.test(line)) Zone.a.push({ ...await ProcessIPRecord(line) });
  }
  soa = /\([\s\S]*?\)/gim.exec(soa)[0].replace(/\s+/gm, ' ').replace(/\(|\)/g, '').trim()

  Zone.soa = { ...RegExp(/(?<contact>^\S+)\s(?<serial>\d+)\s(?<refresh>\d+)\s(?<retry>\d+)\s(?<expire>\d+)\s(?<mttl>\d+)/g).exec(soa).groups as SOA }
  return Zone;
};

const ProcessValueRecord = async (line: string): Promise<VRECORD> => {
  let [host, , , value] = line.split(/\s+/g);
  value = value.replace(/\"/g, '');
  return { host, value };
};

const ProcessIPRecord = async (line: string): Promise<A> =>
  /(?<host>^\S+).*\s(?<ip>\S+)/g.exec(line).groups as A;