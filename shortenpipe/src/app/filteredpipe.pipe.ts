import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure : false
})
export class FilteredpipePipe implements PipeTransform {

  transform(value: any, filteredstring : string, propname : string): any {
    if(value.length === 0)
    {
      return value;
    }
    const resultarray = [];
  
    for(const val of value)
    {
      if(val[propname] === filteredstring || filteredstring === '')
      {
        resultarray.push(val);
      }
    }
    return resultarray;
  }

}
