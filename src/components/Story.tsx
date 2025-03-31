import { useContext, useEffect, useState } from "react";
import { Box, Card, CardContent, CardMedia, IconButton } from "@mui/material";
import { LinearProgress } from '@mui/material';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { StoriesObject, StoryContex } from "../context/StoryContex";

export default function Story(){

  const {currentStoryContent} = useContext(StoryContex) as StoriesObject;

  const storiesImages = currentStoryContent?.map(story => story.image) as Array<{}>;
  const [image, setImage] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImage(prevImage => (prevImage + 1) % storiesImages?.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [storiesImages?.length]);

  return (
    <> 
      { currentStoryContent &&
        <Box>
          <Card sx={{ width: 500, position: 'relative', margin:'auto'}} variant='outlined' >
            <IconButton 
            sx={{
              position: 'absolute',
              top: '50%',
              left: '0',
              transform: 'translateY(-50%)',
              zIndex: 2,
              cursor: 'pointer',
            }}
          >
            <ChevronLeftIcon sx={{fontSize:30}} />
          </IconButton>
            <IconButton 
            sx={{
              position: 'absolute',
              top: '50%',
              right: '0',
              transform: 'translateY(-50%)',
              zIndex: 2,
              cursor: 'pointer',
            }}
          >
            <ChevronRightIcon sx={{ fontSize: 30 }} />
          </IconButton>
          <CardContent sx={{display:'flex', gap:1, position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 1 }}>
            {
              storiesImages.map((progress, index) => (
                <LinearProgress key={index} sx={{ width: '100%' }} variant='determinate' value={20} />
              ))
            }
          </CardContent>

          <CardMedia
            src={storiesImages[image] as string}
            component={'img'}
            height={600}
            sx={{ position: 'relative', zIndex: 0 }}
          />
        </Card>

        </Box>
      }
    </>
  )
}