import { useContext} from "react";
import { StoriesObject, StoryContex } from "../context/StoryContex";
import Stories from 'react-insta-stories';
import { Content } from "../util/StoryUtil";

export default function Story(){

  const {currentStory, nextStory} = useContext(StoryContex) as StoriesObject;
  if(currentStory){
    
    const currentStoryContent = currentStory ? JSON.parse(currentStory?.storyContent as string) as Array<Content> : []
    const stories = currentStoryContent?.map(story =>{
      return {
        url: story.image, 
        duration:3000,
        header : {
          profileImage : currentStoryContent[0].image
        }
      }
    }) as Array<{}>;
      
  
  
    return (
      <> 
        { currentStoryContent && 
          <Stories onAllStoriesEnd={()=>{
            console.log("ended stories");
            
            setTimeout(()=>{
              nextStory(currentStory?.storyId as string)

            }, 0);
          }}
            stories={stories}
          />
         }
      </>
    )
  }
}