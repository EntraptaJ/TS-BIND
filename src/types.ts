export type SOA = {
  name: string;
  minimum: number
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