import { Box, Button } from "@mui/material";
import "../styles/Upload.css";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import React, { useContext, useRef, useState } from "react";
import convertToBase64, { saveToLocalStorage } from "../util/imageUtils";
import Story from "../util/StoryUtil";
import PreviewList from "./PreviewList";
import { UploadContex, UploadContexType } from "../context/UploadContext";
import WebCam from "./WebCam";

export default function Upload() {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);

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
      <Box component={"div"} className="upload-header-container">
        <h1>Create new Story</h1>
        <Button onClick={handleFileUpload}>
          {" "}
          <FileUploadIcon />{" "}
        </Button>
        <Button onClick={() => setOpen(true)}>
          {" "}
          <PhotoCameraIcon />{" "}
        </Button>
      </Box>
      <PreviewList />

      <WebCam open={open} setOpen={setOpen} />

      <div className="action-btn-container">
        <Button
          onClick={() => {
            saveToLocalStorage(story.current as Story);
          }}
        >
          Create
        </Button>
        <Button>Preview</Button>
      </div>
      <input
        type="file"
        onChange={saveFiles}
        style={{ display: "none" }}
        ref={fileInput}
      />
    </Box>
  );
}
