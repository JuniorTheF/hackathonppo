const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 3000
const fetch = require('isomorphic-fetch')
const knex = require('./knex').default


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

app.use('/putsensordata', async (req, res) => {
    data = await fetch('https://dt.miet.ru/ppo_it_final', {headers: {
       'X-Auth-Token': `hkgfsqtk`
    }}).then(response => response.json())
    sensors = data.message.map(async item => await knex.insert({
        coord_x: item.coords[0],
        coord_y: item.coords[1],
        sensor_id: item.id
    }).into('sensor'))
    swans = data.message.map(async item => 
        item.swans.map(async swan => await knex.insert({
            swan_id: swan.id,
            rate: swan.rate,
            sensor_id: item.id
        }).into('data')))
    res.send('ok')
})

// app.use('/putswandata', async (req, res) => {
//     data = await fetch
// })