const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)

app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Deboyoti'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me',
        name: 'Debojyoti'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        message: 'This page will outline help options for the weather app',
        title: 'Help',
        name: 'Debojyoti'
    })
})
app.get('/weather',(req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address to get the weather!'
        })
    } else {
        geocode(req.query.address,(error, {latitude, longitude, location} = {}) => {
            if(error) {
                return res.send({error})
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
    }
})

app.get('/help/*',(req, res) => {
    res.render('pagenotfound',{
        message: 'Help article not found.',
        title: '404',
        name: 'Debojyoti'
    })
})

app.get('*',(req, res) => {
    res.render('pagenotfound',{
        message: 'Page not found.',
        title: '404',
        name: 'Debojyoti'
    })
})

app.listen(port,() => {
    console.log('server started on port '+port)
})