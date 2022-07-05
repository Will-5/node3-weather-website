const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const app = express()
const port = process.env.PORT || 3000

//define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '/templates/views')
const partialsPath = path.join(path.join(__dirname, '/templates/partials'))

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectory))


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'William'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'William'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        text: 'App under construction',
        name: 'William'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error:'Must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error: error })
        }    

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error: error })
            }    
            res.send({
                address: req.query.address,
                weather: forecastData,
                location: location
            })
        })
    })
})

app.get('/weather', (req, res) => {
    res.send({
        location: 'Curitiba',
        weather: 'It\'s 20 C degrees and sunny'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Error 404 - help article not found',
        name: 'William'
    })
})

app.get('*',(req, res) => {
    res.render('404', {
        title: '404',
        error: 'Error 404 - page not found',
        name: 'William'
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})