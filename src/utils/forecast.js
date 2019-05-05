const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/39e79092278acdea028920846857fad3/' + longitude + ',' + latitude + '?units=si&lang=de'

    request({url, json: true}, (error, { body }) => { // Normal: url:url, but shorthand is url
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            callback(undefined, {
                summary: body.currently.summary,
                temperature: body.currently.temperature
            })

        }
    })
}

module.exports = forecast