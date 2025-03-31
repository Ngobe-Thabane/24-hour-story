import { Container } from "@mui/material";
import NavBar from "../components/NavBar";
import Stories from "../components/Stories";

export default function Home(){
  return (
    <Container>
      <NavBar />
      <Stories />
      {/* <UploadContexProvider>
        <Upload />
      </UploadContexProvider> */}
    </Container>
  )
}