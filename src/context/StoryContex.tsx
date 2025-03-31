import { createContext, ReactNode } from "react";
import { useEffect, useState } from "react";
import { getExpiryTimes, StorieList } from '../util/contentExpiration';
import { Content } from "../util/StoryUtil";



export interface StoriesObject{
  stories : Array<StorieList> | null,
  setStories : (stories: Array<StorieList>) => void,
  currentStoryContent : Array<Content> | null,
  setStoryToView : (id:string) => void
}


export const StoryContex = createContext<StoriesObject|undefined>(undefined);


export default function StoryContexProvider({children}:{children:ReactNode}){

  const [stories, setStories] = useState<Array<StorieList>|null>(null);

  const [currentStoryContent, setCurrentContent] = useState<Array<Content>|null>(null);

  const setStoryToView = (id:string) =>{

    const story = stories?.find((storie)=>{
      return storie.storyId === id;
    });

    if(story) setCurrentContent(JSON.parse(story?.storyContent))
  }

  useEffect(()=>{

    getExpiryTimes().forEach((time)=>{

      setTimeout(()=>{ 
        const updatedStories = localStorage.getItem('stories');
        if(updatedStories)
          setStories(JSON.parse(updatedStories) as Array<StorieList>);
      }, time);

    const storiesCurrentList = localStorage.getItem('stories');

    if(storiesCurrentList){
      const storyList = JSON.parse(storiesCurrentList) as Array<StorieList>
      setStories(storyList);
    } })

  }, []);

  return (
    <StoryContex.Provider value={{stories, setStories, currentStoryContent, setStoryToView}}>
      {children}
    </StoryContex.Provider>
  )
}