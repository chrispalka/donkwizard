import webhook from './webhook';

const cheerio = require('cheerio');

const domScraper = (data, webhookURL, domain, productLink, delimiter) => {
  delimiter = delimiter !== '' ? delimiter : ':';
  const result = [];
  const delimitedResult = [];
  let productTitle, productImage, productPrice;
  const notFound = 'https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png'
  const html = data;
  const $ = cheerio.load(html, { xmlMode: false });
  const textNode = $('script:not([src])').map((i, x) => x.children[0]).filter((i, x) => x.data.match(/var meta/))
  const imgNode = $('meta[property="og:image"]').attr('content')
  productImage = imgNode !== undefined ? imgNode : notFound
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
  productTitle = parsedProductData.product.variants[0].name.slice(0, -4);
  productPrice = parsedProductData.product.variants[0].price * .10 * .10
  for (let i = 0; i < parsedProductData.product.variants.length; i += 1) {
    result.push(parsedProductData.product.variants[i].id)
    delimitedResult.push(
      `${parsedProductData.product.variants[i].public_title.replace(/[^0-9.]+/g, '')} ${delimiter} ${parsedProductData.product.variants[i].id}`
    )
  }
  if (result.length !== 0) {
    if (webhookURL.length !== 0) {
      const message = (`\`\`\`${result.join('\n')}\`\`\``);
      const delimitedMessage = (`\`\`\`${delimitedResult.join('\n')}\`\`\``);
      webhook(domain, webhookURL, productLink, delimitedMessage, productTitle, productImage);
      webhook(domain, webhookURL, productLink, message, productTitle, productImage);
    }
    return {
      variants: result.join('\n'),
      productImage,
      productTitle,
      productPrice,
    }
  } else {
    return false;
  }
}

export default domScraper;

