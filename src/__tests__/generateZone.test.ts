import { generateZoneFile } from '../createZone';
import fs from 'fs-extra';
const zone = {
	$origin: 'net.kristianjones.xyz.',
	soa: {
		contact: 'me.kristianjones.xyz',
		serial: '0',
		refresh: '3600',
		retry: '600',
		expire: '604800',
		mttl: '1800'	
	},
	ns: [{ host: '@', value: 'dnstest.kristianjones.xyz.' }],
	a: [{ host: 'www', value: '192.168.1.118'}, { host: 'hello', value: '1.0.0.1'}],
	aaaa: [{ host: '@', value: '2001:4860:4860::8888' }]

}

test('Generate Zone Files', async () => {
	await expect(generateZoneFile(zone)).resolves.not.toThrow()
});