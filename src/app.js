const express = require('express')
const { Server } = require('https')
const request = require('request')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const { resourceUsage } = require('process')
const geocode = require('./utils/geocode')
const app = express()


// define path for Express config

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup paths for engine and views location 

app.set('view engine', 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)



// setup static directory and views location 
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Aryavardhan Modi'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Unable to find ! Try another search'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})



app.get('/products', (req, res) => {
    if(!req.query.search)
    {
        return res.send({
            error : "Provide search term !"
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})



app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Weather'
    })
})



app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Hello this is the help page of the weather app' ,
        title : "Hello world"
    })
})



app.get('/help/data', (req, res) => {
    res.render('help/data', {
        message: 'Hello this is the help page of the weather app' ,
        title : "Help data"
    })
})




app.get('/*/*' , (req , res) =>{  // for specific linked pages to the main route 
    res.send('this help article not found')
})
// '*' tries to match for the route handlers if not then we send 404 message  , always keep at last 


app.get('*' , (req , res) =>{   // for generic pages 
    res.render('404' , {
        title : "Error 404" , 
        message : 'Page not found'})
})

app.listen(3000 , () =>{
    console.log('Server is running on port 3000 !')
})

module.exports = {
    geocode : geocode, 
    forecast : forecast
}


/*  what is the problem with the code given below ?
app.get('/products', (req, res) => {
    if(!req.query.search)
    {
        res.send({
            error : "Provide search term !"
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})



ans. user trying to send 2 responses to the serer when only one can be sent inorder to stop the execution of the second request simply add return to the first reuqest. 
*/