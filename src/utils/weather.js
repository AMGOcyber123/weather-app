// WEATHER APPLICATION  (weather stack api)

const request = require('request')

const weatherstack = (location , callback) =>
{
        const url = 'http://api.weatherstack.com/current?access_key=165de6b5412981563d573f612ee3fbfc&query='+encodeURIComponent(location)+'&units=f'
        
        request({url : url , json : true} ,(error , response) =>{
        // console.log(response.body.current);
        if(error)
        {
            callback('Unable to connect !' , undefined)
        }
        else if(response.body.error)
        {
            callback("Unable to find the place via the coordinates !" , undefined)
        }
        else
        {
            callback(undefined , 
                {
                    Temperature1 : response.body.current.temperature , 
                    Temperature2 :  response.body.current.feelslike, 
                    Precipitation_prob : response.body.current.precip
                })
        }
    }) 

}

module.exports = weatherstack