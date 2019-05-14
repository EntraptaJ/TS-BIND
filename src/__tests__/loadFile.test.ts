import { parseZoneFile } from '../parseZone';
import { SAMPLE1, SAMPLE2, DYNSAMPLE1 } from './samples';
import { readFile } from 'fs-extra'

describe('Loading Zones', () => {
	test('Loading Sample Zone 1', async () => {
		const SMP1 = await readFile('Samples/Full.txt')
		await expect(parseZoneFile(SMP1.toString())).resolves.toStrictEqual(SAMPLE1)
	})

	test('Loading Sample Zone 2', async () => {
		const SMP2 = await readFile('Samples/Full2.txt')
		await expect(parseZoneFile(SMP2.toString())).resolves.toStrictEqual(SAMPLE2)
	
	})

	test('Loading DYNDNS Sample', async () => await expect(parseZoneFile((await readFile('Samples/DYN1.txt')).toString())).resolves.toStrictEqual(DYNSAMPLE1))

	describe('Error Handling', () => {
		test('Error Handling - INVALID SANDBOX', async () => {
			const FAIL1 = await readFile('Samples/INVALID/INVALID1.txt')
			await expect(parseZoneFile(FAIL1.toString())).rejects.toThrowError('INVALID ZONE FILE')
			
		})
	})

	// test('Load Generated ZONE FILE', async () => {
	// 	const zone = await processFile('genZone1.txt');
	// 	zone.aaaa.map((aaaa) => console.log(aaaa.ip))
		
	// })
})
