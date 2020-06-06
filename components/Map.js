import React, { useEffect, useState, useRef } from 'react'

var lastInfoWindow;

function num(num) {
  return (((num || '') + '').replace(/[^0-9\.\-]/gi, '') || 0) * 1;
}

export default function Map({ list, options, onMount, className, onMountProps }) {
  const ref = useRef()
  const [map, setMap] = useState()

  useEffect(() => {
    const onLoad = () => {
      const map = new window.google.maps.Map(ref.current, options);
      const bounds = new google.maps.LatLngBounds();
      setMap(map);
      console.log('now render list', list)

      const show_content_cols = [
        "Neighborhood",
        "Cuisine",
        "Service",
        "Hours",
        "IG",
        "Phone number",
        "Address",
      ];

      list.forEach(row => {
        if (row.Geocoordinates) {
          var spl = row.Geocoordinates.split(',')
          row._geocoords = {
            lat: num(spl[0]),
            lng: num(spl[1])
          }

          var infoWindowMarkup = `
          <table cellpadding="4" cellspacing="0" border="0">
          <tr>
            <td colspan="2" style="font-size:18px"><b>${row.Restaurant}</b></td>
          </tr>
          ${show_content_cols.filter(key => row[key]).map(key => {
            return `<tr><td style="text-align:right"><b>${key}</b></td><td>${row[key]}</td></tr>`;
          }).join('')}
          `;
          var infoWindow = new google.maps.InfoWindow({
            content: infoWindowMarkup
          });

          var marker = new google.maps.Marker({
            map: map,
            position: row._geocoords,
            title: row.Restaurant
          });
          console.log('marker', marker)
          google.maps.event.addListener(marker, 'click', function() {
            if (lastInfoWindow) {
              lastInfoWindow.close();
            }
            infoWindow.open(map, marker);
            lastInfoWindow = infoWindow;
          });
          bounds.extend(row._geocoords)
          console.log('coords', row._geocoords)
        }
      })
    }
    if (!window.google) {
      const script = document.createElement(`script`)
      script.src =
        `https://maps.googleapis.com/maps/api/js?key=` +
        'AIzaSyBhSDubH6DP0BV3MOyV8hTWmaifQxA1Jn8'
      document.head.append(script)
      script.addEventListener(`load`, onLoad)
      return () => script.removeEventListener(`load`, onLoad)
    } else onLoad()
  }, [options])

  if (map && typeof onMount === `function`) onMount(map, onMountProps)

  return (
    <div
      style={{ height: `60vh`, margin: `1em 0`, borderRadius: `0.5em` }}
      {...{ ref, className }}
    />
  )
}

Map.defaultProps = {
  options: {
    center: { lat: 33.8180053, lng: -117.9875479 },
    //disableDefaultUI: true,
    zoom: 11,
  },
}

/*
      var infoWindowMarkup = '<table style="color:#000; border:0;" cellspacing=0 cellpadding=2><tr><td colspan=2 align=left><a href="'+(location.url_org || location.url)+'"><b>' + location.title + '</b></a></td><tr><td valign=top align=right><b>Address:</b></td><td>' + location.address + '</td></tr>';
      extraDisplay.forEach(function(item) {
        if (location[item]) {
          infoWindowMarkup += '<tr><td valign=top align=right><b>' + (item.charAt(0).toUpperCase() + item.slice(1)) + ':</b></td><td valign=top align=left>' + location[item] + '</td></tr>';
        }
      });
      infoWindowMarkup += '</table>';
    
      if (location.link) {
        infoWindowMarkup = '<a href="' + location.link + '" target="_blank" style="color:inherit !important; text-decoration:none">' + infoWindowMarkup + '</a>';
      }
    
      var infoWindow = new google.maps.InfoWindow({
        content: infoWindowMarkup
      });
    
      var marker = new google.maps.Marker({
        map: map,
        position: location.geocode,
        title: location.title
      });
      markerRef[location.title] = marker;
      google.maps.event.addListener(marker, 'click', function() {
        if (lastInfoWindow) {
          lastInfoWindow.close();
        }
        infoWindow.open(map, marker);
        lastInfoWindow = infoWindow;
      });

*/