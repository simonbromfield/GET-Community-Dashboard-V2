import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import FilteredEventsMessage from "./FilteredEventsMessage";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Map = ({ events }) => {
  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filteredEventsCount, setFilteredEventsCount] = useState(0);

  const getGeoJSON = () => {
    const filteredEvents = events
      .filter(event => (parseFloat(event.longitude) !== 0 || parseFloat(event.latitude) !== 0) && event.integrator.id !== "0");
    console.log('Filtered events:', filteredEvents);
  
    setFilteredEventsCount(events.length - filteredEvents.length);
  
    const features = filteredEvents.map(event => {
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [parseFloat(event.longitude), parseFloat(event.latitude)],
        },
        properties: {
          eventId: event.id,
        },
      };
    });
    console.log('Features:', features);
  
    return {
      type: "FeatureCollection",
      features: features,
    };
  };
      
  useEffect(() => {
    if (!map) {
      const newMap = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/light-v11",
        center: [4.897070, 52.377956],
        zoom: 3,
        attributionControl: false,
      });
  
      newMap.on("load", () => {
        setMap(newMap);
      });
  
    } else {
      setLoading(true);
  
      console.log('Adding source and layers...');
  
      if (map.getSource("events")) {
        map.getSource("events").setData(getGeoJSON());
      } else {
        map.addSource("events", {
          type: "geojson",
          data: getGeoJSON(),
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50,
        });
      }
  
      if (!map.getLayer("clusters")) {
        map.addLayer({
          id: "clusters",
          type: "circle",
          source: "events",
          filter: ["has", "point_count"],
          paint: {
            "circle-color": [
              "step",
              ["get", "point_count"],
              "#51bbd6",
              100,
              "#f1f075",
              750,
              "#f28cb1",
            ],
            "circle-radius": [
              "step",
              ["get", "point_count"],
              20,
              100,
              30,
              750,
              40,
            ],
          },
        });
      }
      
      if (!map.getLayer("cluster-count")) {
        map.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "events",
          filter: ["has", "point_count"],
          layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12,
          },
        });
      }      
      
      setLoading(false);
    }
  }, [map, events]);
  
           

  return (
    <div>
      <div>
        <FilteredEventsMessage count={filteredEventsCount} />
      </div>
      <div>
        {!map && <div>Generating Map...</div>}
        <div id="map" style={{ height: "500px" }}></div>
      </div>
    </div>
  );
};

export default Map;