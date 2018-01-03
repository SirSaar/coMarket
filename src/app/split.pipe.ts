import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {
  splited: any[][];     //2 dimensional array-it's matrix of ixj when i is rows and j is columns
  transform(input: any[], chunck: number): any[][] {
    this.splited=[];
    console.log("input:",input,"chunck:",chunck);
    let i=0;
    while(input.length){
      console.log("input.length:",input.length);
      if(input.length<chunck) {
        this.splited[i]=[];
        this.splited[i].push(input.splice(0,input.length));
        break;
      }
      this.splited[i]=[];
      this.splited[i].push(input.splice(0,chunck));
      i++;
    }
    console.log("splited:",this.splited);
    return this.splited;
  }

}
