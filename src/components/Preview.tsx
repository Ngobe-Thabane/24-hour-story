import { Avatar, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useContext } from "react";
import { UploadContex, UploadContexType } from "../context/UploadContext";
import { Content } from "../util/StoryUtil";

export default function Preview({ name, image, imageId }: Content) {
  const { setContent, story } = useContext(UploadContex) as UploadContexType;

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget;
    if (story.current) {
      story.current.removeStoryContent(target.id);
      setContent(story.current.getStoryContent());
    }
  };

  return (
    <Box component={"div"} draggable sx={{border:'1px solid #81809148', padding:1, borderRadius:1, margin:1}}>
      <Box component={"div"} className="image">
        <Avatar
          src={image}
          alt="pic"
          variant="square"
          sx={{ width: 60, height: 60 }}
        />
        <p className="imageName">{name}</p>
        <IconButton id={imageId} onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
