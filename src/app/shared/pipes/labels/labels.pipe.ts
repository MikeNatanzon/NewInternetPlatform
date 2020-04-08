import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labels'
})
export class LabelsPipe implements PipeTransform {

  transform(value: string, funcionality: string, language: string, file: object): string {
    return this.getlabel(value, funcionality, language, file) ||
      this.getlabel(value, funcionality, 'EN', file) || // Default English
      '';
  }

  getlabel(value: string, funcionality: string, language: string, file: object): string {
    if (file &&
      file[language] &&
      file[language][funcionality] &&
      file[language][funcionality] &&
      file[language][funcionality][value]) {
      return file[language][funcionality][value];
    }
    return null;
  }

}
