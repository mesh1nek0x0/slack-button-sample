'use strict';

const MessagePostService = require('./lib/message_post_service');

module.exports.hello = async (event, context) => {
  const service = new MessagePostService();
  const req = JSON.parse(decodeURIComponent(event.body).split('payload=')[1]);
  const message = req.original_message;
  
  message.text = 'answered';
  message.channel = req.channel.id;
  message.ts = req.message_ts;
  const emoji = (req.actions[0].value) == 'YES' ? ':white_check_mark:' : ':no_entry:'
  message.attachments = [
    {
      text: `${emoji} your push button is ${req.actions[0].value}`
    }
  ];
  await service.updateMessage(message);
  
  return {
    statusCode: 200
  };
};
