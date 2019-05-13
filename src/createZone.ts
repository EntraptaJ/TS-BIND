import { ZONE } from './types';

export const generateZoneFile = async (zone: ZONE) => {
  const Records = await Promise.all(
    Object.keys(zone).map(async a => {
      let RCD = [];
      switch (typeof zone[a]) {
        case 'object':
          await Promise.all(
            Object.keys(zone[a]).map(async a2 => {
              switch (typeof zone[a][a2]) {
                case 'object':
                  if (zone[a][a2].host)
                    RCD.push(
                      `\n${zone[a][a2].host}     ${
                        typeof zone[a][a2].ttl !== 'undefined' ? zone[a][a2].ttl : ''
                      }    IN    ${a.toUpperCase()}     ${zone[a][a2].value}`,
                    );
                  break;
              }
            }),
          );
          break;
      }
      return RCD.join('');
    }),
  );
  const zoneText = `
$ORIGIN ${/\.\D+\.$/.test(zone.$origin) ? zone.$origin : `${zone.$origin}.`}\n
@ 3600 SOA ${/\.\D+\.$/.test(zone.ns[0].value) ? zone.ns[0].value : `${zone.ns[0].value}.`} (
  ${zone.soa.contact}      ; address of responsible party
  ${zone.soa.serial}                   ; serial number
  ${zone.soa.refresh}                       ; refresh period
  ${zone.soa.retry}                        ; retry period
  ${zone.soa.expire}                     ; expire time
  ${zone.soa.mttl}                     ) ; minimum ttl

${Records.join('')}`;
  return zoneText;
};
