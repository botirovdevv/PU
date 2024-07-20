import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Videos = () => {
    const [videos, setVideos] = useState([])
    const [error, setError] = useState('')
    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(
                    `https://api.pexels.com/v1/videos/search?query=mountains&per_page=20`,
                    {
                        headers: {
                            Authorization: 'Pa7P3iRvwAQlKjpRcHW5nHjA1slwGMedmeWlIcyynbCla0DpTIQafRl7'
                        }
                    }
                );

                setVideos(response.data.videos)

            } catch (error) {
                console.error(error)
            }
        };

        fetchResults();
    }, []);
    return (
        <section className="videos">
            <div className="container">
                <h1 className="videos-title">Mountain Videos</h1>
                <div className="videos-cards">
                    {
                        videos.map((result) => (
                            <video controls width={300}>
                                <source src={result.video_files[0].link} type="video/mp4" />
                            </video>
                        ))
                    }

                </div>
            </div>
        </section>
    )
}

export default Videos