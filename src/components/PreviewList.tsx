import { Box } from "@mui/material";
import Preview from "./Preview";
import { useContext } from "react";
import { UploadContex, UploadContexType } from "../context/UploadContext";

export default function PreviewList(){

  const {content} = useContext(UploadContex) as UploadContexType;

  return (
    <Box component={'section'}>
      {
        content.map((imageData)=>{
          return (<Preview name={imageData.name} image={imageData.image} imageId={imageData.imageId} key={imageData.imageId}/>)
        })
      }
    </Box>
  )
}