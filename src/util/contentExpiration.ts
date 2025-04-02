

export interface StorieList{
  timeStamp : number;
  storyId : string;
  storyContent: string,
  storyExpirytime : number
}

export function getStoriesFromLocalStorage(){
  
  const stories = localStorage.getItem('stories');
  const storyList : Array<StorieList> = stories ? JSON.parse(stories) : []
  return storyList;
}

export function deleteExpiredStories(){
  const stories = getStoriesFromLocalStorage();
  const notExpiredStories : Array<StorieList> = []

  stories.forEach((story)=>{
    const notExpired = isStoryNotExpired(story);
    if(notExpired) {
      notExpiredStories.push(story)
    }
  })

  localStorage.setItem('stories', JSON.stringify(notExpiredStories));

}

function isStoryNotExpired(story: StorieList) : boolean{
  const currentTimestamp = new Date().getTime();
  const timeLeft = story.storyExpirytime - currentTimestamp;
  return timeLeft > 0;
}
