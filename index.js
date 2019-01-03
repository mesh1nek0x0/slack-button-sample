module.exports.handler = async (event, context, callback) => {
  if (event.eventType === 'error') {
    return callback(new Error('end with failure'))
  } else {
    return callback(null, 'end with success');
  }
}