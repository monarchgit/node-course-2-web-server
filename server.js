const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//heroku uses this envs for local default to 3000 
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');

hbs.registerHelper('getCurrentYear', () => {return new Date().getFullYear()});

hbs.registerHelper('screamIt', (text) => {return text.toUpperCase()});

app.use((req, res, next) => {
    var now = new Date().toString();
    //backtick with variable referenced
    var log =`${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log +'\n', (err) => {
    if (err) {
        console.log('log error');
    }
    });
    next();
});

//app.use((req, res, next) => {
//   res.render('maintenance.hbs',{
//       pageTitle: 'Maint'
//   }); });

app.get('/',(req,res) => {
   res.render('home.hbs',{
       pageTitle: 'Home Page',
       text:'hi man'
   }); 
});
app.use(express.static(__dirname + '/public'));
app.get('/about',(req,res) =>{
   res.render('about.hbs',{
       pageTitle: 'About Page'
   }); 
})


app.get('/bad',(req,res) =>{
   res.send({error:'this is an error'}); 
})

app.listen(port,() =>{
    console.log(`server is up on port ${port} `);
});
