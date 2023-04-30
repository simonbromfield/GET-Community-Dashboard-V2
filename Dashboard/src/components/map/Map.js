import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Popup } from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2ltb25icm9tZmllbGQiLCJhIjoiY2t4ZjhpbDlvMGQ1azJ2bnh2dTJzMmVkZiJ9.CtqoMAneppRmRhnj8YDR1A';

const Map = ({ events }) => {
  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filteredEventsCount, setFilteredEventsCount] = useState(0);

  const getGeoJSON = () => {
    const filteredEvents = events
      .filter(event => (parseFloat(event.longitude) !== 0 || parseFloat(event.latitude) !== 0) && event.integrator.id !== "0");

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
        center: [-103.5917, 40.6699],
        zoom: 3,
        attributionControl: false,
      });
      newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');

      newMap.on("load", () => {
        setMap(newMap);
      });

      // Event listeners for click and mouseenter/mouseleave events
    newMap.on('click', 'clusters', (e) => {
      // ... your existing code for handling cluster click
    });

    newMap.on('click', 'unclustered-point', (e) => {
      // ... your existing code for handling unclustered-point click
    });

    newMap.on('mouseenter', 'clusters', () => {
      newMap.getCanvas().style.cursor = 'pointer';
    });

    newMap.on('mouseleave', 'clusters', () => {
      newMap.getCanvas().style.cursor = '';
    });

    newMap.on('mouseenter', 'unclustered-point', () => {
      newMap.getCanvas().style.cursor = 'pointer';
    });

    newMap.on('mouseleave', 'unclustered-point', () => {
      newMap.getCanvas().style.cursor = '';
    });

    } else {
      setLoading(true);

      map.addSource("events", {
        type: "geojson",
        data: getGeoJSON(),
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

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

      setLoading(false);
    }
  }, [map, events]);

  return (
    <div>
      <div>
        <p>
          <strong>PLEASE NOTE:</strong> {filteredEventsCount} events have been filtered from the events list as they have no geo data
          provided by the protocol integrator, and/or they were created by the &quot;Demo v1&quot; integrator.
        </p>
      </div>
      <div>
        {!map && <div>Generating Map...</div>}
        <div id="map" style={{ height: "500px" }}></div>
      </div>
    </div>
  );
};

export default Map;