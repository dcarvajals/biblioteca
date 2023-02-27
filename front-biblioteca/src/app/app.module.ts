import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EjemplarComponent } from './ejemplar/ejemplar.component';
import { MenuComponent } from './menu/menu.component';
import { CategoriaComponent } from './categoria/categoria.component';
import {ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { ConsultasComponent } from './consultas/consultas.component';

@NgModule({
  declarations: [
    AppComponent,
    EjemplarComponent,
    MenuComponent,
    CategoriaComponent,
    EstudianteComponent,
    PrestamosComponent,
    ConsultasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
