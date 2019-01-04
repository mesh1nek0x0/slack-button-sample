const MessagePostService = require('./lib/message_post_service');
module.exports.handler = async (event, context, callback) => {
  const service = new MessagePostService();
  try {
    const result = await service.postYesNoButtonMessage('y/n?');
    console.log(result);
  } catch (e) {
    console.log(e);
  }
  if (event.eventType === 'error') {
    return callback(new Error('end with failure'))
  } else {
    return callback(null, 'end with success');
  }
}