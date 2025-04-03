import { useContext, useEffect, useState} from "react";
import { StoriesObject, StoryContex } from "../context/StoryContex";
import Stories from 'react-insta-stories';
import { Content } from "../util/StoryUtil";
import { Box, IconButton, Modal } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function Story(){

  const {currentStory, setStoryToView, stories} = useContext(StoryContex) as StoriesObject;

  const nextStory = ()=>{
    const currentStoryIndex = stories?.findIndex(story => story.storyId === currentStory?.storyId) as number;

    if(currentStoryIndex >= 0){
      const nextIndexStory = currentStoryIndex + 1;
      if(stories && nextIndexStory < stories?.length){
        const nextStoryId = stories[nextIndexStory].storyId;
        setStoryToView(nextStoryId);
      }
    }
  }
  const [open, setOpen] = useState(true);
  const handleClose = () =>{setOpen(false)}
  useEffect(()=>{
    setOpen(true)
  }, [currentStory])

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
          <Modal open={open}   
            // aria-labelledby="modal-modal-title"
            // aria-describedby="modal-modal-description"
        >
            <Box sx={{margin:'auto', display:'flex', justifyContent:'center', position:'relative', paddingTop:5}}>

              <IconButton onClick={handleClose} sx={{position:'absolute', zIndex:1, top:10, left:20, backdropFilter:'blur(60px)'}}>
                <CloseIcon />
              </IconButton>

              <Stories 
                width={400}
                height={600}
                onAllStoriesEnd={()=>{
                
                setTimeout(()=>{
                  nextStory()

                }, 0);
              }}
                stories={stories}
              />

            </Box>
          </Modal>
          }
      </>
    )
  }
}