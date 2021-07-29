// WEATHER APPLICATION  (weather stack api)

const request = require('request')

const forecast = (latitude , longitude , callback) =>
{
        const url = 'http://api.weatherstack.com/current?access_key=165de6b5412981563d573f612ee3fbfc&query='+ latitude + ',' + longitude 
        
        request({url , json : true} ,(error , {body}) =>{ // instead of using response we have refactored the code and using the es6 shorthand notation , used {body} only 

        // console.log(response.body.current);
        if(error)
        {
            callback('Unable to connect !' , undefined)
        }
        else if(body.error)
        {
            callback("Unable to find the place. Try another search " , undefined)
        }
        else
        {
            callback(undefined ,{
                Temperature_initial : body.current.temperature , 
                Temperature_feels_like :  body.current.feelslike, 
                Precipitation_prob : body.current.precip ,
                forecast : body.current.weather_descriptions[0]
            })
        }
    }) 

}

module.exports = forecast