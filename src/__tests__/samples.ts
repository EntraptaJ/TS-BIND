export const SAMPLE1 = {
	$origin: 'nt.kristianjones.xyz.',
	$ttl: 3600,
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
		{ host: '@', value: '2001:db8::1'}
	],
	a: [
		{ host: 'sxl-knf-kfj-cg4-fw1', value: '192.0.2.5' },
		{ host: 'www', value: '127.0.0.1' }
	],
	cname: [
		{ host: 'mail1', value: 'mail' },
		{ host: 'mail2', value: 'mail' }
	],
	txt: [
		{ host: 'txt1', value: 'hello' },
		{ host: 'txt2', value: 'world' }
	],
	ptr: []
}

export const SAMPLE2 = {
	$origin: 'nt.kristianjones.xyz.',
	ns: [{ host: '@', value: 'ns1.kristianjones.xyz.', ttl: 300 }],
	soa: {
		contact: 'me.kristianjones.xyz.',
		serial: '20190314',
		refresh: '3600',
		retry: '600',
		expire: '604800',
		mttl: '1800'
	},
	a: [
		{ host: 'sxl-knf-kfj-cg4-fw1', value: '192.0.2.1', ttl: 300 },
		{ host: 'vpn', value: '1.2.3.4' }
	],
	ptr: [
		{
			host: '1',
			value: 'HOST1.MYDOMAIN.COM.'
		}
	],
	aaaa: [],
	cname: [
		{ host: 'mail1', value: 'mail' },
	],
	txt: [{ host: 'treefrog.ca', value: 'v=spf1 a mx a:mail.treefrog.ca a:webmail.treefrog.ca ip4:76.75.250.33', ttl: 300}],
}

export const DYNSAMPLE1 = {
	$origin: 'hello1.kristianjones.xyz.',
	$ttl: 300,
	soa: {
		contact: 'me.kristianjones.xyz.hello1.kristianjones.xyz.',
		serial: '1',
		refresh: '3600',
		retry: '600',
		expire: '604800',
		mttl: '1800'
	},
	a: [
		{host: '@', value: '1.1.1.1'},
		{ host: 'tst1', value: '1.0.0.1'}
	],
	aaaa: [],
	cname: [],
	ptr: [],
	txt: [],
	ns: [
		{ host: '@', value: 'dnstest.kristianjones.xyz.' }
	]
}