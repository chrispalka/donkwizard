const cheerio = require('cheerio');

const monitorScraper = (data, handle) => {
  const $ = cheerio.load(data, { xmlMode: false });
  const productNode = $("script[type='application/json']").map((i, x) => x.children).filter((i, x) => x.data.match(handle))
  const parsedProductData = JSON.parse(productNode[0].data);
  return parsedProductData
};

export default monitorScraper;

