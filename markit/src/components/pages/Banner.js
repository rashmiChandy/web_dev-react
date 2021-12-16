import React from 'react';
import '../../css/Banner.css';
// Video taken from https://www.pexels.com/video/a-person-working-on-a-computer-in-an-office-3209552/
import bannerVideo from '../../videos/banner.mp4'

export default function Banner() {
  return (
      
    <div className='bannerContainer' >
        <video controls autoPlay loop muted>
            <source src={bannerVideo} type="video/mp4"></source>
        </video>
        <div>
          <h1>A WHOLE WORLD OF OPPORTUNITES AWAITS YOU
            
          </h1>
          <p>What are you waiting for?</p>

        </div>
       
        
      
    </div>
  );
}

