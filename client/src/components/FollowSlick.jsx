import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import Nextarrow from '../components/Nextarrow';
import Prevarrow from '../components/Prevarrow';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function FollowSlick(props) {

  // Hooks
  let [width, setWidth] = useState(window.innerWidth);
  const [slides, setSlides] = useState((Math.floor((((window.innerWidth < 900 ? window.innerWidth * 0.8 : window.innerWidth)) / (window.innerWidth < 900 ? 125 : 200))) || 1));

  // Use Effect to grab screen size
  useEffect(() => {
    const resizeListener = () => {
      // change width from the state object
      setWidth(window.innerWidth);
      setSlides((Math.floor((((window.innerWidth < 900 ? window.innerWidth * 0.8 : window.innerWidth)) / (window.innerWidth < 900 ? 125 : 200))) || 1));
    };

    // set resize listener
    window.addEventListener('resize', resizeListener);

    // clean up function
    return () => {

      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    }
  }, []);

  // Slick settings
  const settings = {
    speed: 200,
    slidesToShow: (props.data.length < slides) ? props.data.length : ((slides > 11 )? 10 : slides ),
    slidesToScroll: (props.data.length < slides) ? props.data.length : ((slides > 11 )? 10 : slides ),
    accessibility: true,
    swipeToSlide: true,
    nextArrow: <Nextarrow />,
    prevArrow: <Prevarrow />
  };

  return (
  <div className="center">
    <Slider {...settings} style={(window.innerWidth < 900) ? { width: ((width * 0.79) + "px") } : { width: "100%" }} >
      {props.data.map((item, index) => (
        <div id={item.id} key={index}>
          <div >
            <button className="btn-img" onClick={() => props.view(props.type.toString(), item.id)}>
              <img height="125" width="100" src={item.image}  />
            </button>
          </div>
          <div><button onClick={() => props.remove(props.type.toString(), item.id)} className="dislike">&#10007;</button></div>
        </div>
      ))}
    </Slider>
  </div>
  );
}

export default FollowSlick;