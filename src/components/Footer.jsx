import React from 'react';

const Footer = () => {
    return (
        <footer className='main-footer'>
            <div className='footer-left-col'>
                <span>Телефон техподдержки: </span>
                <a href="tel:008-800-555-3535">8 800 555 35 35</a>
            </div>
            <div className = 'footer-right-col'>
                <span className = 'first-span'>Сделано в </span>
                <span>Yakovlev.Studio </span>
            </div>
        </footer>
    )
};

export default Footer;
