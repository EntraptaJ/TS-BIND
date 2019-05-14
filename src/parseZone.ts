import { createInterface } from 'readline';
import { ZONE, VRECORD, SOA } from './types';
import { StringStream } from '@rauschma/stringio';

const VALUEXP = /\s+(NS|CNAME|TXT|PTR|A|AAAA)\s+/;
const VALUETST = /(NS|CNAME|TXT|PTR|A|AAAA)/;


export const parseZoneFile = async (zone: string): Promise<ZONE> => {
  // Async Interface for line by line processing
  const rl = createInterface({
    input: new StringStream(zone),
    crlfDelay: Infinity,
  });

  // @ts-ignore
  let Zone: ZONE = { $origin: '', soa: {}, ns: [], a: [], aaaa: [], cname: [], txt: [], ptr: [] };
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

    if (uLine.indexOf('$TTL') === 0) Zone.$ttl = parseInt(line.split(/\s+/g)[1], 10);

    // If line is the first line of a SOA line enable SOA Parser
    if (/\s+SOA\s+/.test(uLine)) SOASEC = true;
    // Append data to SOA String
    if (SOASEC && /(?<=\s+)\S+/.test(line)) soa = soa + line;
    // If final line of SOA then disable SOA Mode
    if (SOASEC && /(?<=\s{10})\S+\s+\)|^\s+\)/.test(line)) SOASEC = false;

    // Test for value record and process with value extractor
    if (VALUEXP.test(uLine))
      Zone[VALUEXP.exec(line)[1].toLowerCase()].push({
        ...(await ProcessValueRecord(line)),
      });
  }
  // If their is no SOA at this point it is an INVALID Zone File
  if (soa.length === 0) throw new Error('INVALID ZONE FILE');

  // Extract the SOA Information into a line of the info
  soa = /((?<=SOA\s\S+\s)|(\())[\s\S]*?\)/gim
    .exec(soa)[0]
    .replace(/\s+/gm, ' ')
    .replace(/\(|\)/g, '')
    .trim();

  // Extract all values with named capture groups
  Zone.soa = {
    ...(RegExp(/(?<contact>^\S+)\s{1,2}(?<serial>\d+)\s(?<refresh>\d+)\s(?<retry>\d+)\s(?<expire>\d+)\s(?<mttl>\d+)/g).exec(
      soa,
    ).groups as SOA),
  };

  return Zone;
};

/**
 * Extracts TTL, host, and value from a zonefile line
 * @param line line of Zonefile
 * @exmaple
 * ```ts
 * const line = '@     300    IN    NS     ns1.exmaple.xyz.'
 * const { ttl, host, value } = await ProcessValueRecord(value)
 * ```
 */
const ProcessValueRecord = async (line: string): Promise<VRECORD> => {
  let [host, ...rrRecord] = line.trim().split(/\s+/g);
  if (rrRecord.length == 1 && VALUETST.test(host)) host = '@'
  let returnObj: VRECORD = { host: host, value: '' };
  if (!isNaN(parseInt(rrRecord[0])) && rrRecord.length > 1) returnObj.ttl = parseInt(rrRecord[0]);
  returnObj.value =
    rrRecord.length > 5
      ? rrRecord
          .filter(
            (a, b) =>
              b < rrRecord.length && a !== 'TXT' && a !== (returnObj.ttl ? returnObj.ttl.toString() : undefined),
          )
          .join(',')
          .replace(/,/g, ' ')
          .replace(/\"/g, '')
      : rrRecord[rrRecord.length - 1].replace(/\"/g, '');
  return returnObj;
};
