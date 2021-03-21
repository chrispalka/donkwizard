const webhook = require('webhook-discord');

const webHookMessage = (domain, webhookURL, productLink, message, title, image) => {
  console.log('WEBHOOK!', webhookURL);
  const Hook = new webhook.Webhook(webhookURL);
  const msg = new webhook.MessageBuilder()
    .setName('DonkWizard')
    .setThumbnail(image)
    .addField(title, productLink, false)
    .addField('Variants', message, true)
    .addField('Site', domain, true)
    .setColor('#4071bf');

  Hook.send(msg);
};

export default webHookMessage;
