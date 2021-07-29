// Geocoding 
// Address => Lat/Long -> Weather


const request = require('request')
const geoCode = (address,callback) =>
{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW1nb2JvdCIsImEiOiJja3F6Z2ZoY2EwNnY0MnNsZ2gwOTV1aWlhIn0.gzknmCddSJBrthD2il69aw&limit=1'
    request({url , json : true} , (error ,  {body}) =>{
        if(error)
        {
            callback('Unable to connect !' , undefined)
        }
        else if(body.features.length == 0)
        {
            callback("Unable to find the place !" , undefined)
        }
        else{
            callback(undefined, {
                latitude : body.features[0].center[1] , 
                longitude : body.features[0].center[0] ,
                location : body.features[0].place_name
            }) 
        }

    })
}

module.exports = geoCode

// difference occurs in using address and encodeURIcomponent(address) is that when one use special characters then the entire meaning of the url changes in case of address exp : ? becomes %3F