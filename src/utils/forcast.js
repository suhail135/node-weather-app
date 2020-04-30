const request = require('request')

const forcast = (lat,lon,callback)=>{

    const url ='http://api.weatherstack.com/current?access_key=3192f938f7cfd9956e9e0173f4e118e3&query='+decodeURIComponent(lat)+','+decodeURIComponent(lon)
    request({url, json:true },(error,{body}={})=>{
        if(error){
            callback('undable to connect to network')
        }else if(body.error){
            callback(body.error.info)
        }else{
            callback(undefined,"it's "+ body.current.weather_descriptions[0]+' and '+body.current.temperature+' degree celsius ')
        }
    })

} 

module.exports = forcast