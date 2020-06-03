import { useState, useEffect } from 'react';
import Link from 'next/link'
import Head from 'next/head';
import Router from 'next/router';
import getListings from '../utils/getListings';

export default (props) => {
  console.log('props', props)
    const [neighborhood, setNeighborhood] = useState('');
    const [search, setSearch] = useState('');
    let intervalTimer;

    let neighborhoods = new Set();
    const list = props.list.map((row, i) => {
      if (row.Neighborhood) {
        neighborhoods.add(row.Neighborhood.trim());
      }
      return row;
    })
    neighborhoods = Array.from(neighborhoods);

    return (
    <div>
      <Head>
          <title>Spicy Green Book</title>
          <meta name="description" content="Support local black owned businesses with our free directory" />
      </Head>
      <div className="hero">
        <div className="hero-content">
          <div class="heroText">Spicy Green Book</div>
          <form method="GET" action="/search">
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
            <input type="search" size="14" name="query" placeholder="Search" onChange={(e) => {
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
    </div>
  );
}

export async function getStaticProps(context) {
  let rows = await getListings();
  rows = rows.map(row => {
    return {Neighborhood: row.Neighborhood || ''}
  });
  return {
    props: {list: rows }
  }
}

