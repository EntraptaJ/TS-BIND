import { generateConfig } from '../createConfig'
import { SAMPLE2OBJ, SAMPLE3OBJ, SAMPLE1OBJ } from '../../Samples/Configs'
import { parseBINDConfig } from '../parseConfig';


describe('Generate BIND.conf', () => {
    test('SAMPLE 1', async () => {
        const str = await generateConfig(SAMPLE1OBJ)
        // console.log(str)
        const obj = await parseBINDConfig(str)
        expect(obj).toStrictEqual(SAMPLE1OBJ)

    })

    test('SAMPLE 2', async () => {
        const str = await generateConfig(SAMPLE2OBJ)
        // console.log(str)
        const obj = await parseBINDConfig(str)
        expect(obj).toStrictEqual(SAMPLE2OBJ)

    })

    test('SAMPLE 3', async () => {
        const str = await generateConfig(SAMPLE3OBJ)
        // console.log(str)
        const obj = await parseBINDConfig(str)
        expect(obj).toStrictEqual(SAMPLE3OBJ)

    })
})