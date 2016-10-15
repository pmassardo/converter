var express = require('express');

var app = express();

// the folder used to server the index.html
// the css and bundle.js file
app.use(express.static('./public'));

// where bootstrap is served from
app.use('/bootstrap',express.static(__dirname + '/node_modules/bootstrap/dist/css/'));

// where jquery is served from
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

// where ajax is served from
app.use('/ajax', express.static(__dirname + '/node_modules/ajax/lib/'));

// port that will be used
// var  port = 8080;
var port = process.env.PORT || 8080;

// an array to maintain the number
// of connectons the server is currently
// maintaining
var connections = [];
var pg = require('pg');

var config = {
  user: 'alfredmassardo', //env var: PGUSER
  database: 'converter', //env var: PGDATABASE
  password: '', //env var: PGPASSWORD
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var pool = new pg.Pool(config);

var airports = {};
var airlines = {};

pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  // SELECT $1::int AS number
  client.query('SELECT code, name FROM airport;', null , function(err, result) {
    //call `done()` to release the client back to the pool
    done();

    if(err) {
      return console.error('error running query', err);
    }

    result.rows.forEach(function(value) {

      airports[value.code] = value.name;

    });

  });

  client.query('SELECT code, name FROM airline;', null , function(err, result) {
    //call `done()` to release the client back to the pool
    done();

    if(err) {
      return console.error('error running query', err);
    }

    result.rows.forEach(function(value) {

      airlines[value.code] = value.name;

    })

  });

});

pool.on('error', function (err, client) {
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  console.error('idle client error', err.message, err.stack)
})

// state default data
//var title = 'Untitled Presentation'

// port to use
var server = app.listen(port);

// display a message to the server log
// stating the URL and port
console.log("Polling server is running at 'http://localhost:" + port + "'");

app.get("/tests/", function(req, res) {

  var code = 200;

  var arr = sabreToTextConversion(req.query.data.split('\n'));

  res.status(200).json({"success": arr});

  // res.status(code || 500).json({"error": newContact});

});

function sabreToTextConversion(arr){

  //var months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  var spaces = /\s\s\s\s+|\s\s\s+|\s\s+|\s/g;
  var arrLine = [];
  var returnValue = [];
  var strAL = '';
  var strFlightNumber = '';
  var strInventory = '';
  var strOrigin = '';
  var strDestination = '';

  var str = '';

  for(var index = 0; index < arr.length; index++)
  {

    if (arr[index].substring(0,13).trim()=="OPERATED BY") {

      returnValue.push(arr[index]);

    }
    else {

      str = arr[index].substring(2).trim();

      // 3 AC7514Y 23JAN 1 YTZYUL SS1  1315  1425  /DCAC /E

      if(/[1-9|A-Z][1-9|A-Z][0-9][0-9|\s][0-9|\s][0-9|\s][A-Z]/.test(str.substring(0,10).trim()))
      {

        arrLine = str.trim().split(spaces);

        // extract flight number details
        strAL = airlines[arrLine[0].substring(0,2)];
        strFlightNumber = arrLine[0].substring(2,6).trim();
        strInventory = arrLine[0].substring(6,7).trim();
        strOrigin = airports[arrLine[3].substring(0,3).trim()];
        strDestination = airports[arrLine[3].substring(3,6).trim()];

        arrLine.splice(0, 1, strAL,strFlightNumber, strInventory);
        arrLine.splice(5, 1, strOrigin,strDestination);

        returnValue.push(arrLine);

      }
      else if(/[1-9|A-Z][1-9|A-Z][\s][0-9|\s][0-9|\s][0-9|\s][A-Z]/.test(str.substring(0,10).trim()))
      {
        // 2 PD 471Y 23JAN 1 YTZYUL SS1  1255  1405  /DCPD /E
        arrLine = str.trim().split(spaces);

        arrLine[0] = airlines[arrLine[0]];
        strFlightNumber = arrLine[1].substring(0,arrLine[1].length-1).trim();
        strInventory = arrLine[1].substring(arrLine[1].length,arrLine[1].length-1);
        strOrigin = airports[arrLine[4].substring(0,3).trim()];
        strDestination = airports[arrLine[4].substring(3,6).trim()];

        arrLine.splice(1, 1, strFlightNumber,strInventory);

        arrLine.splice(5, 1, strOrigin,strDestination);

        returnValue.push(arrLine);

      }
    }
  }

  return returnValue;

}
