const request = require('request')
const geocode = require('./geocode.js')
const forecast = require('./forecast')

geocode(location , (error,data) =>{ //call to geocode 
    if(error)
    {
        return console.log(error)
    }

    forecast(data.latitude , data.longitude , (error, forecast_data) => { // asynch io operation
        if(error)
        {
            return console.log(error)
        }
        console.log('Location : ' , data.location);
        console.log('Forecast : ', forecast_data)
    })
})

module.exports = {
    geocode : geocode
}