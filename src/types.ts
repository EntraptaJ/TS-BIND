export type SOA = {
  contact: string;
  serial: string;
  refresh: string;
  retry: string;
  expire: string;
  mttl: string;
}

export type A = {
  host: string
  ip: string
}

export type NS = {
  host: string;
  TTL?: number
  value: string;
}

export type VRECORD = {
  host: string
  value: string
}


export type ZONE = {
  $origin: string
  soa: SOA
  ns: VRECORD[]
  a: A[]
  cname: VRECORD[]
  txt: VRECORD[]

}