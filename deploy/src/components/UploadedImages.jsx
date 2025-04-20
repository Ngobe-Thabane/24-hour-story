
export default function UploadedImages({files, upload, deleteFile, create}){

 return (
    <div className="bg-black/95 w-1/2 min-h-96 relative m-auto rounded-md text-white text-lg pb-3 border-[0.2px] border-gray-500/20">

      <div className="flex justify-between p-4 items-center">
        <p className="font-bold">Your Story</p>

        <div className="flex gap-3 items-center">
          {
            files.length >= 1 ?
            <button className='border border-gray-500/10  bg-orange-500 text-white/90 rounded  px-2 cursor-pointer font-bold' 
              onClick={create}
            >
              create
            </button> : ''
          }
          <button className='border bg-neutral-200 text-black rounded-md px-2 cursor-pointer font-bold' 
            onClick={upload} 
            >
              upload
          </button>
        </div>
      </div>

      <div className='border-b-[0.2px] border-gray-500/10'></div>

      <div className='mt-4'>
          {
            (files.length === 0) &&
            <div className='relative h-[100%] flex flex-col items-center gap-4 m-4'>
              <div>
                <img src="./image-gallery.png" alt="" />
              </div>
              <p>Drag or Drop images here</p>
            </div> 
          }
        {
          files && files.map((file)=>{
            return (<div className="flex items-center gap-2 mx-4 border-[0.2px] border-gray-500/10 rounded px-3 py-2 mt-2" key={file.imageId}>
              <img src={file.image} alt="" className="w-16 h-16 rounded" />
              <span className='flex-1'>{file.name}</span>

              <button id={file.imageId} 
                onClick={(event)=>{deleteFile(event.currentTarget.id);}} 
                > X
              </button>
            </div>)
          })
        }
      </div>
    </div>
 ) 
}