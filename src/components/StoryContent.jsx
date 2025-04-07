import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade} from "swiper/modules";
import Profile from "./Profile.jsx";

import "swiper/css";
import 'swiper/css/effect-fade'
import 'swiper/css/autoplay'

import { useEffect, useRef } from "react";
import ProgressBar from "./ProgressBar";

export default function StoryContent({nextSlide, content, profileImage}){

  const swiperRef = useRef(null);
  useEffect(()=>{
    console.log(swiperRef.current)
  }, [content])

  const updateProgressBar = (swiper, timeleft, percentage)=>{

    const swiperDiv = swiper.el;
    const activeSlideId = swiperDiv.querySelector('.swiper-slide-active');

    if(swiperDiv && activeSlideId){
      
      const activeProgressBar = swiperDiv.querySelector(`.bar-${activeSlideId.id}`);
      const progress = (1-percentage) *100;
      
      if(progress <= 102)
        activeProgressBar.style.width = `${progress}%`;  
    }
    
    if(swiper.isEnd && timeleft < 0){
      swiper.autoplay.running = false;
      nextSlide();
    }
  }


  return (
    <Swiper className=" h-[100%] relative rounded-md " 

      ref={swiperRef}
      direction='horizontal'
      centeredSlides={true}
      nested={true}
      speed={500}
      autoplay={{
        delay:2500,
        stopOnLastSlide:true
      }}
      fadeEffect={{
        crossFade: true
      }}
      onAutoplayTimeLeft={updateProgressBar}
      effect='fade'
      modules={[EffectFade, Autoplay]} >

      {<ProgressBar content={content} />}

      {
        content.map((story)=>{
          return (
            <SwiperSlide id={story.imageId} key={story.imageId}>
              <div className="relative">
                <Profile image={profileImage} storyThumnail={false} />
                <div>
                  <img src={story.image} alt="" className="object-cover h-screen object-center rounded"/>
                </div>
              </div>
            </SwiperSlide>      
          )
        })
      }
    </Swiper>
  )
};