import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  pure:true
})
export class TimePipe implements PipeTransform {

  transform(value: any): string {
    let val = parseInt(value,10);
    let res = '';
    if(val%60 <10)
      res = res + '0' +Math.floor(val%60) + 's';
      else
      res = res + '' + Math.floor(val%60) + 's';
    val = val / 60;
    if(Math.floor(val%60) >0){
    if(val%60 < 10)
      res = '0' + Math.floor(val%60) + 'm:' + res;
      else  
      res = '' + Math.floor(val%60) + 'm:' + res;
    }
    val = val / 60;
    if(Math.floor(val%24) > 0){
    if(val%24 <10)
      res = '0' + Math.floor(val%24) + 'h:' + res;
      else 
      res = '' + Math.floor(val%24) + 'h:' + res;
    }
    val = val / 24;
    if(Math.floor(val) > 0)
    res = Math.floor(val) + 'd:' + res;  
    return res;
  }

}
@Pipe({
  name: 'isDay'
})
export class IsDayPipe implements PipeTransform {
  transform(value: boolean): string{
    if(value == true)
      return 'Day';
      else
      return 'Night'
  }
}
