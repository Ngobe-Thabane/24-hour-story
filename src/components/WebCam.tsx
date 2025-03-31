
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useContext, useEffect, useRef} from 'react';
import { UploadContex, UploadContexType } from '../context/UploadContext';

export default function WebCam({open,setOpen}:{open:boolean, setOpen:(open:boolean)=> void}) {

  const {story, setContent} = useContext(UploadContex) as UploadContexType;
  
  const handleClose = () => setOpen(false);
  const video = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  const startWebCam = async () =>{
    const stream = await navigator.mediaDevices.getUserMedia({
      video:{
        width: 500,
        height: 500,
      }});

      if(video.current)  video.current.srcObject = stream;
    }

  const captureImage = () =>{

    const canvas2d = canvas.current?.getContext('2d');
    canvas2d?.drawImage(video.current as HTMLVideoElement, 0, 0);
    const image = canvas.current?.toDataURL();

    if(story.current){
      story.current?.addStoryContent({name: Math.random().toString(36).substring(2, 10), image:image as string, imageId:''});
      setContent(story.current?.getStoryContent());
      setOpen(false);
    }  
  }

  useEffect(()=>{startWebCam()}, [open]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <canvas ref={canvas} width={500} height={500} hidden></canvas>
          <video autoPlay width={500} height={500} ref={video}></video>
          <Button onClick={captureImage}>capture</Button>
        </Box>
      </Modal>
    </div>
  );
}
