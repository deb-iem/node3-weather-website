const request = require('request')

const geocode = (address, callback) => {
    const serviceURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGViLWllbSIsImEiOiJjazg4enU5aDkwMWxmM2pwamZydzBrankwIn0.lMkiBi0fsA0nfxQF9bTOfA&limit=1'
    request({ url : serviceURL, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to the geocoding service!', undefined)
        } else if(body.features.length === 0) {
            callback('No locations found. Try changing your search criteria', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode