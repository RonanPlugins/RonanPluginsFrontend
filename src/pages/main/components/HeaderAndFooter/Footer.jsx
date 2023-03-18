import React from 'react';
import Messages from '../../../../libs/Messages';
import "./HeaderAndFooter.css"

const Footer = () => {
 return (
  <div className='MainFooter'>
         <div className='largefootertext'>
             <h1>{Messages.BrandName}</h1>
         </div>
         <div className='footerlinks'>
             {Messages.FooterLinks.map((link) => {
                 return (<a className='footerlink' href={link.URL}>{link.Text}</a>)
             })}
        </div>
  </div>
 );
};

export default Footer;
