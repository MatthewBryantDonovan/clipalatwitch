import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function ClipSlick(props) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 3,
        slidesToScroll: 3,
        accessibility: true
      };

      return (
        <div className="center">
          <Slider {...settings}>
          { (props.clipData) ? props.clipData.clips.map(clip => (
                <div id={clip.id}>
                    <iframe src={clip.embed_url + "&autoplay=false"} height="200" width="300"></iframe>
                </div>
            )) : <div></div>}
          </Slider>
        </div>
      );

}

export default ClipSlick