import React, { useEffect, useState }  from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function ClipSlick(props) {
  const isClient = typeof window === 'object';
  
    function getSize() {
      return isClient ? window.innerWidth : undefined;
    }
  
    const [windowSize, setWindowSize] = useState(getSize);
    const [slides, setSlides] = useState(3);

  useEffect(() => {
    getSize()
    if(windowSize < 500) {
      setSlides(1)
    }
  }, [windowSize])
    const settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: slides,
        slidesToScroll: slides,
        accessibility: true,
        lazyLoad: true,
        swipeToSlide: true,
      };

      return (
        <div className="center">
          <Slider {...settings}>
          { (props.clipData) ? props.clipData.clips.map((clip, index) => (
                <div id={clip.id}  key={index}>
                    <iframe src={clip.embed_url + "&autoplay=false"} height="200" width="300" allowFullScreen></iframe>
                </div>
            )) : <div></div>}
          </Slider>
        </div>
      );

}

export default ClipSlick