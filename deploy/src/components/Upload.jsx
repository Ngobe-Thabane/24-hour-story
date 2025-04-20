import { useEffect, useRef, useState } from "react";
import Story from "../util/Story";
import convertImageToBase64, { saveToLocalStorage } from "../util/ImageUtils";
import UploadedImages from "./UploadedImages";
import Profile from "./Profile";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { getStoriesFromLocalStorage } from "../util/ContentExpiration";

export default function Upload({setStory}){
  const story = useRef(null);
  const fileInput = useRef(null);
  const [content, setContent] = useState([]);
  const [open, setOpen] = useState(false)
  const [reset, setReset] = useState(false)

  useEffect(()=>{
    if(reset){
      story.current = new Story();
      setContent([])
      setReset(false);
    }
  }, [open])

  const deleteImage = (id)=>{
    story.current.removeStory(id);
    setContent(story.current.getStoryContent());
  }

  const closeModal = ()=>{
    setOpen(false);
  }

  const handleFileUpload = () => {
    if (fileInput.current) fileInput.current.click();
  };

  const saveStory = ()=>{
    saveToLocalStorage(story.current.getStory());
    setStory(getStoriesFromLocalStorage());
    setOpen(false);
  }

  const openModal =()=>{
    setReset(true);
    setOpen(true);
  }

  const saveFiles = async (event) => {

    if (event.target.files) {
      const image = await convertImageToBase64 (event.target.files);

      image.forEach((content) => {
        if (story.current) story.current.addStoryContent(content);
      });
    }

    if (story.current) setContent(story.current.getStoryContent());

  };


  return (
    <div>
      <button onClick={openModal}>
        <Profile image={'public/user.png'} storyThumnail={true} />
      </button>

      <Dialog open={open} onClose={closeModal}>
        <DialogBackdrop className={'backdrop-blur-sm fixed inset-0'}>
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/60">
            <DialogPanel className={'relative w-full'}>
              <div className="">
                <UploadedImages files={content} upload={handleFileUpload} deleteFile={deleteImage} create={saveStory} />
              </div>
              <button className="text-neutral-400 text-4xl font-bold absolute top-0 right-10" onClick={closeModal}>X</button>
            </DialogPanel>  
          </div>
        </DialogBackdrop>
      </Dialog>

      <input className='hidden'
        type="file"
        onChange={saveFiles}
        ref={fileInput}
      />
    </div>
  )

}