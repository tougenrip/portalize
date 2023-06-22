const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const UserModel = require('./form.cjs')

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://paffdb:paffdb@cluster0.bgv0qii.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });

app.post('https://portalize.io/insert', async(req, res) => {
    const name = req.body.name
    const email = req.body.email
    const twitter = req.body.twitter

    const formData = new UserModel({
        name: name,
        email: email,
        twitter:twitter,
    })

    try {
        await formData.save();
        res.send(formData)
    } catch(err) {
        console.log(err)
    }
});

const port = process.env.PORT || 4000;

app.listen('portalize.io:'+port, () => {
    console.log(`Server started on port ${port}`);
});