import { generateZone } from '../createZone';
import { ZONE } from '../types';
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
	a: [{ host: 'www', ip: '192.168.1.118'}, { host: 'hello', ip: '1.0.0.1'}],
	aaaa: [{ host: '@', ip: '2001:4860:4860::8888' }]

}

test('Generate Zone Files', async () => {
	// @ts-ignore
	await expect(generateZone(zone, 'Zones/testing.txt')).resolves.not.toThrow()
});