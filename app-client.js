$( document ).ready(function() {

  $('#convert').on('click',function(){

    // var arr = sabreToTextConversion($('textarea#rawData').val().split('\n'));

// https://git.heroku.com/limitless-badlands-97541.git

    var str = $('textarea#rawData').val();
    // 'http://localhost:8080/tests/'
//
    $.ajax({
      url: $(location).attr('href') + 'tests/',
      method: 'GET',
      data: {"data": str},
      dataType: 'json',
      cache: false
    }).done(function(data){

      // var t = 2;
      //
      // var testEval = '01+23456789';
      // var digitsOnly = /[\d|\+]/g;
      //
      // if(testEval.match(digitsOnly))
      // {
      //   $('#app').text(eval(testEval));
      // }

      console.log(data);

      var arr = data.success;

      $('#newData').val('');

      for(var index = 0; index < arr.length; index++)
      {
        $('#newData').val($('#newData').val() + '\n' +arr[index]);

      }


    }).fail(function(jqXHR, textStatus, errorThrown){

      console.log("jqXHR-" + jqXHR);
      console.log("textStatus-" + textStatus);
      console.log("errorThrown-" + errorThrown);

    });


  });

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



// if((arrLine[0]!=null && arrLine[1]!=null)
//     &&(arrLine[0]=='OPERATED' && arrLine[1]=='BY')){
//   returnValue = str;
// }
// else if ((arrLine[3]!=null)
//          && (/[1-7]/g.test(arrLine[3]))
//          && (months.includes(arrLine[2].substring(2,5)))) {
//
//       returnValue += '';
//
//       strAL = arrLine[1].substring(0,2);
//       strFlightNumber = arrLine[1].substring(2,6).trim();
//       strInventory = arrLine[1].substring(6,7).trim();
//
//       arrLine.shift();
//       arrLine.shift();
//
//       arrLine.unshift(strInventory);
//       arrLine.unshift(strFlightNumber);
//       arrLine.unshift(strAL);
//
//     alert('short ' + arrLine.join());
// }
// else if ((arrLine[4]!=null)
//          && (/[1-7]/g.test(arrLine[4]))
//          && (months.includes(arrLine[3].substring(2,5)))) {
//
//       returnValue += '';
//       arrLine.shift();
//     alert('long ' + arrLine.join());
// }


// 0 : "1"
// 1 : "AC"
// 2 : "7512Y"
// 3 : "23JAN"
// 4 : "1"
// 5 : "YTZYUL"
// 6 : "SS1"
// 7 : "1215"
// 8 : "1325"
// 9 : "/DCAC"
// 10 : "/E"

//  var digitsOnly = /[\d\s]/g;
//
// if(digitsOnly.test(str.substring(0,2)))
// {
//   alert('yup');
// }
// else {
//   alert('nope');
// }

  // $.ajax({
  //   url: 'http://localhost:8080/tests/',
  //   method: 'GET',
  //   data: {},
  //   dataType: 'json',
  // }).done(function(data){
  //
  //   var t = 2;
  //
  //   var testEval = '01+23456789';
  //   var digitsOnly = /[\d|\+]/g;
  //
  //   if(testEval.match(digitsOnly))
  //   {
  //     $('#app').text(eval(testEval));
  //   }
  //
  //
  //
  //   // console.log(data);
  //
  //
  // }).fail(function(jqXHR, textStatus, errorThrown){
  //
  //   console.log("jqXHR-" + jqXHR);
  //   console.log("textStatus-" + textStatus);
  //   console.log("errorThrown-" + errorThrown);
  //
  // });

//
// });


// {"menu": {
//   "id": "file",
//   "value": "File",
//   "popup": {
//     "menuitem": [
//       {"value": "New", "onclick": "CreateNewDoc()"},
//       {"value": "Open", "onclick": "OpenDoc()"},
//       {"value": "Close", "onclick": "CloseDoc()"}
//     ]
//   }
// }}


// {"widget":
//   {
//     "debug": "on",
//     "window": {
//         "title": "Sample Konfabulator Widget",
//         "name": "main_window",
//         "width": 500,
//         "height": 500
//     },
//     "image": {
//         "src": "Images/Sun.png",
//         "name": "sun1",
//         "hOffset": 250,
//         "vOffset": 250,
//         "alignment": "center"
//     },
//     "text": {
//         "data": "Click Here",
//         "size": 36,
//         "style": "bold",
//         "name": "text1",
//         "hOffset": 250,
//         "vOffset": 100,
//         "alignment": "center",
//         "onMouseUp": "sun1.opacity = (sun1.opacity / 100) * 90;"
//     }
//   }
// }









// 1 UA8173Y 23FEB 4 YYZDTW*SS1  1250  1359  /DCUA /E
// OPERATED BY /AIR CANADA EXPRESS - AIR GEORGIAN
// YYZ CHECK-IN WITH AIR CANADA
// AIR CANADA
// /AIR CANADA EXPRESS - AIR GEORGIAN
// 2 UA3626Y 23FEB 4 DTWIAH*SS1  1452  1712  /DCUA /E
// OPERATED BY /REPUBLIC AIRLINES DBA UNITED EXPRESS
// REPUBLIC AIRLINE INC
// /REPUBLIC AIRLINES DBA UNITED EXPRESS
// ADV PAX FLT ARRIVES TERMINAL-A
// ADV PAX FLT DEPARTS TERMINAL-N
// OPERATED BY-REPUBLIC AIRLINES DBA UNITED EXPRESS
// 46FA.46FA*APM 1547/23SEP16
