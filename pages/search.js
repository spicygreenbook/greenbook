import { useState, useEffect } from 'react';
import Link from 'next/link'
import Head from 'next/head';
import getListings from '../utils/getListings';

const fuzzySearch = (string, srch) => {
    return (string || '').match(RegExp(srch.trim().split(/\s+/).map(function(c) {
        return c.split('').join('\\W*');
    }).join('|'), 'gi'));
};

export default (props) => {
    let query = {};
    if (typeof window !== 'undefined') {
      let params = (window.location.search || '').substr(1).split('&').forEach(pair => {
        var spl = pair.split('=');
        query[decodeURIComponent(spl[0])] = decodeURIComponent(spl[1]);
      })
    }
    console.log('query', query)
    console.log('list', props)
    const [neighborhood, setNeighborhood] = useState(query.neighborhood || '');
    const [search, setSearch] = useState(query.query || '');
    let intervalTimer;

    useEffect(
      () => {
      },
      [search,neighborhood,query]
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
      if (!row.Restaurant) {
        go = false;
      }
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
      <form method="GET" action="/search">
        <select name="neighborhood" onChange={(e) => {
          let value = e.target.value;
          setNeighborhood(value);
          
        }}>
          <option value="">Select a neighorhood</option>
          <option value="">Browse all neighborhoods</option>
          {neighborhoods.map(option => {
            return <option key={option} value={option.toLowerCase()} checked={neighborhood===option.toLowerCase()}>{option}</option>
          })}
        </select>
        <input type="search" size="14" name="query" placeholder="Search" value={search} onChange={(e) => {
          let value = e.target.value;
          setSearch(value);
        }}/>
        <input type="submit" value="GO" />
      </form>
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
  let rows = await getListings();
  return {
    props: {list: rows }
  }
}

