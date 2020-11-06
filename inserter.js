const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');
const firebase = require('firebase/app');

require('firebase/auth');

const config = require('./firebase-config');

firebase.initializeApp(config);


async function script() {
    try {
        await firebase.auth().signInWithEmailAndPassword(process.env.EMAIL, process.env.PASSWORD);

        const madokaData = await fs.readFileSync('./bunko.json');
        const data = JSON.parse(madokaData);
        const token = await firebase.auth().currentUser.getIdToken();

        const axiosConfig = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const resp = await axios.post('http://localhost:3000/admin/card/create', data, axiosConfig);

        if(resp.status != 200) {
            return console.log('error???');
        }
        console.log("added cards successfully. please check your database!", resp.data);

    } catch(err) {
        console.log(err);
    } finally {
        await firebase.auth().signOut();
    }

    return;
}

script();
