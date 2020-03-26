import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import Nextarrow from './Nextarrow'
import Prevarrow from './Prevarrow'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ClipSlick(props) {

  // Hooks
  let [clipWidth, setClipWidth] = useState(260 + (Math.floor((window.innerWidth * 0.8) / 425)) * 40);
  let [clipHeight, setClipHeight] = useState((260 + (Math.floor((window.innerWidth * 0.8) / 425)) * 40) * .72);

  // Use Effect to grab screen size
  useEffect(() => {
    const resizeListener = () => {

      // change width from the state object
      setClipWidth(260 + (Math.floor((window.innerWidth * 0.8) / 425)) * 40);
      setClipHeight((260 + (Math.floor((window.innerWidth * 0.8) / 425)) * 40) * .72);
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
    slidesToShow: 3,
    slidesToScroll: 3,
    accessibility: true,
    lazyLoad: true,
    swipeToSlide: true,
    nextArrow: <Nextarrow />,
    prevArrow: <Prevarrow />,
    responsive: [
      {
        breakpoint: 1744,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 1163,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
  <div className="center">
    <Slider {...settings} style={{width: "100%"}}>
    {(props.clipData) ?
    props.clipData.clips.map((clip, index) => (
      <div id={clip.id}  key={index}>
          <iframe src={clip.embed_url + "&autoplay=false"} height={clipHeight} width={clipWidth} allowFullScreen
              srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%;background: black}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto;z-index: 1}p{position:absolute;width:100%;top:0%;margin:auto}.bottom-bar{position:absolute;width:100%;bottom:0%;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}p,.bottom-bar{height:1.5em;text-align:center;font:12px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black;background: black;line-height:1.45;}</style><a href=${clip.embed_url + "&autoplay=false"}><img src=${clip.thumbnail_url} alt=${clip.title}><p>${clip.title}</p><span>▶</span><div class="bottom-bar"></div></a>`}
          ></iframe>
          {(props.favoriteClip) ? 
            (props.type === "streamer") ?
              (props.userData.streamers.some(streamer => streamer.likedContent.includes(clip.embed_url))) ? 
              <div> You like it! </div>
              :
              <div><button className="like" onClick={() => props.favoriteClip(clip.embed_url, clip.title, clip.thumbnail_url)}><i className="material-icons" style={{color: 'rgb(30, 136, 229)'}}>favorite_border</i></button></div> 
            :
              (props.userData.games.some(game => game.likedContent.includes(clip.embed_url))) ? 
              <div> You like it! </div>
              :
              <div><button  className="like" onClick={() => props.favoriteClip(clip.embed_url, clip.title, clip.thumbnail_url)}><i className="material-icons" style={{color: 'rgb(30, 136, 229)'}}>favorite_border</i></button></div> 
          : 
          <span> </span>
          }
      </div>
    ))
    :
    <div></div>
    }
    </Slider>
  </div>
  );

}

export default ClipSlick;