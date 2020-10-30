const axios = require('axios');
const dotenv = require('dotenv');
const fs = require('fs');


dotenv.config();
const axiosConfig = {
    headers: {
        'Authorization': `Bearer ${process.env.JWT_TOKEN}`,
        'Content-Type': 'application/json'
    }
};

async function script(config) {
    try {
        const madokaData = await fs.readFileSync('./madoka.json');
        const data = JSON.parse(madokaData);
        const resp = await axios.post('http://localhost:3030/weiss-cards', data, config);
        if(resp.status != 200) {
            return console.log('error???');
        }
        console.log("added cards successfully. please check your database!");

    } catch(err) {
        console.log(err);
    }

    return;
}

script(axiosConfig);
