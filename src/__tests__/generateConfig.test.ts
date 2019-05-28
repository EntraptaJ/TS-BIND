import { createConfig } from '../createConfig'
import { SAMPLE2OBJ } from '../../Samples/Configs'


describe('Generate BIND.conf', () => {
    test('SAMPLE 1', async () => {
        const str = await createConfig(SAMPLE2OBJ)
        console.log(str)

    })
})