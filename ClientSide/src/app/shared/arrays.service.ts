import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArraysService {

  constructor() { }


  addStringToArray(value: string, list: string[]) {
    if (list.length == 0 || list.indexOf(value) == -1)
      list.push(value);
    else {
      const index = list.indexOf(value, 0);
      if (index > -1) {
        list.splice(index, 1);
      }
    }
    console.log(list);
  }
}
