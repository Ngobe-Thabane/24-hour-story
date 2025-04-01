import { createContext, ReactNode } from "react";
import { useEffect, useState } from "react";
import { getStoryExpiryTimes, removeStory, StorieList } from '../util/contentExpiration';
import { Content } from "../util/StoryUtil";

export interface StoriesObject{
  stories : Array<StorieList> | null,
  currentStoryContent : Array<Content> | null,
  setStoryToView : (id:string) => void
}

export const StoryContex = createContext<StoriesObject|undefined>(undefined);

export default function StoryContexProvider({children}:{children:ReactNode}){

  const [stories, setStories] = useState<Array<StorieList>|null>(null);
  const [currentStoryContent, setCurrentContent] = useState<Array<Content>|null>(null);
  const storyExpiryTimes = getStoryExpiryTimes();

  const setStoryToView = (id:string) =>{
    const story = stories?.find((storie)=>{ return storie.storyId === id});
    if(story) setCurrentContent(JSON.parse(story?.storyContent))
  }

  storyExpiryTimes.forEach((story)=>{
    setTimeout(()=>{ 

      removeStory(story.storyId);
      const updatedStories = localStorage.getItem('stories');
      if(updatedStories)
        setStories(JSON.parse(updatedStories) as Array<StorieList>);

    }, story.expirytime);})

  useEffect(()=>{    
    const updatedStories = localStorage.getItem('stories');
    if(updatedStories) setStories(JSON.parse(updatedStories) as Array<StorieList>);     
    }, []);

  return (
    <StoryContex.Provider value={{stories, currentStoryContent, setStoryToView}}>
      {children}
    </StoryContex.Provider>
  )
}