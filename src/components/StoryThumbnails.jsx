import Profile from "./Profile"


export default function StoryThumbnails({stories, viewStory}){

  return (
    <>
      {
        stories.map((story,index)=>{
          return (
            <div className="relative pb-2" key={story.id}>
              <button className='cursor-pointer bg-transparent border-none outline-none' onClick={()=> viewStory(index)}>
                <Profile storyThumnail={true} image={story.profileImage}/>
              </button>
            </div>
          )
        })
      }
    </>
  )
}