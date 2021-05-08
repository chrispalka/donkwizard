const webhook = require('webhook-discord');

const webhookMessage = (domain, webhookURL, productLink, QT, message, title, image) => {
  const Hook = new webhook.Webhook(webhookURL);
  const msg = new webhook.MessageBuilder()
    .setName('DonkWizard')
    .setThumbnail(image)
    .addField(title, productLink, false)
    .addField('QT', QT)
    .addField('Variants', message, true)
    .addField('Site', domain, true)
    .setColor('#4071bf');
  Hook.send(msg);
};

export default webhookMessage;
