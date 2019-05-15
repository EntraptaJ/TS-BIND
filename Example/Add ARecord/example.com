
$ORIGIN nt.kristianjones.xyz.

@ IN SOA ns1.kristianjones.xyz. me.kristianjones.xyz. (
  20190314                   ; serial number
  3600                       ; refresh period
  600                        ; retry period
  604800                     ; expire time
  1800                     ) ; minimum ttl



; NS Records 
@     NS   ns1.kristianjones.xyz.

; A Records 
sxl-knf-kfj-cg4-fw1     A   192.0.2.5

; AAAA Records 
@     AAAA   2001:db8::1

; CNAME Records 
mail1     CNAME   mail
mail2     CNAME   mail

; TXT Records 
txt1     TXT   hello
txt2     TXT   world
txt3     TXT   a mx a:mail.treefrog.ca a:webmail.treefrog.ca ip4:76.75.250.33