require('dotenv').config();
const { WebClient } = require('@slack/client');

module.exports = class MessagePostService {
  constructor() {
    this.slackClient = new WebClient(process.env.SLACK_TOKEN);
  }
  
  async postYesNoButtonMessage(questionText) {
    try {
      const result = await this.slackClient.chat.postMessage({
        channel: process.env.CHANNEL_ID,
        text: questionText,
        attachments: [
          {
            title: 'choose yes or no',
            fallback: 'You are unable to choose yes/no',
            callback_id: 'yes-no-button',
            actions: [
              {
                name: 'yes-no-action',
                text: 'はい',
                type: 'button',
                value: 'YES'
              },
              {
                name: 'yes-no-action',
                text: 'いいえ',
                type: 'button',
                value: 'NO'
              }
            ]
          }
        ]
      });
      console.log(`postYesNoButtonMessage:${result}`);
    } catch (e) {
      console.log(`Slack Connection Error:${e}`);
      return {
        ok: false,
        body: e.message
      }
    }
    return {
      ok: true,
      body: `posted:${questionText} with button`
    }
  }
  
  async postSimpleMessage(postText) {
    try {
      const result = await this.slackClient.chat.postMessage({
        channel: process.env.CHANNEL_ID,
        text: postText
      });
      console.log(result);
    } catch (e) {
      console.log(`Slack Connection Error:${e}`);
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
  
  async updateMessage(message) {
    const args = {
      token: process.env.SLACK_TOKEN,
      channel: message.channel,
      text: message.text,
      ts: message.ts
    }
    
    if (message.attachments) {
      args.attachments = message.attachments
    }
    try {
      const result = await this.slackClient.chat.update(args);
      console.log(result);
    } catch (e) {
      console.log(`Slack Connection Error:${e}`);
    }
  }
}