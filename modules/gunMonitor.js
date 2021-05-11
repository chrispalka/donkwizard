import webhookMessage from './webhookGun';
const axios = require('axios');

export default setInterval(async () => {
  axios('/gunMonitor')
    .then((response) => {
      if (response.data === 'Available') {
        webhookMessage(
          'https://www.georgiagunstore.com/',
          'https://discord.com/api/webhooks/841730390741745725/Tt8N5vuOwVGD-gWwv_k-gt0gNFWt3LnbeIGLtMjsClksmRTEuPzBc3BHE_5Fonpf36NU',
          'https://www.georgiagunstore.com/glock-45-9mm-mos-17rd-blk-reb.html',
          'RESTOCK - GLOCK 45 9MM MOS 17RD BLK REB',
          'https://www.georgiagunstore.com/pub/media/catalog/product/cache/d7339a089841e46eaea351e3bc746ce2/G/L/GLPR4550903MOSREB_1.jpg'
        );
        webhookMessage(
          'https://www.georgiagunstore.com/',
          'https://discord.com/api/webhooks/697216689464672296/hml2cwYyNaxhnkSYU9RwCNjf1u6gMUH2AsZKrkZey6LNlEXtDHXtCbIoaW7nTqVC_piV',
          'https://www.georgiagunstore.com/glock-45-9mm-mos-17rd-blk-reb.html',
          'RESTOCK - GLOCK 45 9MM MOS 17RD BLK REB',
          'https://www.georgiagunstore.com/pub/media/catalog/product/cache/d7339a089841e46eaea351e3bc746ce2/G/L/GLPR4550903MOSREB_1.jpg'
        );
      } else {
        return false
      }
    })
    .catch((err) => console.log(err));
}, 30000)


