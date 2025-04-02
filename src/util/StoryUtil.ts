export interface Content{
  name:string,
  image: string,
  imageId : string
}

export default class Story{

  private storyId:string;
  private storyContent:Array<Content> = [];
  private millisecondsIn24Hours:number = 24 *60*60*1000;
  
  constructor(){
    this.storyId = this.generateID();
  }

  private generateID():string {

    const timeStamp:number = new Date().getTime();
    const  hash:string = Math.random().toString(36).substring(2, 10);

    return `${timeStamp}-${hash}`;
  }

  public addStoryContent(content:Content):void {
    content.imageId = this.generateID();
    this.storyContent = [...this.storyContent, content];
  }

  public removeStoryContent(id:string){
    
    this.storyContent = this.storyContent.filter(content =>{
      return content.imageId !== id;
    });
  }

  public getStoryContent(): Array<Content>{
    return this.storyContent;
  }

  public getStory(){

    return {
      timeStamp : new Date().getTime(),
      storyId : this.storyId,
      storyContent : JSON.stringify(this.storyContent),
      storyExpirytime : new Date().getTime()+ this.millisecondsIn24Hours,
    }
  }
}