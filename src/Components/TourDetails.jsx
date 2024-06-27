import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTours } from '../Services/api';

const TourDetails = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const data = await fetchTours();
        const tour = data.find((tour) => tour.ID === parseInt(id));
        setTour(tour);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTourData();
  }, [id]);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">Error: {error}</p>;

  if (!tour) return <p className="text-center mt-4">Tour not found</p>;

  return (
    <div className="w-full px-20 mx-auto mt-8 p-4">
      <div className="  overflow-hidden ">
          <h2 className="text-3xl font-bold mb-2">{tour.title}</h2>
        <img src={tour.featured_image} alt={tour.title} className="w-full h-64 object-cover" />
        <div className="p-4">
          <p className="text-gray-700 mb-4">{tour.content.Overview}</p>
          <p className="text-lg font-semibold mb-2">Price: {tour.meta._price}</p>
          <p className="text-gray-700 mb-2">Date: {tour.date}</p>
          <p className="text-gray-700">Location: {tour.location}</p>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
