import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Categoria} from "../Models/Categoria";

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit{

  @ViewChild('closeModal') _closeModal: any;
  regFormCategoria: FormGroup;
  categoria: Categoria;
  categorias: Categoria[];
  globalUri: string = "";
  updateCategoria = false;

  constructor(private _http: HttpClient, private formBuilder: FormBuilder) {
  }


  ngOnInit() {
    this.getCategorias();
    this.regFormCategoria = this.formBuilder.group(
      {
        id: [0],
        nombre: ["", Validators.required]
      }
    );
  }

  get form() {
    return this.regFormCategoria.controls;
  }

  guardarCategoria() {
    console.log("sguardarCategoria() ");
    if (this.regFormCategoria.invalid) {
      console.log("FORMULARIO INVALIDO");
      return;
    }
    this.categoria = {
      id: this.form["id"].value,
      nombre: this.form["nombre"].value
    }
    console.log(this.categoria);
    this.saveChangesCategoriaApi(this.categoria).subscribe(response => {
      console.log(response);
      if(response.status === 2) {
        this._closeModal.nativeElement.click();
        this.getCategorias();
        // @ts-ignore
        ohSnap('Oh Snap! I cannot process your card...', {color: 'red'});  // alert will have class 'alert-color'
      }
    });
  }

  nuevoItem () {
    this.form["id"].setValue(0);
    this.form["nombre"].setValue("");
    this.updateCategoria = false;
  }

  seleccionarItem(categoria: Categoria) {
    this.categoria = categoria;
    this.form["id"].setValue(categoria.id);
    this.form["nombre"].setValue(categoria.nombre);
    this.updateCategoria = true;
  }

  eliminarItem (categoria: Categoria) {
    // @ts-ignore
    // @ts-ignore
    Swal.fire({
      title: 'Seguro de eliminar este registro ('+categoria.nombre+')?',
      text: "Esta accion no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result: any) => {
      if (result.isConfirmed) {
        // @ts-ignore
        this.categoria = categoria;
        this.eliminarApi(this.categoria).subscribe(response => {
          console.log(response);
          if(response.status === 2){
            this.getCategorias();
            this._closeModal.nativeElement.click();
          }
        });
      }
    })
  }

  getCategorias() {
    this.getCategoriasApi().subscribe(response => {
      console.log(response);
      this.categorias = response.data;
    });
  }

  getCategoriasApi(): Observable<any> {
    this.globalUri = "http://localhost:8080/categoria/get";
    return this._http.get<any>(this.globalUri, {});
  }

  saveChangesCategoriaApi(categoria: Categoria): Observable<any> {
    let action = this.updateCategoria ? "update" : "insert"
    this.globalUri = "http://localhost:8080/categoria/" + action;
    console.log(this.globalUri);
    return this._http.post(this.globalUri,categoria, {});
  }

  eliminarApi (categoria: Categoria): Observable<any> {
    this.globalUri = "http://localhost:8080/categoria/delete";
    console.log(this.globalUri);
    return this._http.post(this.globalUri,categoria, {});
  }

}
