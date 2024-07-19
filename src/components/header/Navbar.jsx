import React from 'react'
import { LinksData } from '../../data/LinksData'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="nav">
        <div className="container">
            <div className="nav-content">
                <div className="nav-logo">
                    <h1 className="nav-logo_title">
                        PU
                    </h1>
                </div>
                <ul className="nav-links">
                    {
                        LinksData.map((item) => (
                            <Link to={item.path} className='nav-link' key={item.id}>{item.title}</Link>
                        ))
                    }
                </ul>
                <Link className="nav-all_link">
                    All Photos
                </Link>
            </div>
        </div>
    </nav>
  )
}

export default Navbar