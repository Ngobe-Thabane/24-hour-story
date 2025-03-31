
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext, useEffect, useRef} from 'react';
import { UploadContex, UploadContexType } from '../context/UploadContext';
import CircleIcon from '@mui/icons-material/Circle';
import { Card, IconButton } from '@mui/material';

export default function WebCam({open,setOpen}:{open:boolean, setOpen:(open:boolean)=> void}) {

  const {story, setContent} = useContext(UploadContex) as UploadContexType;
  
  const handleClose = () => setOpen(false);
  const video = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  const startWebCam = async () =>{
    const stream = await navigator.mediaDevices.getUserMedia({
      video:{
        width: 600,
        height: 600,
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
        <Card sx={{height:600, width:600, margin:'auto'}}>
          <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', position:'relative'}}>
            <canvas ref={canvas} width={600} height={600} hidden></canvas>
            <video autoPlay width={600} height={600} ref={video}></video>
            <IconButton onClick={captureImage} sx={{position:'absolute', bottom:0}}>
              <CircleIcon sx={{fontSize:70}}/>
            </IconButton>
          </Box>
        </Card>
      </Modal>
    </div>
  );
}
