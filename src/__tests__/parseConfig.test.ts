import { parseBINDConfig } from '../'

import { SAMPLE1OBJ, SAMPLE1TXT, SAMPLE2OBJ, SAMPLE2TXT, SAMPLE3OBJ, SAMPLE3TXT } from '../../Samples/Configs';


describe('BIND Config', () => {

  test('Parse Sample 1', async () => await expect(parseBINDConfig(SAMPLE1TXT)).resolves.toStrictEqual(SAMPLE1OBJ))

  test('Parse Sample 2', async () => {
    const smp2 = await parseBINDConfig(SAMPLE2TXT)
    await expect(smp2).toStrictEqual(SAMPLE2OBJ)
  })

  test('Parse Sample 3', async () => {
    const smp3 = await parseBINDConfig(SAMPLE3TXT)
    await expect(smp3).toStrictEqual(SAMPLE3OBJ)
  })


})