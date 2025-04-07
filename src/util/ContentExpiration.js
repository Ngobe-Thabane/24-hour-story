
export function getStoriesFromLocalStorage(){
  
  const stories = localStorage.getItem('stories');
  const storyList = stories ? JSON.parse(stories) : []
  return storyList;
}

export function deleteExpiredStories(){
  const stories = getStoriesFromLocalStorage();
  const notExpiredStories = []

  stories.forEach((story)=>{
    const notExpired = isStoryNotExpired(story);
    if(notExpired) {
      notExpiredStories.push(story)
    }
  })

  localStorage.setItem('stories', JSON.stringify(notExpiredStories));

}

function isStoryNotExpired(story){
  const currentTimestamp = new Date().getTime();
  const timeLeft = story.expirationTime - currentTimestamp;
  return timeLeft > 0;
}