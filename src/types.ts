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
}

export type NS = {
  host: string;
  TTL?: number
  value: string;
}

export type VRECORD = {
  host: string;
  value: string;
  ttl?: number;
}

export type SRVRECORD = {
  service: string;
  protocol: string;
  host: string;
  ttl?: number;
  priority?: number;
  weight?: number;
  port?: number;
  target?: string;
}

export type MXRECORD = {
  host: string;
  ttl?: number;
  preference: number;
  value: string
}

/**
 * BIND9 Zonefile
 */
export type ZONE = {
  /**
   * Domain for the zone file
   */
  $origin: string
  /**
   * Optional TTL for the zonefile
   */
  $ttl?: number;
  /**
   * SOA for the zonefile
   */
  soa: SOA
  ns: VRECORD[]
  a?: VRECORD[]
  aaaa?: VRECORD[]
  cname?: VRECORD[]
  txt?: VRECORD[];
  ptr?: VRECORD[];
  srv?: SRVRECORD[];
  mx?: MXRECORD[];
}



/**
 * BIND Configuration Types
 */

export type BINDCONFIG = {
  options: BINDOPTIONS;
  zones: ZONECONFIG[];
  keys: KEYCONFIG[];
};

export type BINDOPTIONS = {
  directory?: string;
  pidFile?: string;
};

export type UPDATEPOLICY = {
  grant?: string;
  zonesub?: string;
};

export type ZONECONFIG = {
  name?: string;
  type?: ZONETYPE;
  file?: string;
  updatePolicy?: UPDATEPOLICY;
};


/**
 * BIND9 Zone Type {@link https://ftp.isc.org/www/bind/arm95/Bv9ARM.ch06.html#id2587159}
 */
export type ZONETYPE = 'master' | 'slave' | 'stub' | 'forward' | 'hint' | 'delegation-only';

/**
 * BIND9 TSIG Algroth {@link https://ftp.isc.org/www/bind/arm95/Bv9ARM.ch06.html#id2574798}
 */
export type TSIGALGORITHM = 'hmac-md5' | 'hmac-sha1' | 'hmac-sha224' | 'hmac-sha256' | 'hmac-sha384' | 'hmac-sha512';

export type KEYCONFIG = {
  name?: string;
  secret?: string;
  algorithm?: TSIGALGORITHM;
};