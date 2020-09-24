 const path = require('path') //Core Node Module for pointing to a specific folder
 const express = require('express')
 const hbs = require('hbs')
 const geocode = require('./utils/geocode') 
 const forecast = require('./utils/forecast')


 const app = express() // here we will not pass any argument
 const port = process.env.PORT || 3000 //for heroku deployment
 
 //define paths for Express config
 const publicDirectoryPath = path.join(__dirname, '../public') //setting to go to this folder by using path module
 const viewsPath = path.join(__dirname, '../templates/views') //setting path for views 
 const partialsPath = path.join(__dirname, '../templates/partials')
 

 //Setup handlebars engine and views location
 app.set('view engine', 'hbs') // templating engine handlebars for dynamic assets
 app.set('views', viewsPath)
 hbs.registerPartials(partialsPath)
 //setup static directory to serve
 app.use(express.static(publicDirectoryPath)) // calling the folder

   app.get('', (req, res) => {
      res.render('index', {
         title:'Weather App',
         name:'Mak Ryder',
         
      }) // render allows us to render one of our viwes
   }) //'' leaving blank defines that it's root folder

   app.get('/about', (req, res) => {
      res.render('about', {
         title:'About Us',
         name:'Vegeta',
         
      })
   })

   app.get('/help', (req, res) => {
      res.render('help', {
         title:'Help',
         name:'Mak Ryder',
         
      })
   })
    // app.get() will let us do when someone tries to access a specific url 
     //res.send() is the response from site owner to user's request

 // express can detect html
   
 

    app.get('/weather', (req, res) => {
       if(!req.query.address) {
         return res.send({
            error:"You must provide an address"
         })
      }
       
      geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if(error){
               return res.send({ error })
            }
         forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
               return res.send({ error });
            }
            res.send({
               forecast:forecastData,
               location: location,
               address: req.query.address,
            })
         })
      })
   })

   app.get('/help/*',(req, res)=>{
      res.render('404', {
         title:'404',
         name:'Mak Ryder',
         errorMessage:'Help article not found..!!'
      })
      
   })

   app.get('*',(req, res) => {
      res.render('404', {
         title:'404',
         name:'Mak Ryder',
         errorMessage:'Page not found'
      })
   })
   
   // express can also detect object and array and json 
 app.listen(port , () => {
    console.log('Server is up on port' + port);
 })//  starts the server and listen to specific port and also have a callback


 // exaple we are having a website 
 // app.com --> this is called root directory
 // app.com/help --> this are called routes of root directory mtlb root pr aane k baad kha jaana h
 // app.com/about --> same as above