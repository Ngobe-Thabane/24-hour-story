
const stories = localStorage.getItem('stories');

export interface StorieList{
  timeStamp : number;
  storyId : string;
  storyContent: string,
  storyExpirytime : number
}

const storyList : Array<StorieList> = stories ? JSON.parse(stories) : []

export function getExpiryTimes(){

  const timeleft : Array<number> = [];

  storyList.forEach((story)=>{
    const time = getTimeLeft(story.storyExpirytime);
    if(time > 0) timeleft.push(time);
  })

  return timeleft;
}

function getTimeLeft(storyExpirytime :number) : number{

  const currentTimestamp = new Date().getTime();
  const timeLeft = storyExpirytime - currentTimestamp;

  if(timeLeft < 0){
    removeStory(storyExpirytime);
  }
  else{
    setTimeout(()=>{
      removeStory(storyExpirytime);
    }, timeLeft);
  }
  return timeLeft;
}


function removeStory(storyExpiryTime:number){
  const newStoryList = storyList.filter((story)=>{
    return story.storyExpirytime === storyExpiryTime;
  });
  localStorage.setItem('stories', JSON.stringify(newStoryList));
}