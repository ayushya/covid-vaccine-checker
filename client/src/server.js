const https = require('https');
const axios = require('axios');
// const options = {
//     hostname: 'cdn-api.co-vin.in',
//     port: 443,
//     path: '/api/v2/location/states',
//     method: 'GET'
// }

// const req = https.request('https://cdn-api.co-vin.in/api/v2/admin/location/states', res => {
//     console.log(`statusCode: ${res.statusCode}`)

//     res.on('data', d => {
//         console.log(d);
//         process.stdout.write(d)
//     })
// })

// req.on('error', error => {
//     console.error(error)
// })

// req.end()

axios('https://cdn-api.co-vin.in/api/v2/admin/location/states')
.then((res) => { console.log(res.data)});