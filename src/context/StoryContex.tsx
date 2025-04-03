import { createContext, ReactNode } from "react";
import { useEffect, useState } from "react";
import { deleteExpiredStories,getStoriesFromLocalStorage,StorieList } from '../util/contentExpiration';

export interface StoriesObject{
  stories : Array<StorieList> | null,
  currentStory : StorieList | null,
  setStoryToView : (id:string) => void,
}

export const StoryContex = createContext<StoriesObject|undefined>(undefined);

export default function StoryContexProvider({children}:{children:ReactNode}){

  const [stories, setStories] = useState<Array<StorieList>|null>(null);
  const [currentStory, setCurrentStory] = useState<StorieList|null>(null);

  const setStoryToView = (id:string) =>{
    const story = stories?.find((storie)=>{ return storie.storyId === id});
    if(story) setCurrentStory(story)
  }


  useEffect(()=>{

    // const intervalStoryUpdateId = setInterval(()=>{
      deleteExpiredStories();
      const updatedStories = getStoriesFromLocalStorage();
      setStories(updatedStories)
    // }, 1000)
    // return () => clearInterval(intervalStoryUpdateId)

  }, [])
  
  return (
    <StoryContex.Provider value={{stories, currentStory, setStoryToView}}>
      {children}
    </StoryContex.Provider>
  )
}