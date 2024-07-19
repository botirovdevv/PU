import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
    const [results, setResults] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const searchType = new URLSearchParams(location.search).get('type');

    useEffect(() => {
        const fetchResults = async () => {
            if (query && searchType) {
                const endpoint = searchType === 'video' ? 'videos/search' : 'search';
                try {
                    const response = await axios.get(
                        `https://api.pexels.com/v1/${endpoint}?query=${query}&per_page=10`,
                        {
                            headers: {
                                Authorization: 'Pa7P3iRvwAQlKjpRcHW5nHjA1slwGMedmeWlIcyynbCla0DpTIQafRl7' 
                            }
                        }
                    );

                    searchType === 'video' ? setResults(response.data.videos) : setResults(response.data.photos);

                } catch (error) {
                    console.error('Error fetching results:', error);
                }
            }
        };

        fetchResults();
    }, [query, searchType]);

    return (
        <div>
            <h1>Search Results</h1>
            <div className="grid-container">
                {results.map((result) => (
                    <div key={result.id} className="grid-item">
                        {searchType === 'video' ? (
                            <video controls width={300}>
                                <source src={result.video_files[0].link} type="video/mp4" />
                            </video>
                        ) : (
                            <img src={result.src.large} alt={result.photographer} />
                        )}
                        <p>Photographer: {result.photographer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
