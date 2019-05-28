import { BINDCONFIG } from "./types";

export const createConfig = async (config: BINDCONFIG): Promise<string> => {
    const configString = `
${config.controls && `controls {
    inet ${config.controls.inet.source} allow { ${config.controls.inet.allow}; } keys { "${config.controls.inet.keys}"; };
};`}

options {
    ${config.options.directory && `directory "${config.options.directory}";`}
    ${config.options.pidFile && `pid-file "${config.options.pidFile}";`}

    ${config.options.dnssec && ``}
}

${config.zones.map((zone) => `zone "${zone.name}" IN {\n\ttype ${zone.type};\n\tfile "${zone.file}";\n};\n\n`).join('')}
    `;





    return configString;
}