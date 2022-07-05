// Geocoding
// API key 8464da0dfd09b02a9ae7e509b766036a
// Base API endpoint http://api.positionstack.com/v1/forward
const request = require('request');


const geocode = (address, callback) =>{
    const url = 'http://api.positionstack.com/v1/forward?access_key=8464da0dfd09b02a9ae7e509b766036a&query=' + encodeURIComponent(address) + '&limit=1'

    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Conection problem with PositionStack API')
        } else if (body.error){
            callback(body.error.message)
        } else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].label
            })
        }
    })
}

module.exports = geocode