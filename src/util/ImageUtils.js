
const storiesLocalstorage = localStorage.getItem('stories');
const stories = storiesLocalstorage ? JSON.parse(storiesLocalstorage) : [];

export function saveToLocalStorage(story){
  stories.push(story);
  localStorage.setItem('stories', JSON.stringify(stories));
}

export default function convertImageToBase64(files){
  
  const promises = Array.from(files).map((file)=>{

    return new Promise((resolve, reject)=>{

      const reader = new FileReader();
      reader.onload = (event) =>{
        resolve({name: file.name, image: event.target?.result, imageId:""});
      }
      reader.onerror = reject;
      reader.readAsDataURL(file);
    })
  })
  return Promise.all(promises);
  
}