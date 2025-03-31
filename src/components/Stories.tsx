import { useEffect, useState } from "react";
import { getExpiryTimes, StorieList } from "../util/contentExpiration";
import { Box } from "@mui/material";
import StoryThumbnail from "./StoryThumbnail";


export default function Stories(){
  const [stories, setStories] = useState<Array<StorieList>|null>(null);

  useEffect(()=>{

    getExpiryTimes().forEach((time)=>{

      setTimeout(()=>{ 
        const updatedStories = localStorage.getItem('stories');
        if(updatedStories)
          setStories(JSON.parse(updatedStories) as Array<StorieList>);
      }, time);

    const storiesCurrentList = localStorage.getItem('stories');
    if(storiesCurrentList) setStories(JSON.parse(storiesCurrentList) as Array<StorieList>);

    })
  }, []);

  return (
    <Box>
      {
        stories ? <StoryThumbnail storyList={stories as Array<StorieList>} /> : ''
      }
    </Box>
  );
}