import { Box, Button, Divider, IconButton } from "@mui/material";
import "../styles/Upload.css";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import React, { useContext, useRef, useState } from "react";
import convertToBase64, { saveToLocalStorage } from "../util/imageUtils";
import Story from "../util/StoryUtil";
import PreviewList from "./PreviewList";
import { UploadContex, UploadContexType } from "../context/UploadContext";
import WebCam from "./WebCam";
import { useNavigate } from "react-router";

export default function Upload() {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { setContent, story } = useContext(UploadContex) as UploadContexType;

  const handleFileUpload = () => {
    if (fileInput.current) fileInput.current.click();
  };

  const saveFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const image = await convertToBase64(event.target.files);
      image.forEach((content) => {
        if (story.current as Story) story.current?.addStoryContent(content);
      });
    }
    if (story.current) setContent(story.current.getStoryContent());
  };

  return (
    <Box component={"section"} className="upload-box">
      <Box component={"div"} sx={{display:'flex', marginRight:1, marginLeft:1, gap:1}}>
        <h1 style={{flex:1}} >Create new Story</h1>
        <IconButton onClick={handleFileUpload}>
          {" "}
          <FileUploadIcon />{" "}
        </IconButton>
        <IconButton onClick={() => setOpen(true)}>
          {" "}
          <PhotoCameraIcon />{" "}
        </IconButton>
      </Box>
      <Divider />
      <PreviewList />

      <WebCam open={open} setOpen={setOpen} />

      <Box component={'div'} sx={{margin:1}} className="action-btn-container">
        <Button
          onClick={() => {
            saveToLocalStorage(story.current as Story);
            navigate('/');
          }}
        >
          Create
        </Button>
        <Button>Preview</Button>
      </Box>
      <input
        type="file"
        onChange={saveFiles}
        style={{ display: "none" }}
        ref={fileInput}
      />
    </Box>
  );
}
