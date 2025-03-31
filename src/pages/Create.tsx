import Upload from "../components/Upload";
import UploadContexProvider from "../context/UploadContext";


export default function Create(){
  return (
    <UploadContexProvider>
      <Upload />
    </UploadContexProvider>
  )
}