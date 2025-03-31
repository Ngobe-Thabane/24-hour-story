import { Avatar, Box } from "@mui/material";
import { Content } from "../util/StoryUtil";
import { StorieList } from "../util/contentExpiration";
import Story from "./Story";

export default function StoryThumbnail({storyList}: {storyList: Array<StorieList>;}) {

  return (
    <Box component={"div"}>
      {storyList.map((story) => {
        const thumbanail: Array<Content> = JSON.parse(story.storyContent);

        return (
          <Avatar
            src={thumbanail[0].image}
            key={story.storyId}
            variant="circular"
            sx={{ width: 150, height: 150 }}
          />
        );
      })}
      {
        storyList.map((story, index)=>{
          const thumbanail: Array<Content> = JSON.parse(story.storyContent);
          return (<Story storyContent={thumbanail} key={index}/>)
        })
      }
    </Box>
  );
}
