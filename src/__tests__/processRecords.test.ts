import { ProcessValueRecord } from '../';

describe('Process Lines', () => {
  describe('NS Records', () => {
    test('NS IN Record', async () =>
      await expect(ProcessValueRecord('@  IN  NS  ns1.example.com')).resolves.toStrictEqual({
        host: '@',
        value: 'ns1.example.com',
      }));

    test('NS Record', async () =>
      await expect(ProcessValueRecord('@  NS  ns1.example.com')).resolves.toStrictEqual({
        host: '@',
        value: 'ns1.example.com',
      }));

    test('Blank NS Record', async () =>
      await expect(ProcessValueRecord('  NS  ns1.example.com')).resolves.toStrictEqual({
        host: '@',
        value: 'ns1.example.com',
      }));

    test('NS TTL Record', async () =>
      await expect(ProcessValueRecord('@  300 IN  NS  ns1.example.com')).resolves.toStrictEqual({
        host: '@',
        value: 'ns1.example.com',
        ttl: 300,
      }));
  });

  describe('A Records', () => {
    test('A IN Record', async () =>
    await expect(ProcessValueRecord('@  IN  A  1.1.1.1')).resolves.toStrictEqual({
      host: '@',
      value: '1.1.1.1',
    }));
  });

  describe('Error Handling', () => {
    test('Invalid Record', async () =>
      await expect(ProcessValueRecord(' ns1.example.com')).rejects.toThrowError('INVALID Record'));
  });
});
