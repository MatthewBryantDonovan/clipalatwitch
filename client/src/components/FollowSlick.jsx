import React from 'react';
import Slider from "react-slick";
import Nextarrow from '../components/Nextarrow';
import Prevarrow from '../components/Prevarrow';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function FollowSlick(props) {

  // Slick settings
  const settings = {
    speed: 200,
    slidesToShow: (props.data.length >= 9 ) ? 9 : props.data.length,
    slidesToScroll: (props.data.length >= 9 ) ? 9 : props.data.length,
    accessibility: true,
    swipeToSlide: true,
    nextArrow: <Nextarrow />,
    prevArrow: <Prevarrow />,
    responsive: [
      {
        breakpoint: 1675,
        settings: {
          slidesToShow: (props.data.length >= 8 ) ? 8 : props.data.length,
          slidesToScroll: (props.data.length >= 8 ) ? 8 : props.data.length
        }
      },
      {
        breakpoint: 1475,
        settings: {
          slidesToShow: (props.data.length >= 7 ) ? 7 : props.data.length,
          slidesToScroll: (props.data.length >= 7 ) ? 7 : props.data.length
        }
      },
      {
        breakpoint: 1275,
        settings: {
          slidesToShow: (props.data.length >= 6 ) ? 6 : props.data.length,
          slidesToScroll: (props.data.length >= 6 ) ? 6 : props.data.length
        }
      },
      {
        breakpoint: 1075,
        settings: {
          slidesToShow: (props.data.length >= 5 ) ? 5 : props.data.length,
          slidesToScroll: (props.data.length >= 5 ) ? 5 : props.data.length
        }
      },
      {
        breakpoint: 875,
        settings: {
          slidesToShow: (props.data.length >= 4 ) ? 4 : props.data.length,
          slidesToScroll: (props.data.length >= 4 ) ? 4 : props.data.length
        }
      },
      {
        breakpoint: 675,
        settings: {
          slidesToShow: (props.data.length >= 3 ) ? 3 : props.data.length,
          slidesToScroll: (props.data.length >= 3 ) ? 3 : props.data.length
        }
      },
      {
        breakpoint: 475,
        settings: {
          slidesToShow: (props.data.length >= 2 ) ? 2 : props.data.length,
          slidesToScroll: (props.data.length >= 2 ) ? 2 : props.data.length
        }
      }
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