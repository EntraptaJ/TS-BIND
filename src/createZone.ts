import { ZONE, VRECORD, SOA } from './types';

let RCD: { [key: string]: string[] } = { };

export const generateZoneFile = async (zone: ZONE): Promise<string> => {
  RCD = {};

  const map = Object.entries(zone);
  await Promise.all(map.map(async item => await processOBJ(item)));
  const zoneText = `
$ORIGIN ${/\.\D+\.$/.test(zone.$origin) ? zone.$origin : `${zone.$origin}.`}\n
${zone.$origin} IN SOA ${/\.\D+\.$/.test(zone.ns[0].value) ? zone.ns[0].value : `${zone.ns[0].value}.`} ${zone.soa.contact} (
  ${zone.soa.serial}                   ; serial number
  ${zone.soa.refresh}                       ; refresh period
  ${zone.soa.retry}                        ; retry period
  ${zone.soa.expire}                     ; expire time
  ${zone.soa.mttl}                     ) ; minimum ttl

${Object.entries(RCD).map(([a1,b1],b) => `\n\n; ${a1.toUpperCase()} Records ${b1.join('')}`).join('')}`;
  return zoneText;
};

const processOBJ = async ([key, a]: [string, string | number | SOA | VRECORD[]]) =>
  Array.isArray(a)
    ? a.map(async obj => {
        const line = `\n${obj.host}  ${typeof obj.ttl !== 'undefined' ? obj.ttl : ''}   ${key.toUpperCase()}   ${await formatValue(
          obj.value,
          key,
        )}`
        if (!RCD[key]) RCD[key] = [line]
        else RCD[key].push(line)
          })
    : '';

const formatValue = async (value: string, key: string) =>
  key.toUpperCase() == 'NS' ? (/\.\D+\.$/.test(value) ? value : `${value}.`) : value;
