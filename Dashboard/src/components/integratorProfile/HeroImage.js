
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HeroImage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.post('https://api.example.com/graphql', {
          query: `
            {
              integrator(id: "") {
                events(first: 4, orderBy: soldCount, orderDirection: desc) {
                  latitude
                  longitude
                }
              }
            }
          `,
        });
        const events = response.data.data.integrator.events;
        const imageRequests = events.map((event) =>
          axios.get(`https://source.unsplash.com/${event.latitude}x${event.longitude}/?city`)
        );
        const images = await Promise.all(imageRequests);
        setImages(images.map((image) => ({ src: image.request.responseURL, alt: 'Event' })));
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gridGap: '10px',
      }}
    >
      {images.map((image) => (
        <img
          key={image.src}
          src={image.src}
          alt={image.alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ))}
    </div>
  );
};

export default HeroImage;
