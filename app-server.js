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
var  port = 8080;

// an array to maintain the number
// of connectons the server is currently
// maintaining
var connections = [];

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

  var str = '';

  for(var index = 0; index < arr.length; index++)
  {

    if (arr[index].substring(0,13).trim()=="OPERATED BY") {

      returnValue.push(arr[index]);

    }
    else {

      str = arr[index].substring(2).trim();

      if(/[1-9|A-Z][1-9|A-Z][0-9][0-9|\s][0-9|\s][0-9|\s][A-Z]/.test(str.substring(0,10).trim()))
      {

        arrLine = str.trim().split(spaces);

        // extract flight number details
        strAL = arrLine[0].substring(0,2);
        strFlightNumber = arrLine[0].substring(2,6).trim();
        strInventory = arrLine[0].substring(6,1).trim();

        arrLine.splice(0, 1, strAL,strFlightNumber, strInventory);

        returnValue.push(arrLine);

      }
      else if(/[1-9|A-Z][1-9|A-Z][\s][0-9|\s][0-9|\s][0-9|\s][A-Z]/.test(str.substring(0,10).trim()))
      {

        arrLine = str.trim().split(spaces);

        strFlightNumber = arrLine[1].substring(0,arrLine[1].length-1).trim();
        strInventory = arrLine[1].substring(arrLine[1].length,arrLine[1].length-1);

        arrLine.splice(1, 1, strFlightNumber,strInventory);

        returnValue.push(arrLine);

      }
    }
  }

  return returnValue;

}


function getAirline()
{
  
}

function getAirport()
{

}
