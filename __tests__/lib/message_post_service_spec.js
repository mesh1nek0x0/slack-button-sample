const MessagePostService = require('../../lib/message_post_service');
const slackMock = require('slack-mock')(); 

describe('test', () => {
  beforeAll(() => {
    this.service = new MessagePostService();
  });
  afterEach(async () => {
    slackMock.reset();
    await slackMock.rtm.stopServer();
  });
  
  describe('postSimpleMessage', () => {
    it('slackへの通信が成功した場合、成功として処理を終えること', async () => {
      const postText = 'mock text';
      // 外部通信に依存させない
      slackMock.web.addResponse({
        url: 'https://slack.com/api/chat.postMessage',
        status: 200,
        body: {
          ok: true,
          message: {
            text: postText
          }
        }
      });
      const response = await this.service.postSimpleMessage(postText);
      expect(response.ok).toBe(true);
      expect(response.body).toBe(`posted:${postText}`);
    });
    
    it('slackへの通信が失敗した場合、失敗として処理を終えること', async () => {
      const postText = 'mock text';
      // 外部通信に依存させない
      slackMock.web.addResponse({
        url: 'https://slack.com/api/chat.postMessage',
        status: 200,
        body: {
          ok: false,
          error: 'too_many_attachments'
        }
      });
      const response = await this.service.postSimpleMessage(postText);
      expect(response.ok).toBe(false);
      expect(response.body).toBe('An API error occurred: too_many_attachments');
    });
  });
  
  describe('postYesNoButtonMessage', () => {
    it('slackへの通信が成功した場合、成功として処理を終えること', async () => {
      const postText = 'yes/no?';
      // 外部通信に依存させない
      slackMock.web.addResponse({
        url: 'https://slack.com/api/chat.postMessage',
        status: 200,
        body: {
          ok: true,
          message: {
            text: postText
          }
        }
      });
      const response = await this.service.postYesNoButtonMessage(postText);
      expect(response.ok).toBe(true);
      expect(response.body).toBe(`posted:yes/no? with button`);
    });
  });
});