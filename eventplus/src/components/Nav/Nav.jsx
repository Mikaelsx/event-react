import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'
import LogoMobile from '../../assets/images/logo-white.svg'
import LogoDesktop from '../../assets/images/logo-pink.svg'



const Nav = ( {exibeNavbar, setExibeNavbar } ) => {
    return (
        <nav className={`navbar ${exibeNavbar ? "exibeNavbar" : ""}`}>

            <span
             className='navbar__close' 
             onClick={ () => {setExibeNavbar(false)} }
             >
                x
            </span>

            <Link to="/">
                <img 
                className='eventlogo__logo-image' 
                src={window.innerWidth >= 992 ? LogoDesktop : LogoMobile} 
                alt="Event Plus logo" />
            </Link>

            <div className='navbar__items-box'>
                <Link to="/" className='navbar__item'>Home</Link>
                <Link to="/TipoDeEventos" className='navbar__item'>Tipo Eventos</Link>
                <Link to="/Eventos" className='navbar__item'>Eventos</Link>
            </div>
        </nav>
    );
};

export default Nav;