import webhookMessage from './webhookClub';
const axios = require('axios');

export default setInterval(async () => {
  axios('/clubMonitor')
    .then((response) => {
      if (response.data === 'Available') {
        webhookMessage(
          'https://www.costco.com/',
          'https://discord.com/api/webhooks/880141784456503329/aPcTwPj71fbMp-0_hfAaGG5ITYfyWNVhbZ5ZMqM5tWs-zEMAFfdu3gZVnBRKUOc0S7eo',
          'https://www.costco.com/callaway-edge-10-piece-golf-club-set%2C-right-handed---stiff-flex.product.100683880.html',
          'PRODUCT LOADED - Callaway Edge 10 Piece Golf Club',
          'https://img.btdmp.com/10219/10219842/products/0x540@162541728885e5f75ca0.jpeg'
        );
        webhookMessage(
          'https://www.costco.com/',
          'https://discord.com/api/webhooks/880141073790414920/SGQUUQvazYCnlzmCKUetOMS-XIdNlHufoknArURgQ0s-g2Acx2wQoJGxCuGUCIUxKFfu',
          'https://www.costco.com/callaway-edge-10-piece-golf-club-set%2C-right-handed---stiff-flex.product.100683880.html',
          'PRODUCT LOADED - Callaway Edge 10 Piece Golf Club',
          'https://img.btdmp.com/10219/10219842/products/0x540@162541728885e5f75ca0.jpeg'
        );
      } else {
        return false
      }
    })
    .catch((err) => err);
}, 30000)


