import React, { useEffect, useState }  from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function FollowSlick(props) {

    // const isClient = typeof window === 'object';
  
    // function getSize() {
    //   return isClient ? window.innerWidth : undefined;
    // }
  
//     const [windowSize, setWindowSize] = useState(getSize);
//     const [slides, setSlides] = useState(3);

//   useEffect(() => {
//     getSize()
//     if(windowSize < 500) {
//       setSlides(1)
//     }
//   }, [windowSize])
    console.log(props)

    const settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 3,
        slidesToScroll: 3,
        accessibility: true,
        lazyLoad: true,
        swipeToSlide: true,
        variableWidth: true
      };

    return(
        <div className="center">
          <Slider {...settings}>
          { props.data.map((item, index) => (
                <div id={item.id}  key={index}>
                    <button onClick={() => props.view(props.type.toString(), item.id)}><img height="50" width="50"  src={item.image}></img></button>
                    <button onClick={() => props.remove(props.type.toString(), item.id)}>X</button>
                </div>
            )) }
          </Slider>
        </div>
    )
}

export default FollowSlick