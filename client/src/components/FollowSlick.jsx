import React, { useEffect, useState }  from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function FollowSlick(props) {

    const settings = {
        dots: true,
        speed: 200,
        slidesToShow: (props.data.length < 3 ) ? props.data.length : 3,
        slidesToScroll: (props.data.length < 3 ) ? props.data.length : 3,
        accessibility: true,
        swipeToSlide: true
      };

    return(
        <div className="center">
          <Slider {...settings} style={{width: "82.5%"}}>
          { props.data.map((item, index) => (
                <div id={item.id}  key={index}>
                    <button onClick={() => props.view(props.type.toString(), item.id)}><img height="125" width="100" src={item.image}></img></button>
                    <button onClick={() => props.remove(props.type.toString(), item.id)}>X</button>
                </div>
            )) }
          </Slider>
        </div>
    )
}

export default FollowSlick