import { createReadStream } from 'fs-extra';
import { createInterface } from 'readline';
import { ZONE, NS, A } from './types';

const processFile = async (): Promise<ZONE> => {
  // Open File here
  const fileStream = createReadStream('input.txt');

  // Async Interface for line by line processing
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  // @ts-ignore
  let Zone: ZONE = { $origin: '', ns: [], soa: {}, a: [] };

  // Iterate through file async line by line
  for await (let line of rl) {
    line = line.replace(/(^|[^\\]);.*/g, '');
    const uLine = line.toUpperCase();
    // Process file here
    if (uLine.indexOf('$ORIGIN') === 0) Zone.$origin = line.split(/\s+/g)[1];
    if (/\s+NS\s+/.test(line)) Zone.ns.push(await ProcessValueRecord(line));
    if (/\s+A\s+/.test(line)) Zone.a.push(await ProcessIPRecord(line));
  }
  return Zone;
};

const ProcessValueRecord = async (line: string): Promise<NS> => {
  const [host, , , value] = line.split(/\s+/g);
  return { host, value };
};

const ProcessIPRecord = async (line: string) => new RegExp(/(?<host>^\S{1,50}).*\s(?<ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/u).exec(line).groups as A;
// @ts-ignore
processFile().then(zone => console.log(zone.a.find(a => a.host == 'sxl-knf-kfj-cg4-fw1').ip));
