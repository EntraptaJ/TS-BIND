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
  ptr?: VRECORD[]
}