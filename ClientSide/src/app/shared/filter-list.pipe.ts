import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterList'
})
export class FilterListPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        //value - the list
        //args - the searched text
        debugger;
        if (!args)
            return value;
        if (value[0].guideName)
            return value.filter(
                item => item.guideName.toLowerCase().includes(args.toLowerCase()));
        // if (value[0].languages)
        //     return value.filter(
        //         item => item.languages.toLowerCase().includes(args.toLowerCase()));
        else
            return value.filter(
                item => item.attractionName.toLowerCase().includes(args.toLowerCase()));
    }
}