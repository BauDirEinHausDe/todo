import {Category} from './Category';
import {Priority} from './Priority';

export class Todo{
  public done:boolean;

  constructor(
    public id?:string,
    public label?:string,
    public date?: Date,
    public category?: Category,
    public priority?:Priority
  ) {
    this.done=false;
  }
}
