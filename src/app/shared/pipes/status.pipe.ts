import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'actifPipe'
})

export class ActifPipe implements PipeTransform {
    transform(value: boolean): string {
        if(value)
            return "actif";
            else return "inactif"
    }
}
@Pipe({
    name: 'disablePipe'
})

export class DisablePipe implements PipeTransform {
    transform(value: boolean): string {
        if(value)
            return "Disable";
            else return "Enable"
    }
}