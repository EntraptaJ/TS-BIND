import { createConfig } from '../createConfig'
import { SAMPLE2OBJ } from '../../Samples/Configs'
import { parseBINDConfig } from '../parseConfig';


describe('Generate BIND.conf', () => {
    test('SAMPLE 1', async () => {
        const str = await createConfig(SAMPLE2OBJ)
        // console.log(str)
        const obj = await parseBINDConfig(str)
        expect(obj).toStrictEqual(SAMPLE2OBJ)

    })
})