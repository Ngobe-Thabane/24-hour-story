
export default function ProgressBar({content}){
  return (
    <div className="w-[98%] h-0.5 absolute top-2 left-1 flex gap-1 z-10">
      {
        content.map((story)=>{
          return (
            <div className="w-[98%] h-0.5 bg-gray-500 rounded-md" key={`bar-${story.imageId}`}>
              <div className={`w-[0%] h-0.5 bg-white rounded-md progress-bar bar-${story.imageId}`}></div>
            </div>
          )
        })
      }
    </div>
  )
}