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
    slidesToShow: 9,
    slidesToScroll: 9,
    accessibility: true,
    swipeToSlide: true,
    nextArrow: <Nextarrow />,
    prevArrow: <Prevarrow />,
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 8,
        }
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 7,
        }
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
    ]
  };

  return (
  <div className="center">
    {/* <Slider {...settings} style={(window.innerWidth < 900) ? { width: ((width * 0.79) + "px") } : { width: "100%" }} > */}
    <Slider {...settings} style={{ width: "100%" }} >
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