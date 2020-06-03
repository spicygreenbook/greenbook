
async function getListings() {

  var sheet = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTb5tlJvpBJH4dl8AMk-BRIgtGkPGZiTu601WxtVgQHXw70pKMpVf9klP8Ge7WZnQevXtvL8c9be4Aq/pub?gid=0&single=true&output=csv'
  function CSVToArray( strData, strDelimiter ){
      // Check to see if the delimiter is defined. If not,
      // then default to comma.
      strDelimiter = (strDelimiter || ",");

      // Create a regular expression to parse the CSV values.
      var objPattern = new RegExp(
          (
              // Delimiters.
              "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

              // Quoted fields.
              "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

              // Standard fields.
              "([^\"\\" + strDelimiter + "\\r\\n]*))"
          ),
          "gi"
          );


      // Create an array to hold our data. Give the array
      // a default empty first row.
      var arrData = [[]];

      // Create an array to hold our individual pattern
      // matching groups.
      var arrMatches = null;


      // Keep looping over the regular expression matches
      // until we can no longer find a match.
      while (arrMatches = objPattern.exec( strData )){

          // Get the delimiter that was found.
          var strMatchedDelimiter = arrMatches[ 1 ];

          // Check to see if the given delimiter has a length
          // (is not the start of string) and if it matches
          // field delimiter. If id does not, then we know
          // that this delimiter is a row delimiter.
          if (
              strMatchedDelimiter.length &&
              strMatchedDelimiter !== strDelimiter
              ){

              // Since we have reached a new row of data,
              // add an empty row to our data array.
              arrData.push( [] );

          }

          var strMatchedValue;

          // Now that we have our delimiter out of the way,
          // let's check to see which kind of value we
          // captured (quoted or unquoted).
          if (arrMatches[ 2 ]){

              // We found a quoted value. When we capture
              // this value, unescape any double quotes.
              strMatchedValue = arrMatches[ 2 ].replace(
                  new RegExp( "\"\"", "g" ),
                  "\""
                  );

          } else {

              // We found a non-quoted value.
              strMatchedValue = arrMatches[ 3 ];

          }


          // Now that we have our value string, let's add
          // it to the data array.
          arrData[ arrData.length - 1 ].push( strMatchedValue );
      }

      // Return the parsed data.
      return( arrData );
  }


  let data = await fetch(sheet);
  let csv = await data.text();
  var res = [];
  var parsed_data = CSVToArray(csv);
  var line = parsed_data[0];
  var colmap = {};
  parsed_data[0].forEach((key, c) => {
      colmap[c] = (key || '').trim().toLowerCase().replace(/ /ig, '_');
  })
  let rows = parsed_data.slice(1).map((row, r) => {
      let ret = {};
      parsed_data[0].forEach((key, c) => {
          ret[key] = row[c] || '';
      });
      return ret;
  });
  return rows
}

module.exports = getListings;