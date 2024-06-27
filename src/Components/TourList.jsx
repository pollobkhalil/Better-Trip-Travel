import React, { useState, useEffect } from 'react';
import { FaBahtSign } from 'react-icons/fa6';
import { fetchTours } from '../Services/api';
import { truncateText } from '../Utils/truncateText';
import { Link } from 'react-router-dom';

const TourList = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleTours, setVisibleTours] = useState(6); // Number of tours initially visible

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const data = await fetchTours();
        setTours(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTourData();
  }, []);

  const loadMore = () => {
    // Increase the number of visible tours by 6
    setVisibleTours((prevVisibleTours) => prevVisibleTours + 6);
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-20">
      <h2 className="text-3xl font-bold text-center mb-6">Tour List</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {tours.slice(0, visibleTours).map((tour) => (
          <div key={tour.ID} className="border rounded-lg overflow-hidden shadow-lg">
            <img src={tour.featured_image} alt={tour.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{truncateText(tour.title, 20)}</h3>
              <div className="flex items-center justify-between py-5">
                <p className="text-gray-800 flex items-center font-bold">
                  <FaBahtSign />
                  {tour.meta._price}
                </p>
                <Link
                  to={`/tour/${tour.ID}`}
                  className="bg-[#ff914d] rounded-lg py-1 px-3 text-white font-semibold block"
                >
                  Explore
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {visibleTours < tours.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default TourList;
