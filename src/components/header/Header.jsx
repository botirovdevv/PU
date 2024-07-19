import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import bg from '../../assets/images/bg.jpg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [images, setImages] = useState([]);
    const [query, setQuery] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

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
        navigate(`/search-results?query=${query}`);
    };

    return (
        <div className='search'>
            <div className="search-bg">
                <img className='search-img' src={bg} alt="" />
            </div>
            <div className="search-items">
                <h1 className='search-title'> You can search High-quality photos and videos</h1>
                <form onSubmit={handleSearch} className='search-form'>
                    <TextField
                        label="Search for images..."
                        value={query}
                        id="filled-password-input"
                        autoComplete="current-password"
                        variant="filled"
                        onChange={(e) => setQuery(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton type="submit">
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            backgroundColor: '#ffffff', 
                            borderRadius: '4px', 
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'rgba(0, 0, 0, 0.23)', 
                                },
                                '&:hover fieldset': {
                                    borderColor: '#3f41a6',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#3f41a6',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#3f41a6', 
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#3f41a6', 
                            }
                        }}
                        fullWidth
                    />
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

        </div>
    );
};

export default Header;
