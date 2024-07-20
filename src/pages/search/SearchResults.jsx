import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
    const [results, setResults] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const searchType = new URLSearchParams(location.search).get('type');
    const [error, setError] = useState('Search Results')

    useEffect(() => {
        const fetchResults = async () => {
            if (query && searchType) {
                const endpoint = searchType === 'video' ? 'videos/search' : 'search';
                try {
                    const response = await axios.get(
                        `https://api.pexels.com/v1/${endpoint}?query=${query}&per_page=100`,
                        {
                            headers: {
                                Authorization: 'Pa7P3iRvwAQlKjpRcHW5nHjA1slwGMedmeWlIcyynbCla0DpTIQafRl7'
                            }
                        }
                    );

                    searchType === 'video' ? setResults(response.data.videos) : setResults(response.data.photos);

                } catch (error) {
                    setError("Ma'lumotlar topilmadi")
                }
            }
        };

        fetchResults();
    }, [query, searchType]);

    return (
        <section className='result'>
            <div className="container">
                <h1>{error}</h1>
                <div className="result-content">
                    {results.map((result) => (
                        <div key={result.id} className="result-item">
                            {searchType === 'video' ? (
                                <video controls width={300}>
                                    <source src={result.video_files[0].link} type="video/mp4" />
                                </video>
                            ) : (
                                <div className="result-image">
                                    <img src={result.src.large} className='result-img' alt={result.photographer} />
                                </div>
                            )}
                            {/* <p>Photographer: {result.photographer}</p> */}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default SearchResults;
