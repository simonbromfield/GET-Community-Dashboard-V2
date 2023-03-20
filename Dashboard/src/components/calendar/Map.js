import React, { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";

const OLMap = ({ lat, lng }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([lng, lat]),
        zoom: 14,
      }),
    });

    return () => {
      if (map) {
        map.setTarget(null);
      }
    };
  }, [lat, lng]);

  return <div ref={mapRef} style={{ width: "100%", height: "200px" }}></div>;
};

export default OLMap;
