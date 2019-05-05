const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars egine and views location
app.set('view engine', 'hbs') // Use for dynamic templates
app.set('views', viewsPath) // If not default views folder is used
hbs.registerPartials(partialsPath)

// Setup static directory to serve // Express checks top-bottom; e.g. first public, hbs
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Joern Bergmeier'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Joern Bergmeier'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Joern Bergmeier'
    })
})

// Wildcard char * used to handle all not routed requested pages
app.get('/help/*', (req, res) => {
    res.render('HelpNotFound', {
        title: 'Article not found',
        name: 'Joern Bergmeier'
    })
})

// Weather App - Calls the functions in utils folder (forecast and geocode)
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a valid Address.'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {})  => {
        if(error) {
            return res.send({
                code: 400,
                error
            })
        } 
        forecast(latitude, longitude, (error, {summary, temperature}) => {
            if(error) {
                return res.send({
                    code: 400,
                    error
                })
            }
            res.send({
                location, //Shorthand Version because key name = value variable name
                summary,
                temperature
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        // Return ends the function directly!
        return res.send({                         
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
}
)

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        name: 'Joern Bergmeier'
    })
})

app.listen(3000, () => {
    console.log('Server is up on Port 3000')
})
