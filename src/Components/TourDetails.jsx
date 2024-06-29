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
        const foundTour = data.find((tour) => tour.ID === parseInt(id));
        setTour(foundTour);
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

  // Splitting _product_image_gallery into an array of image IDs
  const galleryImageIds = tour.meta._product_image_gallery.split(',');

  return (
    <div className="w-full px-20 mx-auto mt-8 p-4">
      <div className="overflow-hidden">
        <h2 className="text-3xl font-bold mb-2">{tour.title}</h2>
        <img src={tour.featured_image} alt={tour.title} className="w-full h-64 object-cover mb-4" />
        
        {/* Render the gallery images */}
        <div className="flex flex-wrap gap-4">
          {galleryImageIds.map((imageId) => (
            <img
              key={imageId}
              src={`https://dev.triumphdigital.co.th/btt/wp-content/uploads/${imageId}.jpg`}
              alt={`Gallery Image ${imageId}`}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-64 object-cover"
              onError={(e) => {
                e.target.onerror = null; // Reset to avoid infinite loop
                e.target.src = 'https://example.com/placeholder.jpg'; // Placeholder image or default image URL
              }}
            />
          ))}
        </div>

        <div className="p-4">
          <div dangerouslySetInnerHTML={{ __html: tour.content }} className="text-gray-700 mb-4"></div>
          <p className="text-lg font-semibold mb-2">Price: {tour.meta._price}</p>
          {tour.meta.ovabrw_number_days && (
            <p className="text-gray-700 mb-2">Duration: {tour.meta.ovabrw_number_days} day(s)</p>
          )}
          {tour.meta.ovabrw_map_name && (
            <p className="text-gray-700 mb-2">Location: {tour.meta.ovabrw_map_name}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
