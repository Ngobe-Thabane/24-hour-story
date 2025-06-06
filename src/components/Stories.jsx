import { EffectCube} from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";

import 'swiper/css'
import 'swiper/css/effect-cube'

import { useEffect, useRef, useState } from "react";
import StoryContent from "./StoryContent";
import { getStoriesFromLocalStorage, getStoryLifeSpans } from "../util/ContentExpiration";
import { Dialog, DialogPanel } from "@headlessui/react";
import Upload from "./Upload";
import StoryThumbnails from "./StoryThumbnails";


export default function Stories(){

  const swiperRef  = useRef(null);
  const [storyLifeSpans, setLifeSpanLeft] = useState(getStoryLifeSpans());
  const [stories,setStories] = useState(getStoriesFromLocalStorage());
  const [open, setOpen] = useState(false);
  const [slideNumber, setSlide] = useState(0);
  const updateId = useRef(null);

  const handleNextSlide = ()=>{
    if(swiperRef.current){
      swiperRef.current.swiper.slideNext();
    }
  }
  const viewStory = (storyNumber) =>{
    setOpen(true);
    setSlide(storyNumber);
  }

  useEffect(()=>{

    const update = ()=>{
      setLifeSpanLeft(getStoryLifeSpans());
      setStories(getStoriesFromLocalStorage());
    }
    updateId.current = setInterval(update, storyLifeSpans[0]);
    return () => clearInterval(updateId.current);

  }, [stories]);
  
  return (
    <>
      <div className='border-b-[0.2px] border-gray-500/10 flex gap-1 pb-1'>
        <Upload setStory={setStories} />
        <StoryThumbnails  stories={stories} viewStory={viewStory} />
      </div>
      <Dialog open={open} onClose={()=>{setOpen(false)}}>
        <div>
          <DialogPanel>
            <div className='fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-500'>
              <Swiper className="w-[450px] h-full relative" 
                ref={swiperRef}
                initialSlide={slideNumber}
                speed={500}
                effect="cube"
                cubeEffect={{
                  shadow:true,
                  shadowOffset:true,
                  shadowScale:0.60
                }}
                onSlideChange={(swiper)=>{
                  setSlide(swiper.activeIndex);
                }}
                modules={[EffectCube]}
              >
                {
                  stories.map((story,index)=>{
                    return (
                      <SwiperSlide key={story.timestamp}>
                        <StoryContent nextSlide={handleNextSlide} profileImage={story.profileImage} content={story.storyContent} slideNumber={index} activeSlide={slideNumber}/>
                      </SwiperSlide>
                    )
                  })
                }
              </Swiper>
              <button className='text-black/85 text-3xl absolute z-10 top-5 left-20 font-bold' onClick={()=>{setOpen(false)}}>X</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog> 
    </>
  )
}