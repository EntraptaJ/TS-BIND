import { parseZoneFile } from '../parseZone';
import { SAMPLE1, SAMPLE2 } from './samples';

describe('Loading Zones', () => {
	test('Loading Sample Zone 1', async () => await expect(parseZoneFile('Samples/Full.txt')).resolves.toStrictEqual(SAMPLE1))

	test('Loading Sample Zone 2', async () => await expect(parseZoneFile('Samples/Full2.txt')).resolves.toStrictEqual(SAMPLE2))

	describe('Error Handling', () => {
		test('Error Handling - INVALID FILE PATH', async () => await expect(parseZoneFile('Samples/INVALID/IDONOTEXIST.txt')).rejects.toThrowError('ZONE FILE DOES NOT EXIST'))
		test('Error Handling - INVALID SANDBOX', async () => await expect(parseZoneFile('Samples/INVALID/INVALID1.txt')).rejects.toThrowError('INVALID ZONE FILE'))
	})

	// test('Load Generated ZONE FILE', async () => {
	// 	const zone = await processFile('genZone1.txt');
	// 	zone.aaaa.map((aaaa) => console.log(aaaa.ip))
		
	// })
})
