require('dotenv').config();
const { WebClient } = require('@slack/client');

module.exports = class MessagePostService {
  constructor() {
    this.slackClient = new WebClient(process.env.SLACK_TOKEN);
  }
  
  async postSimpleMessage(postText) {
    try {
      await this.slackClient.chat.postMessage({
        channel: process.env.CHANNEL_ID,
        text: postText
      });
    } catch (e) {
      return {
        ok: false,
        body: e.message
      }
    }
    return {
      ok: true,
      body: `posted:${postText}`
    }
  }
}