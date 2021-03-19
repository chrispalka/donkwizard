const webhook = require('webhook-discord');

const Hook = new webhook.Webhook('https://discord.com/api/webhooks/697216689464672296/hml2cwYyNaxhnkSYU9RwCNjf1u6gMUH2AsZKrkZey6LNlEXtDHXtCbIoaW7nTqVC_piV');

const webHookMessage = (domain, productLink, message, title, image) => {
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
