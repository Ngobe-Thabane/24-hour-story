import { Container } from "@mui/material";
import StoryContexProvider from "../context/StoryContex";
import StoryThumbnail from "../components/StoryThumbnail";
import Story from "../components/Story";


export default function Home(){
  return (
    <Container>
      <StoryContexProvider>
        <StoryThumbnail />
        <Story />
      </StoryContexProvider>
    </Container>
  )
}