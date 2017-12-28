import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {
  splited: any;
  transform(input: any, chunck: number): any {
    this.splited=[];
    while(input.length){
      this.splited.concat(input.splice(0,chunck));
    }
    return this.splited;
  }

}
