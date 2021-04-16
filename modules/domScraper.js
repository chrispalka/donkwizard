import webhook from './webhook';

const cheerio = require('cheerio');

const domScraper = (data, webhookURL, domain, productLink, delimiter = ':') => {
  const result = [];
  let productTitle, productImage;
  const html = data;
  const $ = cheerio.load(html, { xmlMode: false });
  const textNode = $('script[type="application/ld+json"]');
  for (let i = 0; i < textNode.length; i += 1) {
    const parsed = JSON.parse(textNode[i].children[0].data)
    if (parsed.offers) {
      productTitle = parsed.name;
      productImage = parsed.image.toString();
      for (let v = 0; v < parsed.offers.length; v += 1) {
        result.push(parsed.offers[v].sku)
      }
    }
  }
  if (result.length !== 0) {
    const message = (`\`\`\`${result.join('\n')}\`\`\``);
    webhook(domain, webhookURL, productLink, message, productTitle, productImage);
    return result.join('\n');
  } else {
    return false;
  }
}

export default domScraper;