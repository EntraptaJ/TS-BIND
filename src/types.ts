/**
 * Zone File Types
 */

export type SOA = {
  contact: string;
  serial: string;
  refresh: string;
  retry: string;
  expire: string;
  mttl: string;
};

export type VRECORD = {
  host: string;
  value: string;
  ttl?: number;
};

export type SRVRECORD = {
  service: string;
  protocol: string;
  host: string;
  ttl?: number;
  priority?: number;
  weight?: number;
  port?: number;
  target?: string;
};

export type MXRECORD = {
  host: string;
  ttl?: number;
  preference: number;
  value: string;
};

export enum CAATAGENUM {
  'issue',
  'issuewild',
  'iodef'
}

export type CAATAG = CAATAGENUM | 'issue' | 'issuewild' | 'iodef'

export type CAARecord = {
  host: string;
  ttl?: number
  flags: number
  tag: CAATAG
  value: string
}

/**
 * All the possible resource record types
 * {@link https://ftp.isc.org/www/bind/arm95/Bv9ARM.ch06.html#types_of_resource_records_and_when_to_use_them}
 */
export type RRType = 'ns' | 'a' | 'aaaa' | 'cname' | 'dname' | 'txt' | 'ptr' | 'srv' | 'mx' | 'caa';

/**
 * BIND9 Zonefile
 */
export type ZONE = {
  /**
   * Domain for the zone file
   */
  $origin: string;
  /**
   * Optional TTL for the zonefile
   */
  $ttl?: number;
  /**
   * SOA for the zonefile
   */
  soa: SOA;
  ns: VRECORD[];
  a?: VRECORD[];
  aaaa?: VRECORD[];
  caa?: CAARecord[]
  cname?: VRECORD[];
  dname?: VRECORD[];
  txt?: VRECORD[];
  ptr?: VRECORD[];
  srv?: SRVRECORD[];
  mx?: MXRECORD[];
};



/**
 * BIND Configuration Types
 */

export type BINDCONFIG = {
  include?: string[]
  options: BINDOPTIONS;
  zones?: ZONECONFIG[];
  keys?: KEYCONFIG[];
  controls?: CONTROLSCONFIG
};

export type BINDOPTIONS = {
  directory?: string;
  pidFile?: string;
  dnssec?: boolean;
  dnssecValidation?: boolean;
  recursion?: boolean;
  alsoNotify?: string[];
  listenOn?: string[];
  allowTransfer?: string[];
  allowRecursion?: string[];
};



export type UPDATEPOLICY = {
  grant?: string;
  zonesub?: string;
};

export type ZONECONFIG = {
  name: string;
  type: ZONETYPE;
  file: string
  autoDNSSEC?: AUTODNSSEC
  inlineSigning?: boolean;
  keyDirectory?: string;
  allowTransfer?: string[]
  alsoNotify?: string[]
  notify?: boolean;
  updatePolicy?: UPDATEPOLICY;
};

/**
 * BIND9 Zone Type {@link https://ftp.isc.org/www/bind/arm95/Bv9ARM.ch06.html#id2587159}
 */
export type ZONETYPE = ZONETYPEENUM | 'master' | 'slave' | 'stub' | 'forward' | 'hint' | 'delegation-only';

export enum ZONETYPEENUM {
  'master' = 'master',
  'slave' = 'slave',
  'stub' = 'stub',
  'forward' = 'forward',
  'hint'  = 'hint'
}

/**
 * BIND9 TSIG Algroth {@link https://ftp.isc.org/www/bind/arm95/Bv9ARM.ch06.html#id2574798}
 */
export type TSIGALGORITHM =  TSIGALGORITHMENUM | 'hmac-md5' | 'hmac-sha1' | 'hmac-sha224' | 'hmac-sha256' | 'hmac-sha384' | 'hmac-sha512';

export enum TSIGALGORITHMENUM {
  MD5 = 'hmac-md5',
  SHA1 = 'hmac-sha1',
  SHA224 = 'hmac-sha224',
  SHA256 = 'hmac-sha256',
  SHA384 = 'hmac-sha384',
  SHA512 = 'hmac-sha512'
}

export type AUTODNSSEC = AUTODNSSECENUM | 'off' | 'allow' | 'maintain' 

export enum AUTODNSSECENUM {
  'off' = 'off',
  'allow' = 'allow',
  'maintain' = 'maintain'
}

export type KEYCONFIG = {
  name: string;
  secret: string;
  algorithm: TSIGALGORITHM;
};

export type CONTROLSCONFIG = {
  inet: {
    source: string;
    allow: string;
    keys: string;
    

  }
}