const express = require("express");
const path = require("path");
const serveStatic = require("serve-static");
const app = express();
const bodyParser = require('body-parser');
require("custom-env").env("stating")
const db = require("./db.js");
const OEM = require("./src/models/OEM.js");



// app.use("/", serveStatic(path.join(__dirname, "/dist")));


// app.get(/.*/, (req, res) => {
//     res.sendFile(path.join(__dirname, "/dist/index.html"));
// })

app.use(bodyParser.json());

//Functions-Methods
app.post('/api/add-oem', async (req, res, next) => {
    try {
        console.log(req.body)
        let oem = new OEM();
        oem.name = req.body.name;
        oem.id = req.body.id;
        oem.price = req.body.price;
        await oem.save();
        res.send({ saved: true })
    } catch (error) {
        console.log(error);
        res.send({ error: error.message })
    }
})


app.get('/api', async (req, res, next) => {
    res.send({ oem: await OEM.getAll() });
})

app.post('/api/delete-oem/:id', async (req, res, next) => {
   
    try {
        await OEM.delete(req.params.id);
        res.send({ deleted: true })
    } catch (error) {

    }
})


const port = process.env.PORT || 3000;
var host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(port, host, (res) => {
    console.log("Listening on port " + port);
});
