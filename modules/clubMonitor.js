import webhookMessage from './webhookClub';
const axios = require('axios');

export default setInterval(async () => {
  axios('/clubMonitor')
    .then((response) => {
      // if (response.data === 'Available') {
      //   webhookMessage(
      //     'https://www.costco.com/',
      //     'https://discord.com/api/webhooks/878319281656463370/mDqDQOoXERxhqGv6-lBv1xzqEzgrG_l4BXr4aL8xJe3c5upphBH3h3O79eB8kbvHliZo',
      //     'https://www.costco.com/callaway-edge-10-piece-golf-club-set%2C-right-handed---stiff-flex.product.100683880.html',
      //     'PRODUCT LOADED - Callaway Edge 10 Piece Golf Club',
      //     'https://img.btdmp.com/10219/10219842/products/0x540@162541728885e5f75ca0.jpeg'
      //   );
      //   webhookMessage(
      //     'https://www.costco.com/',
      //     'https://discord.com/api/webhooks/697216689464672296/hml2cwYyNaxhnkSYU9RwCNjf1u6gMUH2AsZKrkZey6LNlEXtDHXtCbIoaW7nTqVC_piV',
      //     'https://www.costco.com/callaway-edge-10-piece-golf-club-set%2C-right-handed---stiff-flex.product.100683880.html',
      //     'PRODUCT LOADED - Callaway Edge 10 Piece Golf Club',
      //     'https://img.btdmp.com/10219/10219842/products/0x540@162541728885e5f75ca0.jpeg'
      //   );
      // } else {
      //   return false
      // }
    })
    .catch((err) => err);
}, 30000)


