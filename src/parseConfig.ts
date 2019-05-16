import { TSIGALGORITHM, BINDCONFIG, KEYCONFIG, ZONECONFIG, ZONETYPE, UPDATEPOLICY } from './types';

const configTST = /\s+(directory|pid-file)/;
const arryCONFTST = /\s+(also-notify|listen-on|allow-transfer|allow-recursion)\s+/;

export const parseBINDConfig = async (config: string): Promise<any> => {
  // Async Interface for line by line processing
  const rl = config.split('\n');

  let zone: ZONECONFIG = {};
  let options: boolean = false;
  let file: string = '';
  let key: KEYCONFIG = {};
  let arryCONF: string = undefined;
  let configObj: BINDCONFIG = { options: {}, zones: [], keys: [] };
  for (const line of rl) {
    // Begin and End of options block
    if (/options\s{/.test(line) || (options && /^\}/.test(line))) options = !options;

    // Directory Option
    if (configTST.test(line) && options) configObj.options[configTST.exec(line)[1].replace(/-(\D)/, (a, b) => b.toUpperCase())] = /(?<=")(.*)(?=")/.exec(line)![0];

    // Array Configuration Options
    if (arryCONFTST.test(line)) {
      const data = /(\{)[\s\S]*?(\}|$)/g
        .exec(line)[0]
        .replace(/\{|\}/g, '')
        .replace(/;|\s+/g, '')
        .trim()
        .split(/\s/g);
      if (data[0].length > 0) configObj.options[arryCONFTST.exec(line)[1].replace(/-(\D)/, (a, b) => b.toUpperCase())] = data;
      /\}/.test(line) ? (arryCONF = undefined) : (arryCONF = arryCONFTST.exec(line)[1].replace(/-(\D)/, (a, b) => b.toUpperCase()));
    }
    // New line array configuration option
    if (arryCONF && /\s+(\w.*);/g.test(line)) {
      configObj.options[arryCONF] ? configObj.options[arryCONF].push(/\s+(\w.*);/.exec(line)[1]) : (configObj.options[arryCONF] = [/\s+(\w.*);/.exec(line)[1]]);
    }

    // End of Array Configuration block
    if (arryCONF && /\s+\}/g.test(line)) arryCONF = undefined;

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
    if (zone.name && /update-policy\s{/.test(line)) zone.updatePolicy = { grant: /grant\s+(\S+)\s/.exec(line)[1], zonesub: /\szonesub\s(\S+);/.exec(line)[1] };

    // Begin of Key Block
    if (/key\s"\D.*"\s{/.test(line)) {
      if (key.name) configObj.keys.push(key);
      key = { name: /(?<=")(.*)(?=")/.exec(line)![0] };
    }

    if (key.name && /secret.*/.test(line)) key = { ...key, secret: /(?<=")(.*)(?=")/.exec(line)![0] };

    if (key.name && /algorithm.*/.test(line)) key = { ...key, algorithm: /(?<=algorithm\s).*(?=;)/.exec(line)![0] as TSIGALGORITHM };
  }

  configObj.zones.push(zone);
  configObj.keys.push(key);
  return configObj;
};
