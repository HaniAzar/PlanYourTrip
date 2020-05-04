import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBylanguage'
})
export class FilterBylanguagePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    //value - the list
    //args - the searched text
    if (!args)
      return value;
    else
      return value.filter(
        item => item.languages.toLowerCase().includes(args.toLowerCase()));
  }

}

