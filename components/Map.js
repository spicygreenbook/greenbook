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


      list.forEach(row => {
        if (row.geocoordinates) {

          var infoWindowMarkup = `
          <a href="/biz/${row._slug}" style="color:#000;text-decoration:none">
          <img src="${row.primary_image.url}" width="${row.primary_image.width}" height="${row.primary_image.height}" style="max-width:100%;height:auto" />
          <div style="font-size:18px; margin:8px 0"><b>${row.name}</b></div>
          ${row.cuisines.join(', ')}
          </a>
          `;
          var infoWindow = new google.maps.InfoWindow({
            content: infoWindowMarkup
          });

          var marker = new google.maps.Marker({
            map: map,
            position: row.geocoordinates,
            title: row.name
          });
          console.log('marker', marker)
          google.maps.event.addListener(marker, 'click', function() {
            if (lastInfoWindow) {
              lastInfoWindow.close();
            }
            infoWindow.open(map, marker);
            lastInfoWindow = infoWindow;
          });
          bounds.extend(row.geocoordinates)
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
      style={{ height: `50vh`, margin: `20px 0`, borderRadius: `0.5em` }}
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