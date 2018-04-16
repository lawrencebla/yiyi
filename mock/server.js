var app = require('express')();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/', function (req, res) {
  console.log(req.body);
  if( req.body.action ) {
  	res.set({
  		'Content-Type': 'text/html'
  	});

  	res.sendFile(__dirname + '/' + req.body.action + '.json'); 
  } else {
  	res.send('Not Found')
  }
})


var server = app.listen(8000, function () {
  console.log('mock server start');
});