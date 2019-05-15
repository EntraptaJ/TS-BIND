import { TSIGALGORITHM, BINDCONFIG, KEYCONFIG, ZONECONFIG, ZONETYPE, UPDATEPOLICY } from './types';

export const parseBINDConfig = async (config: string): Promise<any> => {
  // Async Interface for line by line processing
  const rl = config.split('\n');

  let zone: ZONECONFIG = {};
  let options: boolean = false;
  let file: string = '';
  let key: KEYCONFIG = {};
  let configObj: BINDCONFIG = { options: {}, zones: [], keys: [] };
  for (const line of rl) {
    // Begin and End of options block
    if (/options\s{/.test(line) || (options && /^\}/.test(line))) options = !options;

    // Directory Option
    if (/directory\s/.test(line) && options) configObj.options.directory = /(?<=")(.*)(?=")/.exec(line)![0];

    // PID File Configuration
    if (/pid-file\s/.test(line) && options) configObj.options.pidFile = /(?<=")(.*)(?=")/.exec(line)![0];

    // Begin of zone block
    if (/zone\s"\D.*"\s{/.test(line)) {
      if (zone.name) configObj.zones.push(zone);
      zone = { name: /(?<=")(.*)(?=")/.exec(line)![0] };
    }

    // Zone type
    if (zone.name && /type.*/.test(line)) zone = { ...zone, type: /(?<=type\s).*(?=;)/.exec(line)![0] as ZONETYPE };

    // Zone file location
    if (zone.name && /\sfile\s".*";/.test(line)) {
      file = /(?<=")(.*)(?=")/.exec(line)![0];
      zone = { ...zone, file };
    }

    // Zone update policy
    if (zone.name && /update-policy\s{/.test(line))
      zone.updatePolicy = { grant: /grant\s+(\S+)\s/.exec(line)[1], zonesub: /\szonesub\s(\S+);/.exec(line)[1] };


    // Begin of Key Block
    if (/key\s"\D.*"\s{/.test(line)) {
      if (key.name) configObj.keys.push(key);
      key = { name: /(?<=")(.*)(?=")/.exec(line)![0] };
    }

    if (key.name && /secret.*/.test(line)) key = { ...key, secret: /(?<=")(.*)(?=")/.exec(line)![0] };

    if (key.name && /algorithm.*/.test(line))
      key = { ...key, algorithm: /(?<=algorithm\s).*(?=;)/.exec(line)![0] as TSIGALGORITHM };
  }

  configObj.zones.push(zone);
  configObj.keys.push(key);
  return configObj;
};
