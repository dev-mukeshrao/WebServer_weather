const express = require('express');
const path = require('path');
const hbs = require('hbs');
const request = require('request');
const forecast = require('./utils/forecast')

console.log(__dirname);
//console.log(path.join(__dirname, '../public'));
const publicdirectory = path.join(__dirname, '../public');
const partialpath = path.join(__dirname, '../views/partials')
const app = express();
const port = process.env.PORT || 3000

app.set('view engine','hbs');
app.use(express.static(publicdirectory))
hbs.registerPartials(partialpath)



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mukesh Rao'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mukesh Rao'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{title: 'Help',
    name: 'Mukesh Rao'})
})

app.get('/weather', (req,res) => {
   if(!req.query.search){
       return res.send({
        error: 'You must provide search term'
       })
   }

   const location = req.query.search;
   
   forecast(location, (err, data) => {
       
        if(err){
           return res.send({error: err.message })
        }
        res.send({
            
            forecast: `Time is ${data.location.localtime}, Condition today is ${data.current.condition.text} wind direction is ${data.current.wind_dir} and its speed in KPH is ${data.current.wind_kph}`,
            location: data.location.country,
            address: data.location.name,
            ast: data.forecast
            
    
        })

   })

   

    

})



app.get('/help/*', (req, res) => {
    res.render('404',{
        Title: '404',
        Msg: 'Help Article not found',
        name: 'Mukesh Rao'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        Title: '404',
        Msg: 'There is no page stating name',
        name: 'Mukesh Rao'
    })
})

app.listen(port, () => {
    console.log('server up and running on port' + port);
})