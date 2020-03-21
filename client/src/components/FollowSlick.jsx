import React, { useEffect, useState }  from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function FollowSlick(props) {

  let [width, setWidth] = useState(window.innerWidth);
  const [slides, setSlides] = useState((Math.floor((((window.innerWidth < 900 ? window.innerWidth*0.8 : window.innerWidth))/(window.innerWidth < 900 ? 125 : 200))) || 1));

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect(() => {
    const resizeListener = () => {
      // change width from the state object
      setWidth(window.innerWidth)
      setSlides((Math.floor((((window.innerWidth < 900 ? window.innerWidth*0.8 : window.innerWidth))/(window.innerWidth < 900 ? 125 : 200))) || 1));
      console.log(width);
      
      
    };
    // set resize listener
    window.addEventListener('resize', resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    }
  }, [])
////////////////TODO: current width code 

    const settings = {
        speed: 200,
        slidesToShow: (props.data.length < slides) ? props.data.length : slides,
        slidesToScroll: (props.data.length < slides) ? props.data.length : slides,
        accessibility: true,
        swipeToSlide: true
      };

    return(
        <div className="center">
          <Slider {...settings} style={ (window.innerWidth < 900) ? {width: ((width*0.79)+"px")} : {width: "100%"}}>
          { props.data.map((item, index) => (
                <div id={item.id}  key={index}>
                    <button onClick={() => props.view(props.type.toString(), item.id)}><img height="125" width="100" src={item.image}></img></button>
                    <div><button onClick={() => props.remove(props.type.toString(), item.id)}>X</button></div>
                </div>
            )) }
          </Slider>
        </div>
    )
}

export default FollowSlick