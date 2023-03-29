import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css'],
  template: `
    <h2>Llista de fitxers i carpetes:</h2>
    <ul>
      <li *ngFor="let arxiu of arxius">{{ arxiu }}</li>
    </ul>
  `
})
export class FilesListComponent {
  arxius: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const url = 'http://localhost:3000/files';
    this.http.get<string[]>(url).subscribe(
      arxius => {
        this.arxius = arxius;
      },
      error => {
        console.error(error);
      }
    );
  }
}
