const express = require('express')
const cors = require('cors')
const app = express(), PORT = 8080;;
const Router = require('./Routers/PostRouter.js')

const { MongoClient } = require('mongodb'), URL = `mongodb://localhost:27017`;
const client = new MongoClient(URL, {
    useNewUrlParser: true, useUnifiedTopology: true,
});
client.connect()
    .then((val) => {
        global.database = client.db('Prctice');
        console.log("mongo connected......");
    })
    .catch((err) => console.log("mongo not connected"))


app.use(express.json());
app.use(cors());

app.use('/api/v3/app', Router);

app.listen(PORT, () => console.log(`server is running on ${PORT}`) );
