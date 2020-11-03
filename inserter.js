const axios = require('axios');
const dotenv = require('dotenv');
const fs = require('fs');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYm90IiwidXNlcklkIjoxMCwiaWF0IjoxNjA0MjMyNDMxfQ.6VA0-lGDaiWvstkUTFnmN0RUMwFml8crPlp83rMLQEc";
dotenv.config();
const axiosConfig = {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
};

async function script(config) {
    try {
        const madokaData = await fs.readFileSync('./madoka.json');
        const data = JSON.parse(madokaData);
        const resp = await axios.post('http://localhost:3000/weiss-cards/create', data, config);
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
