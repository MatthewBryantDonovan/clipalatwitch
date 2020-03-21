import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import Nextarrow from './Nextarrow'
import Prevarrow from './Prevarrow'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ClipSlick(props) {

  let [width, setWidth] = useState(window.innerWidth);
  let [clipWidth, setClipWidth] = useState(245 + (Math.floor((window.innerWidth * 0.8) / 425)) * 40);
  let [clipHeight, setClipHeight] = useState((245 + (Math.floor((window.innerWidth * 0.8) / 425)) * 40) * .66);
  const [slides, setSlides] = useState((Math.floor((window.innerWidth * 0.8) / 465)) || 1);

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect(() => {
    const resizeListener = () => {
      // change width from the state object
      setWidth(window.innerWidth);
      setClipWidth(245 + (Math.floor((window.innerWidth * 0.8) / 425)) * 40)
      setClipHeight((245 + (Math.floor((window.innerWidth * 0.8) / 425)) * 40) * .66)
      setSlides((Math.floor((window.innerWidth * 0.8) / 465)) || 1);




    };
    // set resize listener
    window.addEventListener('resize', resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    }
  }, [])

  const settings = {
    speed: 200,
    slidesToShow: (slides > 3) ? 3 : slides,
    slidesToScroll: (slides > 3) ? 3 : slides,
    accessibility: true,
    lazyLoad: true,
    swipeToSlide: true,
    nextArrow: <Nextarrow />,
    prevArrow: <Prevarrow />
  };

  return (
    <div className="center" >
      <Slider {...settings} style={(window.innerWidth < 900) ? { width: ((width * 0.79) + "px") } : { width: "100%" }}>
        {(props.clipData) ? props.clipData.clips.map((clip, index) => (
          <div id={clip.id} key={index}>
            <iframe src={clip.embed_url + "&autoplay=false"} height={clipHeight} width={clipWidth} allowFullScreen></iframe>
          </div>
        )) : <div></div>}
      </Slider>
    </div>
  );

}

export default ClipSlick