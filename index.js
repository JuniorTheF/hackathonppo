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

// app.use('/getswandatas/', async (req, res) => {
//     const data = await knex.select('swan_id').from('data')
//     console.log(data)
//     ids = data.map(o => o.id)
//     const filteredData = data.filter(({id}, index) => !ids.includes(id, index+1))
//     console.log(filteredData)
//     res.send(filteredData)
// })

app.use('/getcoorddata/:id', async (req, res) => {
    const ids = await knex.select('sensor_id').where('swan_id', req.params.id).from('data')
    const rate = await knex.select('rate').where('swan_id', req.params.id).from('data')
    const newids = ids.map(item => item.sensor_id)
    const coord_x = await knex.select('coord_x').whereIn('sensor_id', newids).from('sensor')
    const coord_y = await knex.select('coord_y').whereIn('sensor_id', newids).from('sensor')

    console.log(ids.map(id => id.sensor_id))
    console.log([ids, rate, [coord_x, coord_y]])
    const pshod = [ids, rate, coord_x, coord_y]
    res.send(pshod)
})