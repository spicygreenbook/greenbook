import Link from 'next/link'

export default (props) => {

    const list = props.list.map((row, i) => {
      let processed = row;
      processed._actions = [];
      if(processed.Website){
        processed._actions.push(<a className="box-links" key={'website'+i} href={processed.Website}>Website</a>);
        //delete processed.Website;
      }
      if(processed['Gift cards']){
        processed._actions.push(<a className="box-links" key={'giftcards'+i} href={processed['Gift cards']}>Gift Cards</a>);
        //delete processed['Gift cards']
      }
      if(processed['Merch/Online Store']){
        processed._actions.push(<a className="box-links" key={'store'+i} href={processed['Merch/Online Store']}>Store</a>);
        //delete processed['Merch/Online Store']
      }
      return processed;
    })

    return (
    <div>
      <div className="hero">
        <span className="heroText">
          Supporting Black Business
        </span>
      </div>
      <div className="overall-container">
        <div className="box-container">
        {list.map((row, i) => (
          <div className="box">
            <h3 className="box-title">{row.Restaurant}</h3>
            <p className="box-content">
             {Object.keys(row).filter(key => {
              return key.substr(0,1) !== '_' && (row[key] || '').trim() && key != 'Restaurant' && key != 'Website' && key != 'Gift cards' && key != 'Merch/Online Store';
             }).map(key => (
                <React.Fragment>
                  { key === 'IG' ? (
                    <span key={key+i}><b>{key}</b>: <a href={'https://instagram.com/'+row[key].slice(1)}>{row[key]}</a><br /></span>
                  ) : key === 'Phone number' ? (
                    <span key={key+i}><b>{key}</b>: <a href={'tel:'+row[key]}>{row[key]}</a><br /></span>
                  ) : (
                    <span key={key+i}><b>{key}</b>: {row[key]}<br /></span>
                  )}
                </React.Fragment>
             ))}
            </p>
            <div className="box-actions">{row._actions.map(action => action)}</div>
          </div>
        ))}
        </div>
      </div>
    </div>
    );
}

export async function getStaticProps(context) {


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
  return {
    props: {list: rows}
  }
}

