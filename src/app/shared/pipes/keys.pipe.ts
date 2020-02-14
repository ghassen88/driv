import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys',
  pure: false
})
export class KeysPipe implements PipeTransform {
  transform(value) : any {
    let keys = [];
    for (var enumValue in value) {
        keys.push({key: enumValue, value: value[enumValue]});
    }
    return keys;
  }
}
@Pipe({
    name: 'key',
    pure: true
  })
export class KeyPipe implements PipeTransform {
    transform(value,enums) : any {           
        return enums[value];
    }
}
