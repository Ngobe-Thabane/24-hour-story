export default class Story{
  
  #id;
  #storyContent = [];
  #profileImage;
  #millisecondsIn24Hours = 24 *60*60*1000;
  
  constructor(){
    this.#id = this.#createId();
  }
  
  getStory(){    
    const timestamp = new Date().getTime();

    return {
      id: this.#id,
      profileImage: this.#profileImage,
      storyContent : this.#storyContent,
      timestamp : timestamp,
      expirationTime: timestamp + this.#millisecondsIn24Hours,
    }
  }

  getStoryContent(){
    return [...this.#storyContent];
  }

  addStoryContent(content){
    content.imageId = this.#createId();
    this.#storyContent.push(content);

    if(this.#storyContent.length == 1){
      this.#profileImage = content.image;
    }

  }
  
  removeStory(id){
    const content = this.#storyContent.findIndex((content)=>{ 
      return content.imageId === id;
    })
    this.#storyContent.splice(content, 1);
  }

  #createId(){
    return `${new Date().getTime()}-${Math.random().toString(36).substring(2, 10)}`;
  }
}