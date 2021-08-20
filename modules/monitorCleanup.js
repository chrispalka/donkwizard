const axios = require('axios');

export default setInterval(async () => {
  axios('/monitorCleanup')
    .then((response) => response)
    .catch((err) => err);
}, 86400000)
