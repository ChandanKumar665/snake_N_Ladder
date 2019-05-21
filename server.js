//importing modules
var express = require('express');
var body_parser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');

var app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000,function(){
    console.log('server started at port 3000');
});

app.get('/',function(req,res){
    res.render('index');
});

