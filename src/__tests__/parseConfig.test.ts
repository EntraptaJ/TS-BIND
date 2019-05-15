import { parseBINDConfig } from '../'

import { SAMPLE1OBJ, SAMPLE1TXT, SAMPLE2OBJ, SAMPLE2TXT } from '../../Samples/Configs';


describe('BIND Config', () => {

  test('Parse Sample 1', async () => await expect(parseBINDConfig(SAMPLE1TXT)).resolves.toStrictEqual(SAMPLE1OBJ))

  test('Parse Sample 2', async () => await expect(parseBINDConfig(SAMPLE2TXT)).resolves.toStrictEqual(SAMPLE2OBJ))

})