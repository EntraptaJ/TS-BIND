import { processFile } from '../BIND9';

test('Zone Files', async () => {
	const zone = await processFile('Samples/Full.txt')
	console.log(zone.$origin)
	expect(zone).toStrictEqual({ 
		$origin: 'nt.kristianjones.xyz.', 
		ns: [{ host: '@', value: 'ns1.kristianjones.xyz.' }],
		soa: {
			contact: 'me.kristianjones.xyz.',
			serial: '20190314',
			refresh: '3600',
			retry: '600',
			expire: '604800',
			mttl: '1800'
		},
		a: [
			{ host: 'sxl-knf-kfj-cg4-fw1', ip: '100.64.92.34' },
			{ host: 'vpn', ip: '66.165.222.178' },
			{ host: 'sxlk-kfj-rk1-fw1', ip: '100.64.92.34' },
			{ host: 'nyc-hp-fw1', ip: '104.248.48.170' },
			{ host: 'www', ip: '127.0.0.1' }
		],
		cname: [
			{ host: 'mail1', value: 'mail' },
			{ host: 'mail2', value: 'mail' }
		],
		txt: [
			{ host: 'txt1', value: 'hello' },
			{ host: 'txt2', value: 'world' }
		]
	});
});