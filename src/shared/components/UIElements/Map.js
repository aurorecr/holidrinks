import React, { useRef, useEffect } from 'react';
//useRef is a hook, useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component
// By using the Hook useEffect, you tell React that your component needs to do something after render. React will remember the function you passed (we’ll refer to it as our “effect”), and call it later after performing the DOM updates. In this effect, we set the document title, but we could also perform data fetching or call some other imperative API.
import './Map.css';

const Map = props => {
  const mapRef = useRef();
  //in this constant I point the div : <div ref ={mapRef}
  
  const { center, zoom } = props;
  //I destructure here the : center, zoom, wrote in const map

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
    // This is a constructor function  now  available on the global window object in the end because I added the info google map and keys in index.html
      center: center,
      zoom:  zoom
      //by using a prop I can control those tools from outside of the component
      //no need to write : props.center etc.. as it's destructured and stored in the previous constance {center,zoom}
    });
  
    new window.google.maps.Marker({ position:center, map: map });
    //here I render the market, it's the localisation on the map of the place matching with the address so the red drop icone,this will show the marker in the center of the map
  }, [center, zoom]);  

  return (
    // div that contain the google map in it
    <div
      ref={mapRef}
      //this is where the connection is establish 
      className={`map ${props.className}`}
      //here we can customize the map
      style={props.style}
      //can create the inline style of the map here if needed
    ></div>
  );
};

export default Map;
