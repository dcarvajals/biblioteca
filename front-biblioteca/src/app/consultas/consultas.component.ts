import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit{

  globalUri:string = "";
  cantidadLibros: [];
  cantidadRevistas: [];
  porcentajes: [];
  prestamosPorGenero: [];
  cantLibros : string;
  cantRevistas: string;
  estudiantesSancionados: string;

  constructor(private _http: HttpClient, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.prestamosRealizadosLRApi({tipo: 'L'}).subscribe(response => {
      this.cantidadLibros = response.data;
      // @ts-ignore
      this.cantLibros = this.cantidadLibros[0].cantidad_prestamos;
      console.log(this.cantidadLibros);
    });

    this.prestamosRealizadosLRApi({tipo: 'R'}).subscribe(response => {
      this.cantidadRevistas = response.data;
      // @ts-ignore
      this.cantRevistas = this.cantidadRevistas[0].cantidad_prestamos;
      console.log(this.cantidadRevistas);
    });

    this.getPorcentajesPorCategoria ().subscribe(response => {
      console.log(response);
      this.porcentajes = response.data;
    });

    this.getestudiantesSancionados().subscribe(response => {
      console.log(response);
      this.estudiantesSancionados = response.data[0]["count"];
    });
    this.geprestamosPorGenero().subscribe(response => {
      this.prestamosPorGenero = response.data;
      console.log(response);
    });
  }


  prestamosRealizadosLRApi(json: {}): Observable<any> {
    this.globalUri = "http://localhost:8080/prestamo/prestamosRealizadosLR";
    return this._http.post(this.globalUri, json, {});
  }

  getPorcentajesPorCategoria(): Observable<any> {
    this.globalUri = "http://localhost:8080/prestamo/porcentajesPorCategoria";
    return this._http.get<any>(this.globalUri, {});
  }

  // estudiantesSancionados
  getestudiantesSancionados(): Observable<any> {
    this.globalUri = "http://localhost:8080/prestamo/estudiantesSancionados";
    return this._http.get<any>(this.globalUri, {});
  }

  //prestamosPorGenero
  geprestamosPorGenero(): Observable<any> {
    this.globalUri = "http://localhost:8080/prestamo/prestamosPorGenero";
    return this._http.get<any>(this.globalUri, {});
  }
}
