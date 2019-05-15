import { TSIGALGORITHM, BINDCONFIG, KEYCONFIG, ZONECONFIG, ZONETYPE, UPDATEPOLICY } from './types';

export const parseBINDConfig = async (config: string): Promise<any> => {
  // Async Interface for line by line processing
  const rl = config.split('\n')

  let zone: ZONECONFIG = {};
  let options: boolean = false;
  let file: string = '';
  let key: KEYCONFIG = {};
  let configObj: BINDCONFIG = { options: {}, zones: [], keys: [] };
  for (const line of rl) {
    if (/options\s{/.test(line) || options && /^\}/.test(line)) options = !options

    if (/directory\s/.test(line) && options) configObj.options.directory = /(?<=")(.*)(?=")/.exec(line)![0]

    if (/pid-file\s/.test(line) && options) configObj.options.pidFile = /(?<=")(.*)(?=")/.exec(line)![0]

    if (RegExp(/zone\s"\D.*"\s{/).test(line)) {
      if (zone.name) configObj.zones.push(zone);
      zone = { name: RegExp(/(?<=")(.*)(?=")/).exec(line)![0] };
    }
    if (RegExp(/key\s"\D.*"\s{/).test(line)) {
      if (key.name) configObj.keys.push(key);
      key = { name: RegExp(/(?<=")(.*)(?=")/).exec(line)![0] };
    }
    if (key.name && RegExp(/secret.*/).test(line)) {
      let secret = RegExp(/(?<=")(.*)(?=")/).exec(line)![0];
      key = { ...key, secret };
    }

    if (key.name && RegExp(/algorithm.*/).test(line)) {
      let algorithm = RegExp(/(?<=algorithm\s).*(?=;)/).exec(line)![0] as TSIGALGORITHM;
      key = { ...key, algorithm };
    }

    if (zone.name && RegExp(/type.*/).test(line)) {
      let type = RegExp(/(?<=type\s).*(?=;)/).exec(line)![0] as ZONETYPE;
      zone = { ...zone, type };
    }
    if (zone.name && RegExp(/\sfile\s".*";/).test(line)) {
      file = RegExp(/(?<=")(.*)(?=")/).exec(line)![0];
      zone = { ...zone, file };
    }

    if (zone.name && /update-policy\s{/.test(line)) zone.updatePolicy = { grant: /grant\s+(\S+)\s/.exec(line)[1], zonesub: /\szonesub\s(\S+);/.exec(line)[1]  }
  }

  configObj.zones.push(zone);
  configObj.keys.push(key);
  return configObj;
}