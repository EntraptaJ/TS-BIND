import { BINDCONFIG } from './types';

export const generateConfig = async (config: BINDCONFIG): Promise<string> => {
  const configString = `
${config.include ? `${config.include.map(str => `include "${str}";\n`).join('')}` : ''}
${
    config.controls
      ? `controls {
    inet ${config.controls.inet.source} allow { ${config.controls.inet.allow}; } keys { "${config.controls.inet.keys}"; };
};`
      : ''
  }

options {
    ${config.options.directory ? `directory "${config.options.directory}";` : ``}
    ${config.options.pidFile ? `pid-file "${config.options.pidFile}";` : ``}
    ${config.options.listenOn ? `listen-on {\n${config.options.listenOn.map(on => `\t\t${on};\n`).join('')}\t  };` : ``}
    ${config.options.allowTransfer ? `allow-transfer {\n${config.options.allowTransfer.map(transfer => `\t\t${transfer};\n`).join('')}\t  };` : ``}
    ${config.options.alsoNotify ? `also-notify {\n${config.options.alsoNotify.map(notify => `\t\t${notify};\n`).join('')}\t  };` : ``}
    ${config.options.allowRecursion ? `allow-recursion {\n${config.options.allowRecursion.map(recursion => `\t\t${recursion};\n`).join('')}\t  };` : ``}
    ${typeof config.options.recursion !== 'undefined' ? `recursion ${config.options.recursion ? `yes` : `no`};` : ''}
    ${typeof config.options.dnssec !== 'undefined' ? `dnssec-enable ${config.options.dnssec ? `yes` : `no`};` : ''}
    ${typeof config.options.dnssecValidation !== 'undefined' ? `dnssec-validation ${config.options.dnssecValidation ? `yes` : `no`};` : ''}
};

${
    config.keys
      ? config.keys
          .map(
            key => `key "${key.name}" {
\talgorithm ${key.algorithm};
\tsecret "${key.secret}";
};\n\n`,
          )
          .join('')
      : ''
  }
${config.zones
    .map(
      zone => `zone "${zone.name}" {
\ttype ${zone.type};
\tfile "${zone.file}";
${zone.keyDirectory ? `\tkey-directory "${zone.keyDirectory}";\n` : ''}${zone.autoDNSSEC ? `\tauto-dnssec ${zone.autoDNSSEC};\n` : ''}${
        typeof zone.notify !== 'undefined' ? `\tnotify ${zone.notify ? `yes` : `no`};\n` : ``
      }
${typeof zone.inlineSigning !== 'undefined' ? `\tinline-signing ${zone.inlineSigning ? `yes` : `no`};\n` : ``}${
        zone.updatePolicy ? `\tupdate-policy { grant ${zone.updatePolicy.grant} zonesub ${zone.updatePolicy.zonesub}; };\n` : ``
      }${zone.allowTransfer ? `\tallow-transfer {\n${zone.allowTransfer.map(transfer => `\t\t${transfer};\n`).join('')}\t  };\n` : ``}${
        zone.alsoNotify ? `\talso-notify {\n${zone.alsoNotify.map(notify => `\t\t${notify};\n`).join('')}\t\n };\n` : ``
      }
};\n\n`,
    )
    .join('')}
    `;

  return configString;
};
