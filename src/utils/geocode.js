const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamJlcmdtZWllciIsImEiOiJjanY5NzF2aXQwNXVlNDBucWc1dWV4czM0In0.h_peoVFks9WvoCayV9OUIg&limit=1'

    request({
        url, // Shorthand
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to geo service', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find the location. Tra another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode