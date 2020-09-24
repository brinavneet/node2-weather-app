 const request = require('request')
     
    const forecast = (latitude, longitude, callback) => {
        const url = 'http://api.weatherstack.com/current?access_key=cc02b7ace5380b47ba23fad3d0c8106e&query='+latitude+","+longitude+'&unit=m'
        
        request({ url:url, json:true}, (error, response) =>{
            if(error){
                callback("Unable to connect with weather service !!", undefined);
            } else if(response.body.error){
                callback("Unable to find location! Try something else ", undefined);
            } else{
                callback(undefined,"Weather is: " +response.body.current.weather_descriptions[0] +". It is currently "+ response.body.current.temperature +" degree out. But feels like "+response.body.current.feelslike+"."
                ) // \n for next line
            }
        })
    }
 module.exports = forecast