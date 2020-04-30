const path = require('path')

const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')


const app = express()

//define path for Express Config
const pulicpath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../template/views')
const patialsPath = path.join(__dirname,'../template/partials')

//set up Handle bar engine and view location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(patialsPath)

//static directory to serve
app.use(express.static(pulicpath))


app.get('', (req, res )=>{
    res.render('index', {
        titile:'Weather ',
        name:'suhail'
    })
})
app.get('/about', (req, res )=>{
    res.render('about',{
        titile: "Weather ",
        name: 'Suhail'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        message:'Site under construction !!',
        titile: 'Help',
        name:'suhail'
    })
})

app.get('/weather',(req, res)=>{
    const address = req.query.address
    if(!address){
         res.send({
            error:'You must provide an address !'
        })
    }else{
        geocode(address,(error,{ latitude, longitude, location}={})=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            forcast(latitude, longitude , (error , forcastdata)=>{
                if(error){
                    return res.send({
                        error:error
                    })
                }
                res.send({
                    forcast:forcastdata,
                    location:location
                })
               
            })
        
        })
    }
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        titile:'Weather ',
        message:'Help article not found',
        name:'suhail'
    })
})
app.get('*',(eeq,res)=>{
    res.render('404',{
        titile:'Weather ',
        message:'404:Page Note found',
        name:'suhail'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})
