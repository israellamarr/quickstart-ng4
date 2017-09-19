import { Pipe, PipeTransform } from '@angular/core';
/*
 * convert unix timestamp to JS date
*/
@Pipe({name: 'timestampToDate'})
export class TimestampToDatePipe implements PipeTransform {

    transform(timestamp: number): Date {
        if (timestamp == 0) {
            return new Date();
        } else {
            return new Date(timestamp * 1000);
        }
    }

}
