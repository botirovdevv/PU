import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Photos = () => {
    const [photos, setPhotos] = useState([])
    const [error, setError] = useState('')
    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(
                    `https://api.pexels.com/v1/search?query=mountains&per_page=20`,
                    {
                        headers: {
                            Authorization: 'Pa7P3iRvwAQlKjpRcHW5nHjA1slwGMedmeWlIcyynbCla0DpTIQafRl7'
                        }
                    }
                );

                setPhotos(response.data.photos)

            } catch (error) {
                console.error(error)
            }
        };

        fetchResults();
    }, []);
    return (
        <section className='photos'>
            <div className="container">
                <div className="photos-images">
                    {error && <p>{error}</p>}
                    {
                        photos.map(photo => (
                            <div key={photo.id}>
                                <img src={photo.src.medium} className='photos-image' alt={photo.alt} />
                            </div>
                        ))
                    }

                </div>

            </div>
        </section>
    )
}

export default Photos