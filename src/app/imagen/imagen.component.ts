import { Component , OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-imagen',
  styleUrls: ['./imagen.component.css'],
  template:`
    <div>
      <h2>{{ imagenNombre }}</h2>
      <img [src]="imagenUrl" alt="Imagen">
    </div>
  `

})
export class ImagenComponent implements OnInit{

  imagenNombre: string;
  imagenUrl: string;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // URL del servidor Node.js
    const serverUrl = 'http://localhost:3000';

    // URL de la imagen a obtener
    const imagenUrl = `${serverUrl}/imatge.jpg`;

    // Petición HTTP GET para obtener la imagen
    this.http.get(imagenUrl, { responseType: 'blob' }).subscribe((blob: Blob) => {
      this.imagenNombre = 'imatge.jpg';
      this.imagenUrl = URL.createObjectURL(blob);
    });
  }
}
