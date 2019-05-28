import { TSIGALGORITHM, BINDCONFIG, KEYCONFIG, ZONECONFIG, ZONETYPE, UPDATEPOLICY, CONTROLSCONFIG } from './types';

const MDEND = /^\}/;

const configTST = /\s+(directory|pid-file)/;
const booleanTST = /\s+(recursion|dnssec-enable|dnssec-validation)/;
const arryCONFTST = /\s+(also-notify|listen-on|allow-transfer|allow-recursion)\s+/;
const keyCONFTST = /(algorithm|secret)/;

export const parseBINDConfig = async (config: string): Promise<BINDCONFIG> => {
  // Async Interface for line by line processing
  const rl = config.split('\n');

  type PARSEMODE = 'key' | 'controls' | 'zone' | 'options';

  let mode: PARSEMODE;
  let arryCONF: string = undefined;
  let configObj: BINDCONFIG = { options: {}, zones: [] };
  for (const line of rl) {
    // Begin and End of options block
    if (/options\s{/.test(line)) mode = 'options';

    // Controls Block
    if (/controls\s{/.test(line)) mode = 'controls';

    if (/inet.*/.test(line) && mode === 'controls')
      configObj.controls = {
        inet: {
          ...(/(?<!intet\s)(?<source>\d+\.\d+\.\d\.\d|\*)\sallow\s{\s(?<allow>\w+);\s}\skeys\s{\s"(?<keys>.*)"/.exec(line).groups as {
            source: string;
            allow: string;
            keys: string;
          }),
        },
      };

    // Directory Option
    if (configTST.test(line) && mode === 'options')
      configObj.options[configTST.exec(line)[1].replace(/-(\D)/, (a, b) => b.toUpperCase())] = /(?<=")(.*)(?=")/.exec(line)![0];

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

    // Options Boolean
    if (booleanTST.test(line))
      configObj.options[
        booleanTST
          .exec(line)[1]
          .replace(/-(\D)/, (a, b) => b.toUpperCase())
          .replace('Enable', '')
      ] = /\s(\w+);/g.exec(line)[1] == 'yes' ? true : false;

    // Key Block
    if (/zone\s"\D.*"\s{/.test(line)) {
      mode = 'zone';
      if (!configObj.zones) configObj.zones = [{ name: /(?<=")(.*)(?=")/.exec(line)![0] }];
      else configObj.zones.push({ name: /(?<=")(.*)(?=")/.exec(line)![0] });
    }
    // Zone type
    if (/type.*/.test(line) && mode === 'zone') configObj.zones[configObj.zones.length - 1].type = /(?<=type\s).*(?=;)/.exec(line)![0] as ZONETYPE;

    // Zone file location
    if (/\sfile\s".*";/.test(line) && mode === 'zone') configObj.zones[configObj.zones.length - 1].file = /(?<=")(.*)(?=")/.exec(line)![0];

    // Zone update policy
    if (/update-policy\s{/.test(line) && mode === 'zone')
      configObj.zones[configObj.zones.length - 1].updatePolicy = { grant: /grant\s+(\S+)\s/.exec(line)[1], zonesub: /\szonesub\s(\S+);/.exec(line)[1] };

    // Key Block
    if (/key\s"\D.*"\s{/.test(line)) {
      mode = 'key';
      if (!configObj.keys) configObj.keys = [{ name: /(?<=")(.*)(?=")/.exec(line)![0] }];
      else configObj.keys.push({ name: /(?<=")(.*)(?=")/.exec(line)![0] });
    }

    if (mode === 'key' && /secret.*/.test(line)) configObj.keys[configObj.keys.length - 1].secret = /(?<=")(.*)(?=")/.exec(line)![0];

    if (mode === 'key' && /algorithm.*/.test(line)) configObj.keys[configObj.keys.length - 1].algorithm = /(?<=algorithm\s).*(?=;)/.exec(line)![0] as TSIGALGORITHM;

    if (MDEND.test(line)) mode = undefined;
  }
  return configObj;
};
