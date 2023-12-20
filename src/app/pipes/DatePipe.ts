import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateFormat',
    standalone: true
})
export class DatePipe implements PipeTransform {
    transform(value: Date = new Date()): string {
        return value.toLocaleDateString('de');
        /*
            Old code to format date
            let myString = value.toString();
            if(myString.includes("T")) {
                const splitter = myString.split("T");
                myString = splitter[0] + " " + splitter[1];
            }

            if(myString.includes(".")) {
                const splitter = myString.split(".");
                myString = splitter[0];
            }
            return myString;
        */
    }
}
