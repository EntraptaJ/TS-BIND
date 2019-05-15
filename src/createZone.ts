import { ZONE, VRECORD, SOA, SRVRECORD, MXRECORD } from './types';

let RCD: { [key: string]: string[] } = {};

export const generateZoneFile = async (zone: ZONE): Promise<string> => {
  RCD = {};

  let map = Object.entries(zone);
  const valuemap = map.filter(a => a[0] !== 'srv' && a[0] !== 'mx') as [string, string | number | SOA | VRECORD[]][];
  const prefmap = map.filter(a => a[0] === 'mx') as [string, MXRECORD[]][];
  const srvmap = map.filter(a => a[0] === 'srv') as [string, SRVRECORD[]][];
  const promises = [Promise.all(valuemap.map(async item => await processValueOBJ(item))), Promise.all(srvmap.map(async item => await processSRVOBJ(item))), Promise.all(prefmap.map(async item => await processPREFOBJ(item)))];
  await Promise.all(promises);
  const zoneText = `
$ORIGIN ${/\.\D+\.$/.test(zone.$origin) ? zone.$origin : `${zone.$origin}.`}\n
@ IN SOA ${/\.\D+\.$/.test(zone.ns[0].value) ? zone.ns[0].value : `${zone.ns[0].value}.`} ${zone.soa.contact} (
  ${zone.soa.serial}                   ; serial number
  ${zone.soa.refresh}                       ; refresh period
  ${zone.soa.retry}                        ; retry period
  ${zone.soa.expire}                     ; expire time
  ${zone.soa.mttl}                     ) ; minimum ttl

${Object.entries(RCD)
  .map(([a1, b1]) => `\n\n; ${a1.toUpperCase()} Records ${b1.join('')}`)
  .join('')}`;
  return zoneText;
};

const processValueOBJ = async ([key, a]: [string, string | number | SOA | VRECORD[]]) =>
  Array.isArray(a)
    ? a.map(async obj => {
        const line = `\n${obj.host}  ${typeof obj.ttl !== 'undefined' ? obj.ttl : ''}  IN ${key.toUpperCase()}   ${await formatValue(obj.value, key)}`;
        if (!RCD[key]) RCD[key] = [line];
        else RCD[key].push(line);
      })
    : '';

const processSRVOBJ = async ([key, a]: [string, SRVRECORD[]]) =>
  a.map(async obj => {
    const line = `\n${obj.service}.${obj.protocol}.${obj.host}  ${typeof obj.ttl !== 'undefined' ? obj.ttl : ''}   IN ${key.toUpperCase()} ${obj.priority} ${
      obj.weight
    } ${obj.port}  ${await formatValue(obj.target, key)}`;
    if (!RCD[key]) RCD[key] = [line];
    else RCD[key].push(line);
  });

export const processPREFOBJ = async ([key, a]: [string, MXRECORD[]]) =>
  a.map(async obj => {
    const line = `\n${obj.host}  ${typeof obj.ttl !== 'undefined' ? obj.ttl : ''} IN ${key.toUpperCase()}   ${obj.preference}  ${await formatValue(obj.value, key)}`;
    if (!RCD[key]) RCD[key] = [line];
    else RCD[key].push(line);
  });

const formatValue = async (value: string, key: string) => (key.toUpperCase() == 'NS' ? (/\.\D+\.$/.test(value) ? value : `${value}.`) : value);
