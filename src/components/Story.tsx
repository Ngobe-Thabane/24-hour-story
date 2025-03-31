import { useEffect, useState } from "react";
import { Content } from "../util/StoryUtil";
import { Box, CardMedia } from "@mui/material";

export default function Story({storyContent}:{storyContent:Array<Content>}){

  const storiesImages = storyContent.map(story => story.image);
  const [image, setImage] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImage(prevImage => (prevImage + 1) % storiesImages.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [storiesImages.length]);

  return (
    <Box>
      <CardMedia src={storiesImages[image]} component={'img'} />
    </Box>
  )
}