import { useState, useEffect } from 'react';
import Link from 'next/link'
import Head from 'next/head';
import Router from 'next/router';

const fuzzySearch = (string, srch) => {
    return (string || '').match(RegExp(srch.trim().split(/\s+/).map(function(c) {
        return c.split('').join('\\W*');
    }).join('|'), 'gi'));
};

export default (props) => {

    const [neighborhood, setNeighborhood] = useState('');
    const [search, setSearch] = useState('');
    let intervalTimer;
    useEffect(
      () => {
        let url = '/';
        if (neighborhood || search) {
          url += '?';
        }
        if (neighborhood) {
          url += '&neighborhood=' + encodeURIComponent(neighborhood)
        }
        if (search) {
          url += '&search=' + encodeURIComponent(search)
        }
        Router.push(url)
      },
      [search,neighborhood]
    );

    let neighborhoods = new Set();
    const list = props.list.map((row, i) => {
      let processed = row;
      processed._actions = [];
      row._neighborhood = '';
      row._search = '';
      Object.keys(row).forEach(key => {
        if (row[key] && typeof row[key] === 'string'){
          row._search += row[key];
        }
      })
      if (processed.Neighborhood) {
        row._neighborhood = processed.Neighborhood.trim().toLowerCase();
        neighborhoods.add(processed.Neighborhood.trim());
      }
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
    neighborhoods = Array.from(neighborhoods);

    let filtered_list = list.filter(row => {
      let go = true;
      if (search && !fuzzySearch(row._search, search)) {
        go = false;
      }
      if (neighborhood && row._neighborhood !== neighborhood) {
        go = false;
      }
      return go;
    });

    return (
    <div>
      <Head>
          <title>Spicy Green Book</title>
          <meta name="description" content="Support local black owned businesses with our free directory" />
      </Head>
      <div className="hero">
        <div className="hero-content">
          <form method="GET" action="" onSubmit={(e) => {
            e.preventDefault();
            document.querySelector('.overall-container').scrollIntoView()
          }}>
            <select name="neighborhood" onChange={(e) => {
              let value = e.target.value;
              clearTimeout(intervalTimer);
              intervalTimer = setTimeout(() => {
                setNeighborhood(value);
              }, 100)
              
            }}>
              <option value="">Select a neighorhood</option>
              <option value="">Browse all neighborhoods</option>
              {neighborhoods.map(option => {
                return <option key={option} value={option.toLowerCase()}>{option}</option>
              })}
            </select>
            <input type="search" name="search" placeholder="Search" onChange={(e) => {
              let value = e.target.value;
              clearTimeout(intervalTimer);
              intervalTimer = setTimeout(() => {
                setSearch(value);
              }, 100);
            }}/>
            <input type="submit" value="GO" />
          </form>
        </div>
        
      </div>
      <div className="overall-container">
        <div className="box-container">
          {
            filtered_list && filtered_list.length ? (
              <React.Fragment>
              {filtered_list.map((row, i) => (
                <div className="box" key={"item"+i}>
                  <h3 className="box-title">{row.Restaurant}</h3>
                  <p className="box-content">
                   {Object.keys(row).filter(key => {
                    return key.substr(0,1) !== '_' && (row[key] || '').trim() && key != 'Restaurant' && key != 'Website' && key != 'Gift cards' && key != 'Merch/Online Store';
                   }).map(key => (
                      <React.Fragment key={key+i}>
                        { key === 'IG' ? (
                          <span><b>{key}</b>: <a href={'https://instagram.com/'+row[key].slice(1)}>{row[key]}</a><br /></span>
                        ) : key === 'Phone number' ? (
                          <span><b>{key}</b>: <a href={'tel:'+row[key]}>{row[key]}</a><br /></span>
                        ) : (
                          <span><b>{key}</b>: {row[key]}<br /></span>
                        )}
                      </React.Fragment>
                   ))}
                  </p>
                  <div className="box-actions">{row._actions.map(action => action)}</div>
                </div>
              ))}
              </React.Fragment>
            ) : (
              <span>Sorry, nothing matches your search</span>
            )
          }
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

