
export function getStoriesFromLocalStorage(){
  
  const stories = localStorage.getItem('stories');
  const storyList = stories ? JSON.parse(stories) : []
  return storyList;
}

export function getStoryLifeSpans(){
  const stories = getStoriesFromLocalStorage();
  const notExpiredStories = []
  const storyLifeSpans = []

  stories.forEach((story)=>{
    const currentTimestamp = new Date().getTime();
    const timeLeft = story.expirationTime - currentTimestamp;
    if(timeLeft > 0) {
      notExpiredStories.push(story)
      storyLifeSpans.push(timeLeft);
    }
  })

  localStorage.setItem('stories', JSON.stringify(notExpiredStories));

  return storyLifeSpans.sort((a,b)=> a-b);
}