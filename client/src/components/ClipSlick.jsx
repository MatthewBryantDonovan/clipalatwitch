import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function ClipSlick() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 3,
        slidesToScroll: 3
      };

      return (
        <div className="center">
          <Slider {...settings}>
            <div>
            <iframe width="300" height="200" src="https://www.youtube.com/embed/R6WjN-9ines" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div>
            <iframe width="300" height="200" src="https://www.youtube.com/embed/R6WjN-9ines" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div>
              <iframe width="300" height="200" src="https://www.youtube.com/embed/R6WjN-9ines" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div>
             <iframe width="300" height="200" src="https://www.youtube.com/embed/R6WjN-9ines" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div>
            <iframe width="300" height="200" src="https://www.youtube.com/embed/R6WjN-9ines" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div>
              <iframe width="300" height="200" src="https://www.youtube.com/embed/R6WjN-9ines" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div>
              <iframe width="300" height="200" src="https://www.youtube.com/embed/R6WjN-9ines" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div>
             <iframe width="300" height="200" src="https://www.youtube.com/embed/R6WjN-9ines" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div>
              <iframe width="300" height="200" src="https://www.youtube.com/embed/R6WjN-9ines" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </Slider>
        </div>
      );

}

export default ClipSlick