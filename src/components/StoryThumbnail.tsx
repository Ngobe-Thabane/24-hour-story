import { Avatar, Box, IconButton } from "@mui/material";
import { Content } from "../util/StoryUtil";
import React, { useContext } from "react";
import { StoriesObject, StoryContex } from "../context/StoryContex";

export default function StoryThumbnail() {
 
  const {stories, setStoryToView} = useContext(StoryContex) as StoriesObject;

  const showStory = (event : React.MouseEvent) =>{
    setStoryToView(event.currentTarget.id);
  }

  return (
    <>
      {stories &&
        <Box component={"div"} sx={{display:'flex', gap:1}}>
          {stories?.map((story) => {
            const thumbanail: Array<Content> = JSON.parse(story.storyContent);

            return (
              <IconButton id={story.storyId} onClick={showStory} key={story.storyId}>
                <Avatar
                  src={thumbanail[0].image}
                  key={story.storyId}
                  variant="circular"
                  sx={{ width: 50, height: 50 }}
                />
              </IconButton>
            );
          })}
        </Box>
      }
    </>
  );
}
