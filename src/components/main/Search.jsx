import React, { useEffect, useState } from 'react';
import axios from 'axios';
import bg from '../../assets/images/bg.jpg'

const Search = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      if (searchQuery) {
        try {
          const response = await axios.get(
            `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=10`,
            {
              headers: {
                Authorization: 'YOUR_API_KEY'
              }
            }
          );
          setImages(response.data.photos);
        } catch (error) {
          console.error('Error fetching images:', error);
        }
      }
    };

    fetchImages();
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(query);
  };

  return (
    <div className='search'>
      <div className="search-bg">
        <img className='search-img' src={bg} alt="" />
      </div>
      <h1>Pexels Image Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="grid-container">
        {images.map((image) => (
          <div key={image.id} className="grid-item">
            <img src={image.src.large} alt={image.photographer} />
            <p>Photographer: {image.photographer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
