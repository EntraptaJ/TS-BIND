import { ZONE  } from '../types'

export const SAMPLE1: ZONE = {
  $origin: 'nt.kristianjones.xyz.',
  $ttl: 3600,
  ns: [{ host: '@', value: 'ns1.kristianjones.xyz.' }],
  soa: {
    contact: 'me.kristianjones.xyz.',
    serial: '20190314',
    refresh: '3600',
    retry: '600',
    expire: '604800',
    mttl: '1800',
  },
  aaaa: [{ host: '@', value: '2001:db8::1' }],
  a: [{ host: 'sxl-knf-kfj-cg4-fw1', value: '192.0.2.5' }, { host: 'www', value: '127.0.0.1' }],
  cname: [{ host: 'mail1', value: 'mail' }, { host: 'mail2', value: 'mail' }],
  dname: [{ host: 'hello-world', value: 'example.example.net.' }],
  txt: [
    { host: 'txt1', value: 'hello' },
    { host: 'txt2', value: 'world' },
    { host: 'txt3', value: 'v=spf1 a mx a:mail.treefrog.ca a:webmail.treefrog.ca ip4:76.75.250.33' },
  ],
  srv: [
    { 
      host: 'example.com.',
      port: 80,
      priority: 0,
      weight: 5,
      protocol: '_tcp',
      service: '_http',
      target: 'www.example.com.'
    }
  ],
  mx: [
    { host: '@', preference: 10, value: 'mail2'}
  ],
  caa: [{ flags: 0, host: 'example.com.', tag: 'issue', value: 'comodo.com' }]
};

export const REVERSE1 = {
  $ttl: 86400,
  $origin: '109.74.216.in-addr.arpa',
    soa: {
    contact: 'me.kristianjones.xyz.hello1.kristianjones.xyz.',
    serial: '1',
    refresh: '3600',
    retry: '600',
    expire: '604800',
    mttl: '1800',
  },
  ns: [
    { host: 'tst1', value: 'dns.trouble-free.net.'},
    { host: 'tst1', value: 'dns2.trouble-free.net.'}
  ],
  ptr: [
    { host: '81', value: 'my.reverse.dns.domain.com.' },
  ]
}

export const SAMPLE3 = {
  $origin: 'nt.kristianjones.xyz.',
  $ttl: 3600,
  ns: [{ host: '@', value: 'ns1.kristianjones.xyz.' }],
  soa: {
    contact: 'me.kristianjones.xyz.',
    serial: '20190314',
    refresh: '3600',
    retry: '600',
    expire: '604800',
    mttl: '1800',
  },
  aaaa: [{ host: '@', value: '2001:db8::1' }],
  a: [{ host: 'sxl-knf-kfj-cg4-fw1', value: '192.0.2.5' }, { host: 'www', value: '127.0.0.1' }],
  cname: [{ host: 'mail1', value: 'mail' }, { host: 'mail2', value: 'mail' }],
  txt: [{ host: 'txt1', value: 'hello' }, { host: 'txt2', value: 'world' }],
};

export const SAMPLE2 = {
  $origin: 'nt.kristianjones.xyz.',
  ns: [{ host: '@', value: 'ns1.kristianjones.xyz.', ttl: 300 }],
  soa: {
    contact: 'me.kristianjones.xyz.',
    serial: '20190314',
    refresh: '3600',
    retry: '600',
    expire: '604800',
    mttl: '1800',
  },
  a: [{ host: 'sxl-knf-kfj-cg4-fw1', value: '192.0.2.1', ttl: 300 }, { host: 'vpn', value: '1.2.3.4' }],
  ptr: [
    {
      host: '1',
      value: 'HOST1.MYDOMAIN.COM.',
    },
  ],
  cname: [{ host: 'mail1', value: 'mail' }],
  txt: [{ host: 'txt1', value: 'v=spf1 a mx a:mail.treefrog.ca a:webmail.treefrog.ca ip4:76.75.250.33', ttl: 300 }],
  srv: [
    { 
      host: 'example.com.',
      port: 80,
      priority: 0,
      weight: 5,
      protocol: '_tcp',
      service: '_http',
      target: 'www.example.com.'
    },
    {
      host: 'example.com.',
      port: 389,
      priority: 0,
      weight: 0,
      protocol: '_tcp',
      service: '_ldap',
      target: 'ldap.example.net.',
      ttl: 300
    }
  ],
  caa: [{ flags: 0, ttl: 300, host: 'example.com.', tag: 'issue', value: 'comodo.com' }]
};

export const DYNSAMPLE1 = {
  $origin: 'hello1.kristianjones.xyz.',
  $ttl: 300,
  soa: {
    contact: 'me.kristianjones.xyz.hello1.kristianjones.xyz.',
    serial: '1',
    refresh: '3600',
    retry: '600',
    expire: '604800',
    mttl: '1800',
  },
  a: [{ host: '@', value: '1.1.1.1' }, { host: 'tst1', value: '1.0.0.1' }],
  ns: [{ host: '@', value: 'dnstest.kristianjones.xyz.' }]
};
