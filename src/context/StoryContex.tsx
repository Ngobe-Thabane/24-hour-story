import { createContext, ReactNode } from "react";
import { useEffect, useState } from "react";
import { deleteExpiredStories,getStoriesFromLocalStorage,StorieList } from '../util/contentExpiration';
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

  const setStoryToView = (id:string) =>{
    const story = stories?.find((storie)=>{ return storie.storyId === id});
    if(story) setCurrentContent(JSON.parse(story?.storyContent))
  }

  useEffect(()=>{

    const intervalStoryUpdateId = setInterval(()=>{
      deleteExpiredStories();
      const updatedStories = getStoriesFromLocalStorage();
      setStories(updatedStories)
    }, 1000)
    return () => clearInterval(intervalStoryUpdateId)
    
  }, [])
  return (
    <StoryContex.Provider value={{stories, currentStoryContent, setStoryToView}}>
      {children}
    </StoryContex.Provider>
  )
}