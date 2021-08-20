const webhook = require('webhook-discord');

const webhookGun = (domain, webhookURL, productLink, title, image) => {
  const Hook = new webhook.Webhook(webhookURL);
  const msg = new webhook.MessageBuilder()
    .setName('DonkWizard')
    .setThumbnail(image)
    .addField(title, productLink, false)
    .addField('Site', domain, true)
    .setColor('#4071bf');
  Hook.send(msg);
};

export default webhookGun;
