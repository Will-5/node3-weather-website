// API key 0c61f01dce20a41d93072e04decdcc54
// Base API endpoint http://api.weatherstack.com/
const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0c61f01dce20a41d93072e04decdcc54&query=' + latitude + ',' + longitude + '&units=m'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Conection problem with WeatherStack API')
        } else if (body.error) {
            callback('ERROR: ' + body.error.info)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + 
                '. It is currently ' + body.current.temperature + 
                ' Celsius degrees in '+ body.location.name + 
                ' - ' + body.location.region + ' - ' + body.location.country + 
                '. It feels like ' + body.current.feelslike + ' degrees. And the humidity is '
                + body.current.weather_descriptions[0].humidity + '%.'
            )
        }
    })
}

module.exports = forecast