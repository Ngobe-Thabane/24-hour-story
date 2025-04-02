import { useContext, useEffect, useState } from "react";
import { StoriesObject, StoryContex } from "../context/StoryContex";
import Stories from 'react-insta-stories';

export default function Story(){

  const {currentStoryContent} = useContext(StoryContex) as StoriesObject;

  const stories = currentStoryContent?.map(story =>{
    return {
      url: story.image, 
      duration:3000,
      header : {
        subheading: 'Posted 30m ago',
        profileImage : currentStoryContent[0].image
      }
    }
  }) as Array<{}>;


  return (
    <> 
      { currentStoryContent && 
        <Stories
          stories={stories} 
          defaultInterval={3000}
          width={500}
          height={600}
        />
       }
    </>
  )
}