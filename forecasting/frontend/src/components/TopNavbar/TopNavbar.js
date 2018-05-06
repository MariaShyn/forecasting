import React from 'react';
import { Link } from 'react-router-dom';

import './TopNavbar.css';

export default function TopNavbar (props) {
    return (<div className="top-navbar">
        <Link to="/" className="top-navbar__link" >Maria Shyn: diploma</Link>
    </div>);
}