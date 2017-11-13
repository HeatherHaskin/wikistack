var express = require('express');
var morgan = require('morgan');
var app = express();
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var models = require('./models')
var path = require('path');

app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', {noCache: true});

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

models.dbConnection.sync({force: true})
.then(function(){
  app.listen(1338, function(){
    console.log('Server is listening on PORT 1338');
  });
})
.catch(console.error);




app.get('/', function(req, res){
  res.send('/views/index');
})
