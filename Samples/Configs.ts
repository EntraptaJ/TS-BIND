import { BINDCONFIG } from '../src/types'

export const SAMPLE1OBJ: BINDCONFIG = {
  options: { directory: '/var/bind', pidFile: '/var/run/named/named.pid', listenOn: [ 'any'], alsoNotify: ['1.1.1.1', '1.0.0.1'], allowTransfer: ['none'], allowRecursion: ['none']  },
  zones: [{ name: 'example.com', type: 'master', file: '/zones/example.com' }],
  keys: [
    {
      algorithm: 'hmac-sha256',
      name: 'hello-world',
      secret: 'HELLO-WORLD',
    },
  ],
};

export const SAMPLE1TXT = `
options {
  directory "/var/bind";
  also-notify { 
    1.1.1.1; 
    1.0.0.1; 
  };
  listen-on { any; };
  listen-on-v6 { none; };

  allow-transfer {
    none;
  };

  pid-file "/var/run/named/named.pid";

  allow-recursion { none; };
  recursion no;
};

zone "example.com" {
    type master;
    file "/zones/example.com";
};

key "hello-world" {
  algorithm hmac-sha256;
  secret "HELLO-WORLD";
};

`;

export const SAMPLE2OBJ: BINDCONFIG = {
  options: { directory: '/var/stuff/bind', pidFile: '/var/run/named/named.pid', listenOn: [ 'any'], allowTransfer: ['none'], allowRecursion: ['none'] },
  zones: [
    {
      name: 'example.com',
      type: 'master',
      file: '/zones/example.com',
      updatePolicy: {
        grant: 'hello-world',
        zonesub: 'ANY'
      }
    },
    { name: 'tst.example.com', type: 'master', file: '/zones/tst.example.com' },
  ],
  keys: [
    {
      algorithm: 'hmac-sha256',
      name: 'hello-world',
      secret: 'HELLO-WORLD',
    },
    { algorithm: 'hmac-sha256', name: 'tst2', secret: 'HELLO-KEY' },
  ],
};

export const SAMPLE2TXT = `
options {
  directory "/var/stuff/bind";

  listen-on { any; };
  listen-on-v6 { none; };

  allow-transfer {
    none;
  };

  pid-file "/var/run/named/named.pid";

  allow-recursion { none; };
  recursion no;
};

zone "example.com" {
    type master;
    update-policy { grant hello-world zonesub ANY; };
    file "/zones/example.com";
};

zone "tst.example.com" {
  type master;
  file "/zones/tst.example.com";
};

key "hello-world" {
  algorithm hmac-sha256;
  secret "HELLO-WORLD";
};

key "tst2" {
  algorithm hmac-sha256;
  secret "HELLO-KEY";
};

`;
