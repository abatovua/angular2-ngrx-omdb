import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poster'
})
export class PosterPipe implements PipeTransform {
  noImage = 'https://subterraneanpress.com/uploads/nocover.jpg';
  transform(value: string): string {
    return value === 'N/A' ? this.noImage : value;
  }

}
