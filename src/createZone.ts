import { writeFile } from 'fs-extra'
import { ZONE } from './types';



export const generateZone = async (zone: ZONE, file: string) => {
  const Aes = zone.a ? zone.a.map(a => `\n${a.host}   A     ${a.ip}`).join('') : [];
  const AAAAs = zone.aaaa ? zone.aaaa.map(aaaa => `\n${aaaa.host} AAAA ${aaaa.ip}`).join('') : []
  const NSes = zone.ns ? zone.ns.map(ns => `\n${ns.host}     NS    ${/\.\D+\.$/.test(ns.value) ? ns.value : `${ns.value}.`}`).join('') : []
  const CNAMEs = zone.cname ? zone.cname.map((cname) => `\n${cname.host} CNAME ${cname.value}`).join(''): []
  const zoneText = `
$ORIGIN ${/\.\D+\.$/.test(zone.$origin) ? zone.$origin : `${zone.$origin}.`}\n
@ 3600 SOA ${/\.\D+\.$/.test(zone.ns[0].value) ? zone.ns[0].value : `${zone.ns[0].value}.`} (
        ${zone.soa.contact}      ; address of responsible party
        ${zone.soa.serial}                   ; serial number
        ${zone.soa.refresh}                       ; refresh period
        ${zone.soa.retry}                        ; retry period
        ${zone.soa.expire}                     ; expire time
        ${zone.soa.mttl}                     ) ; minimum ttl

; NS Records
${NSes}

; A Records
${Aes}

; AAAA Records
${AAAAs}

; CNAME Records
${CNAMEs}
`;

  await writeFile(file, zoneText);
  return true;
}