import { Avatar, Box, Button, Divider } from "@mui/material";
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
    <Box component={"div"} draggable>
      <Box component={"div"} className="image">
        <Avatar
          src={image}
          alt="pic"
          variant="square"
          sx={{ width: 60, height: 60 }}
        />
        <p className="imageName">{name}</p>
        <Button id={imageId} onClick={handleDelete}>
          <DeleteIcon />
        </Button>
      </Box>
      <Divider />
    </Box>
  );
}
