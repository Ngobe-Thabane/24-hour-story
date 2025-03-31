import Story, { Content } from "./StoryUtil";

const storiesLocalstorage = localStorage.getItem('stories');
const stories: Array<{}> = storiesLocalstorage ? JSON.parse(storiesLocalstorage) : [];


export function saveToLocalStorage(story:Story){
  stories.push(story.getStory());
  localStorage.setItem('stories', JSON.stringify(stories));
}

export default function convertImageToBase64(files : FileList): Promise<Array<Content>> {
  
  const promises = Array.from(files).map((file)=>{

    return new Promise<Content>((resolve, reject)=>{

      const reader = new FileReader();
      reader.onload = (event) =>{
        resolve({name: file.name, image: event.target?.result as string, imageId:""});
      }
      reader.onerror = reject;
      reader.readAsDataURL(file);
    })
  })
  return Promise.all(promises);
  
}