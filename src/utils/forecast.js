const request = require('request');


const forecast = (location, send) => {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=a5fbd01f91804ff1885150550220601&q=${location}&days=1&aqi=no&alerts=no`;

    request({ url: url, json: true}, (error, response)=>{

        if(error){
            send('there is error', '')
        }
        else if(response.body.error){
            send(response.body.error.message,'')
        }
        else{
            const data = response.body;
            const err = response.body.error;
            send(err, data);
        //    send('1',`Time is ${data.location.localtime}, Condition today is ${data.current.condition.text} wind direction is ${data.current.wind_dir} and its speed in KPH is ${data.current.wind_kph}`);
        //     send('3',`${data.location.name} -> Longtitute : ${data.location.lon} , Latitude : ${data.location.lat}`);
        
        //     const ast = response.body.forecast;
        
        //     ast.forecastday.forEach(ele => send('2',ele.astro))
        }
       
    })
    

}

module.exports =  forecast;