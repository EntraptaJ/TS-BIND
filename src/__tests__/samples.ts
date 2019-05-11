export const SAMPLE1 = {
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
	aaaa: [
		{ host: '@', ip: '2001:db8::1'}
	],
	a: [
		{ host: 'sxl-knf-kfj-cg4-fw1', ip: '192.0.2.5' },
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
}

export const SAMPLE2 = {
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
		{ host: 'sxl-knf-kfj-cg4-fw1', ip: '192.0.2.1' },
		{ host: 'vpn', ip: '1.2.3.4' }
	],
	aaaa: [],
	cname: [
		{ host: 'mail1', value: 'mail' },
	],
	txt: [],
}