import { createReadStream } from 'fs-extra';
import { createInterface } from 'readline';
import { ZONE, NS, A, VRECORD, SOA } from './types';

const processFile = async (): Promise<ZONE> => {
  // Open File here
  const fileStream = createReadStream('input.txt');

  // Async Interface for line by line processing
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  // @ts-ignore
  let Zone: ZONE = { $origin: '', ns: [], soa: {}, a: [], cname: [], txt: [] };
  let soa = '';
  let s1
  // Iterate through file async line by line
  for await (let line of rl) {
    // Remove comments from current line
    line = line.replace(/(^|[^\\]);.*/g, '');

    // Convert current line to uppercase
    const uLine = line.toUpperCase();

    // IF upercase line has $ORIGIN then set Zone Origin to current line
    if (uLine.indexOf('$ORIGIN') === 0) Zone.$origin = line.split(/\s+/g)[1];

    if(/\s+SOA\s+/.test(uLine)) s1 = true;
    if (s1 && /(?<=\s+)\S+/.test(line)) soa = soa + line;
    if(s1 && /(?<=\s{10})\S+\s+\)/.test(line)) s1 = false;

    // Test for name server record and process with value extractor
    if (/\s+(NS|CNAME|TXT)\s+/.test(line))
      Zone[/\s+(NS|CNAME|TXT)\s+/.exec(line)[1].toLowerCase()].push({
        ...(await ProcessValueRecord(line))
      });

    // Test if IP Reccord.
    if (/\s+A\s+/.test(line)) Zone.a.push({ ...await ProcessIPRecord(line) });
  }
  soa = /\([\s\S]*?\)/gim.exec(soa)[0].replace(/\s+/gm, ' ').replace(/\(|\)/g, '').trim()

  Zone.soa = { ...RegExp(/(?<contact>^\S+)\s(?<serial>\d+)\s(?<refresh>\d+)\s(?<retry>\d+)\s(?<expire>\d+)\s(?<mttl>\d+)/g).exec(soa).groups as SOA }
  return Zone;
};

const parseSOA = async () => {

}

const ProcessValueRecord = async (line: string): Promise<VRECORD> => {
  let [host, , , value] = line.split(/\s+/g);
  value = value.replace(/\"/g, '');
  return { host, value };
};

const ProcessIPRecord = async (line: string): Promise<A> =>
  /(?<host>^\S+).*\s(?<ip>\S+)/g.exec(line).groups as A;

processFile().then(zone => console.log(zone));
