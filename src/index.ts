import { processFile } from './BIND9';

const Start = async () => {
  const zone = await processFile('input.txt');
  zone.a.push({ host: 'hello-world', ip: '100.64.92.34' });
  console.log(zone)

}

Start();