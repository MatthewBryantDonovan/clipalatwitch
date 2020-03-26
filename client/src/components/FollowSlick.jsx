import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import Nextarrow from '../components/Nextarrow';
import Prevarrow from '../components/Prevarrow';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function FollowSlick(props) {

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
        breakpoint: 1675,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 8
        }
      },
      {
        breakpoint: 1475,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 7
        }
      },
      {
        breakpoint: 1275,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6
        }
      },
      {
        breakpoint: 1075,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5
        }
      },
      {
        breakpoint: 875,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 675,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 475,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
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