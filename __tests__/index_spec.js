const sinon = require('sinon');
const index = require('../index');

describe('test', () => {  
  afterEach(() => {
    sinon.restore();
  });
  
  it('lambdaを正常終了できる', async () => {
    const callback = sinon.stub();
    const result = await index.handler({eventType: 'test'}, {}, callback);
    expect(callback.args[0][0]).toBeNull();
    expect(callback.args[0][1]).toBe('end with success');
  });
  
  it('想定外の例外が発生した場合、異常終了となること', async () => {
    const callback = sinon.stub();
    const result = await index.handler({eventType: 'error'}, {}, callback);
    expect(callback.args[0][0]).not.toBeNull();
    expect(callback.args[0][0].message).toBe('end with failure');
  });
});