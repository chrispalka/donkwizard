/* eslint-disable no-param-reassign */
import webhook from './webhook';

const scraper = (data, webhookURL, domain, handle, productLink, delimiter = ':') => {
  delimiter = delimiter !== '' ? delimiter : ':';
  let productTitle, productImage;
  const delimitedResult = [];
  const result = [];
  const handleRegEx = new RegExp(`^${handle}$`);
  const variantRegEx = new RegExp(/[^0-9.]+/g);
  Object.values(data).forEach((productList) => {
    productList.forEach((product) => {
      product.variants.forEach((variant) => {
        if (product.handle.match(handleRegEx)) {
          productTitle = product.title;
          productImage = product.images[0].src;
          if ((variant.option1).match(/[0-9]/) && domain !== 'bdgastore.com') {
            delimitedResult.push(
              `${variant.option1.slice(0, 7).replace(variantRegEx, '')} ${delimiter} ${variant.id}`,
            );
            result.push(variant.id);
          } else if (!(variant.option1).match(/[0-9]/)) {
            delimitedResult.push(
              `${variant.option2} ${delimiter} ${variant.id}`,
            );
            result.push(variant.id);
          } else {
            delimitedResult.push(
              `${variant.option2.slice(0, 7).replace(variantRegEx, '')} ${delimiter} ${variant.id}`,
            );
            result.push(variant.id);
          }
        }
      });
    });
  });
  if (result.length !== 0) {
    const delimitedMessage = (`\`\`\`${delimitedResult.join('\n')}\`\`\``);
    const message = (`\`\`\`${result.join('\n')}\`\`\``);
    webhook(domain, webhookURL, productLink, delimitedMessage, productTitle, productImage);
    webhook(domain, webhookURL, productLink, message, productTitle, productImage);
    return result.join('\n');
  } else {
    return false;
  }
};

export default scraper;