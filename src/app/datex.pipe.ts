import * as moment from 'moment';
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'datex'
})

export class DatexPipe implements PipeTransform {
    transform(value: any, format: string = ""): string {
        // Try and parse the passed value.
        var momentDate = moment(value);

        // If moment didn't understand the value, return it unformatted.
        if (!momentDate.isValid()) return value;

        // Otherwise, return the date formatted as requested.
        return momentDate.format(format);
    }
}
