import { generateZone } from '../createZone';

test('Generate Zone Files', async () => {
	expect(generateZone('Fuddle')).resolves.not.toThrowError()
});