
const stories = localStorage.getItem('stories');

export interface StorieList{
  timeStamp : number;
  storyId : string;
  storyContent: string,
  storyExpirytime : number
}
export interface StoryExpire{
  storyId:string,
  expirytime : number
}

const storyList : Array<StorieList> = stories ? JSON.parse(stories) : []

export function getStoryExpiryTimes(){

  const timeleft : Array<StoryExpire> = [];

  storyList.forEach((story)=>{
    const time = getStoryExpirytime(story.storyId, story.storyExpirytime);
    if(time > 0) timeleft.push({storyId: story.storyId, expirytime:time});
  })

  return timeleft;
}

function getStoryExpirytime(storyId:string, expiryTime:number) : number{

  const currentTimestamp = new Date().getTime();
  const timeLeft = expiryTime - currentTimestamp;

  if(timeLeft < 0) removeStory(storyId);

  return timeLeft;
}


export function removeStory(storyId:string){
  const newStoryList = storyList.filter((story)=>{
    return story.storyId !== storyId;
  });
  localStorage.setItem('stories', JSON.stringify(newStoryList));
}