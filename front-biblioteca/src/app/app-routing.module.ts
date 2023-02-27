import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EjemplarComponent } from './ejemplar/ejemplar.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { ConsultasComponent } from './consultas/consultas.component';

const routes: Routes = [
  {path: "ejemplar", component: EjemplarComponent},
  {path: "categoria", component: CategoriaComponent},
  {path: "estudiante", component: EstudianteComponent},
  {path: "prestamos", component: PrestamosComponent},
  {path: "consultas", component: ConsultasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
