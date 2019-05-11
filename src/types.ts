export type SOA = {
  contact: string;
  serial: string;
  refresh: string;
  retry: string;
  expire: string;
  mttl: string;
}

export type IP = {
  host: string;
  ip: string;
  ttl?: number;
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


export type ZONE = {
  $origin: string
  $ttl?: number;
  soa: SOA
  ns: VRECORD[]
  a?: VRECORD[]
  aaaa?: VRECORD[]
  cname?: VRECORD[]
  txt?: VRECORD[];
  ptr?: VRECORD[]

}