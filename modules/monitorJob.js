import webhookMessage from './webhookMonitor';
import monitorScraper from './monitorScraper';
const axios = require('axios');
const notFound = 'https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png'

export default setInterval(async () => {
  let productImage, title, webhookURL;
  axios('/getAllMonitors')
    .then((response) => {
      response.data.forEach(async (item) => {
        const productArray = item.product.split('/');
        const handle = productArray[productArray.length - 1];
        const domain = productArray[2];
        const { user_id, product } = item;
        const productLink = item.product;
        axios.post('/getMonitorWebhook', {
          user_id,
        })
          .then((webhook) => webhookURL = webhook.data)
          .catch((err) => console.log(err));
        axios(product)
          .then((data) => {
            return monitorScraper(data.data, handle);
          })
          .then((response) => {
            if (response) {
              const QT = `[Balko](http://localhost:6776/?url=${productLink})`
              const result = [];
              const delimitedResult = [];
              title = response.title;
              response.variants.forEach((product) => {
                if (product.available) {
                  result.push(product.id);
                  delimitedResult.push(
                    `${product.title.replace(/[^0-9.]+/g, '')} - ${product.id}`
                  )
                }
              })
              productImage = response.featured_image !== undefined ? `http:${response.featured_image}` : notFound
              if (response.available) {
                const message = (`\`\`\`${result.join('\n')}\`\`\``);
                const delimitedMessage = (`\`\`\`${delimitedResult.join('\n')}\`\`\``);
                webhookMessage(domain, webhookURL, product, QT, message, `RESTOCK -- ${title}`, productImage);
                webhookMessage(domain, webhookURL, product, QT, delimitedMessage, `RESTOCK -- ${title}`, productImage);
              } else {
                return false;
              }
            } else {
              return false
            }
          })
          .catch((err) => console.log(err));
      })
    })
    .catch((err) => console.log(err));
}, 30000)


