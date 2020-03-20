import React, { useEffect, useState }  from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function FollowSlick(props) {

  let [width, setWidth] = useState(window.innerWidth);

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect(() => {
    const resizeListener = () => {
      // change width from the state object
      setWidth(window.innerWidth)

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
        slidesToShow: (props.data.length < 3 ) ? props.data.length : 3,
        slidesToScroll: (props.data.length < 3 ) ? props.data.length : 3,
        accessibility: true,
        swipeToSlide: true
      };

    return(
        <div className="center">
          <Slider {...settings} style={ (window.innerWidth < 900) ? {width: ((width*0.79)+"px")} : {width: "100%"}}>
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