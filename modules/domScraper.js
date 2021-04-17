import webhook from './webhook';
const cheerio = require('cheerio');

const domScraper = (data, webhookURL, domain, productLink, delimiter) => {
  delimiter = delimiter !== '' ? delimiter : ':';
  const result = [];
  const delimitedResult = [];
  let productTitle;
  const html = data;
  const $ = cheerio.load(html, { xmlMode: false });
  const textNode = $('script:not([src])').map((i, x) => x.children[0]).filter((i, x) => x.data.match(/var meta/))
  const productImage = $('meta[property="og:image"]').attr('content')
  const productData = textNode[0].data
    .replace(/window./g, '')
    .replace(/ShopifyAnalytics/g, '')
    .replace(/.meta/g, '')
    .replace(/\|\|/g, '')
    .replace(/{}/g, '')
    .replace(/=/g, '')
    .replace(/.currency/g, '')
    .replace(/;/g, '')
    .replace(/'USD'/g, '')
    .replace(/var  /g, '')
    .replace(/for \(var attr in\) \{/g, '')
    .replace(/\[attr\]/g, '')
    .replace(/}$/g, '')

    const parsedProductData = JSON.parse(productData);
    productTitle = parsedProductData.product.variants[0].name
  for (let i = 0; i < parsedProductData.product.variants.length; i += 1) {
    result.push(parsedProductData.product.variants[i].id)
    delimitedResult.push(
      `${parsedProductData.product.variants[i].public_title} ${delimiter} ${parsedProductData.product.variants[i].id}`
    )
  }
  console.log(result.join('\n'))

  if (result.length !== 0) {
    const message = (`\`\`\`${result.join('\n')}\`\`\``);
    const delimitedMessage = (`\`\`\`${delimitedResult.join('\n')}\`\`\``);
    webhook(domain, webhookURL, productLink, delimitedMessage, productTitle, productImage);
    webhook(domain, webhookURL, productLink, message, productTitle, productImage);
    return result.join('\n');
  } else {
    return false;
  }
}

export default domScraper;


// var textNode = $('body > script').map((i, x) => x.children[0])
// .filter((i, x) => x && x.data.match(/jwplayer/)).get(0);