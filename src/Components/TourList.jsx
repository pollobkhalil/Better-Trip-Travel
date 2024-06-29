import React, { useState, useEffect } from 'react';
import { FaBahtSign } from 'react-icons/fa6';
import { fetchTours } from '../Services/api';
import { truncateText } from '../Utils/truncateText';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const TourList = () => {
  const [tours, setTours] = useState([]);
  const [visibleTours, setVisibleTours] = useState(6); // Number of tours initially visible

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const data = await fetchTours();
        setTours(data);
      } catch (error) {
        console.error('Error fetching tours:', error);
        // Handle error if needed
      }
    };

    fetchTourData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      // Load more items when the user scrolls to the bottom of the page
      loadMore();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleTours]);

  const loadMore = () => {
    // Increase the number of visible tours by 6
    setVisibleTours((prevVisibleTours) => prevVisibleTours + 6);
  };

  return (
    <div className="max-w-4xl mx-auto mt-20">
      <h2 className="text-3xl font-bold text-center mb-6">Tour List</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {tours.slice(0, visibleTours).map((tour) => (
          <motion.div
            key={tour.ID}
            className="border rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
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
                  className="bg-[#ff914d] rounded-lg py-1 px-3 text-white font-semibold block border border-[#ff914d] hover:text-black  hover:bg-white"
                >
                  Explore
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {visibleTours < tours.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className=" hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default TourList;
