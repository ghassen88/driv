import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance',
  pure:true
})
export class DistancePipe implements PipeTransform {

  transform(value: any): string {
    let val = parseInt(value,10);
    return (val / 1000).toFixed(1);
  }

}
