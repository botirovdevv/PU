import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
    const [images, setImages] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        const fetchImages = async () => {
            if (query) {
                try {
                    const response = await axios.get(
                        `https://api.pexels.com/v1/search?query=${query}&per_page=10`,
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
    }, [query]);

    return (
        <div>
            <h1>Search Results</h1>
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

export default SearchResults;
