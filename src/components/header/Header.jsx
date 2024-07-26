import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
import bg from '../../assets/images/bg.jpg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [images, setImages] = useState([]);
    const [query, setQuery] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('image');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchImages = async () => {
            if (searchQuery) {
                const endpoint = searchType === 'video' ? 'videos' : 'search';
                try {
                    const response = await axios.get(
                        `https://api.pexels.com/v1/${endpoint}?query=${searchQuery}&per_page=10`,
                        {
                            headers: {
                                Authorization: 'Pa7P3iRvwAQlKjpRcHW5nHjA1slwGMedmeWlIcyynbCla0DpTIQafRl7'
                            }
                        }
                    );
                    setImages(response.data.photos || response.data.videos);
                } catch (error) {
                    console.error('Error fetching images:', error);
                }
            }
        };

        fetchImages();
    }, [searchQuery, searchType]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery(query);
        navigate(`/search-results?query=${query}&type=${searchType}`);
        // query === '' ? setError('error') : query
    };

    return (
        <div className='search'>
            <div className="search-bg">
                <img className='search-img' src={bg} alt="" />
            </div>
            <div className="search-items">
                <h1 className='search-title'> You can search High-quality photos and videos</h1>
                <form onSubmit={handleSearch} className='search-form'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <Select
                                labelId="search-type-label"
                                id="search-type"
                                value={searchType}
                                onChange={(e) => setSearchType(e.target.value)}
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
                            >
                                <MenuItem value="image">Photos</MenuItem>
                                <MenuItem value="video">Videos</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Search"
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
                    </div>
                </form>
                <div className="grid-container">
                    {images.map((image) => (
                        <div key={image.id} className="grid-item">
                            {searchType === 'video' ? (
                                <video controls>
                                    <source src={image.video_files[0].link} type="video/mp4" />
                                </video>
                            ) : (
                                <img src={image.src.large} alt={image.photographer} />
                            )}
                            <p>Photographer: {image.photographer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Header;
