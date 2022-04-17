const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 3000
const fetch = require('isomorphic-fetch')

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('12')
})

app.listen(port, () => {
    console.log(`localhost:${port}`)
})

app.use('/getdata', async (req, res) => {
    data = await fetch('https://dt.miet.ru/ppo_it_final', {headers: {
       'X-Auth-Token': `hkgfsqtk`
    }}).then(response => response.json())
    // console.log(data)
    res.send(data)
})