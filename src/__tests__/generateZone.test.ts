import { generateZoneFile, parseZoneFile } from '../'
import { ZONE } from '../types'
import fs from 'fs-extra';
const zone: ZONE = {
	$origin: 'net.kristianjones.xyz.',
	soa: {
		contact: 'me.kristianjones.xyz',
		serial: '0',
		refresh: '3600',
		retry: '600',
		expire: '604800',
		mttl: '1800'	
	},
	ns: [{ host: '@', ttl: 300,value: 'dnstest.kristianjones.xyz' }],
	a: [{ host: 'www', value: '192.168.1.118'}, { host: 'hello', value: '1.0.0.1'}],
	aaaa: [{ host: '@', value: '2001:4860:4860::8888' }],
	txt: [{host: 'hllo', value: 'HOIDNKOHHF'}]

}

describe('Generate Zone Files', () => {
	test('Generate Zone Files', async () => await expect(generateZoneFile(zone)).resolves.not.toThrow());

	test('Generate Tested Zone File', async () => {
		const expectZone: ZONE = {...zone, ns: [{ host: '@', ttl: 300, value: 'dnstest.kristianjones.xyz.'}], ptr: [], cname: []}
		const zoneOBJ = await generateZoneFile(zone)
		const loadedZone = await parseZoneFile(zoneOBJ);
		await expect(loadedZone).toStrictEqual(expectZone);
	})
})