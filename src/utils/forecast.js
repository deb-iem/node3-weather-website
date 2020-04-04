const request = require('request')

const forecast = (a, b, callback) => {
    const serviceURL = 'https://api.darksky.net/forecast/3fe3b42bedaba037a630e4cd347e59c1/'+a+','+b
    request({ url : serviceURL, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to contact the weather service', undefined)
        } else if(body.error) {
            callback('Invalid co-ordinates specified, please try with valid data', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degrees out with the highest being '+body.daily.data[0].temperatureHigh+' degrees and the lowest being '+body.daily.data[0].temperatureLow+' degrees. There is a '+body.currently.precipProbability+'% chance of rain.')
        }
    })
}

module.exports = forecast