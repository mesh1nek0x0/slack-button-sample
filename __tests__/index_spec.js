const sinon = require('sinon');
const index = require('../index');
const slackMock = require('slack-mock')(); 

describe('test', () => {
  beforeEach(() => {
    slackMock.web.addResponse({
      url: 'https://slack.com/api/chat.postMessage',
      status: 200,
      body: {
        ok: true,
        message: {
          text: 'test'
        }
      }
    });
  });
  afterEach(() => {
    sinon.restore();
  });
  afterEach(async () => {
    // need to stop
    // https://github.com/Skellington-Closet/slack-mock/blob/master/examples/test/slack-app.spec.js#L22
    await slackMock.rtm.stopServer();
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