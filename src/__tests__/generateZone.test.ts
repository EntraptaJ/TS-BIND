import { generateZoneFile, parseZoneFile } from '../'
import { ZONE } from '../types'

const SAMPLE1: ZONE = {
	$origin: 'net.kristianjones.xyz.',
	soa: {
		contact: 'me.kristianjones.xyz',
		serial: '0',
		refresh: '3600',
		retry: '600',
		expire: '604800',
		mttl: '1800'	
	},
	ns: [{ host: '@', ttl: 300,value: 'dnstest' }],
	a: [{ host: 'www', value: '192.168.1.118'}, { host: 'hello', value: '1.0.0.1'}],
	aaaa: [{ host: '@', value: '2001:4860:4860::8888' }],
	txt: [{host: 'hllo', value: 'HOIDNKOHHF'}],
	srv: [    { 
		host: 'example.com.',
		port: 80,
		priority: 0,
		weight: 5,
		ttl: 300,
		protocol: '_tcp',
		service: '_http',
		target: 'www.example.com.'
	}],
	caa: [{ flags: 0, ttl: 300, host: 'example.com.', tag: 'issue', value: 'comodo.com' }, { flags: 0, ttl: 300, host: 'example.com.', tag: 'issue', value: 'comodo.com' }, { flags: 0, host: "inout.example.com.", tag: 'issue', ttl: 500, value: 'comodo.com'}]
}

const SAMPLE2: ZONE = {
	$origin: 'net.kristianjones.xyz',
	soa: {
		contact: 'me.kristianjones.xyz',
		serial: '0',
		refresh: '3600',
		retry: '600',
		expire: '604800',
		mttl: '1800'	
	},
	ns: [{ host: '@', ttl: 300,value: 'dnstest.kristianjones.xyz.' }],
	a: [{ host: 'www', value: '192.168.1.118'}, { host: 'hello', value: '1.0.0.1'}],
	aaaa: [{ host: '@', value: '2001:4860:4860::8888' }],
	txt: [{host: 'hllo', value: 'HOIDNKOHHF'}],
	caa: [{ flags: 0, host: 'example.com.', tag: 'issue', value: 'comodo.com' }],
	srv: [
		{ 
			host: 'example.com.',
			port: 5061,
			priority: 0,
			weight: 5,
			protocol: '_tcp',
			service: '_http',
			target: 'www.example.com.'
		},
		{ 
			host: 'example.com.',
			port: 5061,
			priority: 0,
			weight: 5,
			protocol: '_tcp',
			service: '_sips',
			target: 'www.example.com.'
		}
	],
	mx: [
		{ host: 'mail3', preference: 10, value: 'mail2'},
		{ host: 'testing', preference: 5, ttl: 5859, value: 'mail1'}
	]
}

describe('Generate Zone Files', () => {
	test('Generate Zone Files', async () => await expect(generateZoneFile(SAMPLE1)).resolves.not.toThrow());

	describe('Test Generated Files', () => {
		test('Generate Tested Zone File', async () => {
			const expectZone: ZONE = {...SAMPLE1, ns: [{ host: '@', ttl: 300, value: 'dnstest'}]}
			const zoneOBJ = await generateZoneFile(SAMPLE1)
			const loadedZone = await parseZoneFile(zoneOBJ);
			await expect(loadedZone).toStrictEqual(expectZone);
		})
	
		test('Generate Tested Zone File 2', async () => {
			const expectZone: ZONE = {...SAMPLE2, $origin: 'net.kristianjones.xyz.'}
			const zoneOBJ = await generateZoneFile(SAMPLE2)
			const loadedZone = await parseZoneFile(zoneOBJ);
			await expect(loadedZone).toStrictEqual(expectZone);
		})
	})

})