import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-archivo',
  styleUrls: ['./archivo.component.css'],
  template: `
    <input type="file" (change)="onFileSelected($event)">
    <button (click)="uploadFile()">Subir archivo</button>
  `
})
export class ArchivoComponent {
  file: File | null = null;
  constructor(private http: HttpClient) { }

  onFileSelected($event: Event) {
    // @ts-ignore
    this.file = event.target.files[0];
  }

  uploadFile() {
    if (!this.file) {
      console.log('No se ha seleccionado ningún archivo');
      return;
    }
    const formData = new FormData();
    formData.append('file', this.file);

    this.http.post('http://localhost:3000/upload', formData)
      .subscribe(
        () => console.log('Archivo subido al servidor'),
        error => console.error(error)
      );
  }
}
