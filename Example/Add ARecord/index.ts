import { parseZoneFile, generateZoneFile } from 'ts-zone-file'
import { readFile, writeFile } from 'fs-extra';

const Example1 = async () => {
  const file = await readFile('./example.com')
  const zone = await parseZoneFile(file.toString())
  zone.a.push({ host: 'www', value: '1.1.1.1' })
  const zoneString = await generateZoneFile(zone)
  await writeFile('./example.com', zoneString)
}

Example1()
