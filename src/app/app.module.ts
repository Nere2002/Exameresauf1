import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ImagenComponent } from './imagen/imagen.component';
import {HttpClientModule} from "@angular/common/http";
import { ArchivoComponent } from './archivo/archivo.component';
import { FilesListComponent } from './files-list/files-list.component';



@NgModule({
  declarations: [
    AppComponent,
    ImagenComponent,
    ArchivoComponent,
    FilesListComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
