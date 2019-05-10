import { createReadStream } from 'fs-extra';
import { createInterface } from 'readline';
import { ZONE, NS, A, VRECORD } from './types';

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

  // Iterate through file async line by line
  for await (let line of rl) {
    // Remove comments from current line
    line = line.replace(/(^|[^\\]);.*/g, '');

    // Convert current line to uppercase
    const uLine = line.toUpperCase();

    // IF upercase line has $ORIGIN then set Zone Origin to current line
    if (uLine.indexOf('$ORIGIN') === 0) Zone.$origin = line.split(/\s+/g)[1];

    // Test for name server record and process with value extractor
    if (/\s+(NS|CNAME|TXT)\s+/.test(line)) Zone[/\s+(NS|CNAME|TXT)\s+/.exec(line)[1].toLowerCase()].push(await ProcessValueRecord(line));

    // Test if IP Reccord.
    if (/\s+A\s+/.test(line)) Zone.a.push(await ProcessIPRecord(line));
  }
  return Zone;
};

const ProcessValueRecord = async (line: string): Promise<VRECORD> => {
  const [host, , , value] = line.split(/\s+/g);
  return { host, value };
};

const ProcessIPRecord = async (line: string) => new RegExp(/(?<host>^\S+).*\s(?<ip>(\d{1,3}\.\d{1,3}){3})/gu).exec(line).groups as A;

processFile().then(zone => console.log(zone));

