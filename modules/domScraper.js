import webhook from './webhook';

const cheerio = require('cheerio');

const domScraper = (data, webhookURL, domain, productLink, handle, delimiter) => {
  delimiter = delimiter !== '' ? delimiter : '-';
  const result = [];
  const delimitedResult = [];
  let productTitle, productImage, productPrice;
  const notFound = 'https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png'
  const $ = cheerio.load(data, { xmlMode: false });
  const productNode = $("script[type='application/json']").map((i, x) => x.children).filter((i, x) => x.data.match(handle))
  const parsedProductData = JSON.parse(productNode[0].data);
    productImage = parsedProductData.featured_image !== undefined ? `http:${parsedProductData.featured_image}` : notFound
    productTitle = parsedProductData.title;
    productPrice = parsedProductData.price * .10 * .10
    for (let i = 0; i < parsedProductData.variants.length; i += 1) {
      result.push(parsedProductData.variants[i].id)
      delimitedResult.push(
        `${parsedProductData.variants[i].title.replace(/[^0-9.]+/g, '')} ${delimiter} ${parsedProductData.variants[i].id}`
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

