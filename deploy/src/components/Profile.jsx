
export default function Profile({image, storyThumnail}){
  
  return (
    <div className={`flex gap-2 mt-4 ml-4 ${storyThumnail? 'items-start block flex-col' : 'items-center absolute flex-row'} top-2 left-0 $`}>
      <div class="relative inline-block">
        <img src={image} class={`${storyThumnail ? 'w-20 h-20' :'w-12 h-12'} object-cover rounded-full border-1 border-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 p-[2px] `}/>
      </div>
      <p className={`text-white ${storyThumnail? 'text-xs font-light self-center':'text-md font-semibold'}`}>Your Story</p>
      {
        !storyThumnail &&
          <p className="text-gray-400 text-md">5m</p> 
      }
    </div>
  )
}