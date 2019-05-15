import { parseZoneFile } from '../';
import { SAMPLE1, SAMPLE2, DYNSAMPLE1 } from './samples';
import { readFile } from 'fs-extra';

describe('Loading Zones', () => {
  test('Loading Sample Zone 1', async () =>
    await expect(parseZoneFile((await readFile('Samples/Full.txt')).toString())).resolves.toStrictEqual(SAMPLE1));

  test('Loading Sample Zone 2', async () =>
    await expect(parseZoneFile((await readFile('Samples/Full2.txt')).toString())).resolves.toStrictEqual(SAMPLE2));

  test('Loading DYNDNS Sample', async () =>
    await expect(parseZoneFile((await readFile('Samples/DYN1.txt')).toString())).resolves.toStrictEqual(DYNSAMPLE1));


  /* test('Testing K-Net', async () => {
    const file = await readFile('Samples/KNET/KNT1.txt')
    const zone = await parseZoneFile(file.toString())
    zone.a.find(a => a.host == 'rns1.knet.ca.').value = '1.1.1.1'
    const zoneString = await generateZoneFile(zone);
    await writeFile('testingKNT.txt', zoneString)
    const zone2 = await parseZoneFile(zoneString)
    expect(zone2).toStrictEqual(zone)
    
    //console.log(zone)

  }) */

  describe('Error Handling', () => {
    test('Error Handling - INVALID SANDBOX', async () =>
      await expect(parseZoneFile((await readFile('Samples/INVALID/INVALID1.txt')).toString())).rejects.toThrowError(
        'INVALID ZONE FILE',
      ));
  });
});
