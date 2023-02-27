import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ejemplar} from "../Models/Ejemplar";
import {Categoria} from "../Models/Categoria";

@Component({
  selector: 'app-ejemplar',
  templateUrl: './ejemplar.component.html',
  styleUrls: ['./ejemplar.component.css']
})
export class EjemplarComponent {

  @ViewChild('closeModal') _closeModal: any;
  regForm: FormGroup;
  ejemplar: Ejemplar;
  ejemplares: Ejemplar[];
  globalUri: string = "";
  update = false;

  categoria: Categoria;
  categorias: Categoria[];

  constructor(private _http: HttpClient, private formBuilder: FormBuilder) {
  }

  generateRandomString = (num: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result1 = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
      result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result1;
  }


  ngOnInit() {
    this.getCategorias();
    this.getList();
    this.regForm = this.formBuilder.group(
      {
        id: [0],
        id_categoria: [0, Validators.required],
        codigo: ["", Validators.required],
        editorial: ["", Validators.required],
        nombre: ["", Validators.required],
        autor: ["", Validators.required],
        anio_publicacion: [0, Validators.required],
        tipo: ["", Validators.required],
        estado: ["", Validators.required],
      }
    );
  }

  get form() {
    return this.regForm.controls;
  }

  guardarCambios() {
    console.log("guardarCambios()");

    console.log(this.regForm);

    if (this.regForm.invalid) {
      console.log("FORMULARIO INVALIDO");
      return;
    }
    this.ejemplar = {
      id: this.form["id"].value,
      id_categoria: this.form["id_categoria"].value,
      codigo: this.form["codigo"].value,
      editorial: this.form["editorial"].value,
      nombre: this.form["nombre"].value,
      autor: this.form["autor"].value,
      anio_publicacion: this.form["anio_publicacion"].value,
      tipo: this.form["tipo"].value,
      estado: this.form["estado"].value,
      nom_cat: ""
    }
    console.log(this.ejemplar);
    this.saveChangesApi(this.ejemplar).subscribe(response => {
      console.log(response);
      if (response.status === 2) {
        this._closeModal.nativeElement.click();
        this.getList();
        // @ts-ignore
        ohSnap('Oh Snap! I cannot process your card...', {color: 'red'});  // alert will have class 'alert-color'
      }
    });
  }

  nuevoItem() {
    this.form["id"].setValue(0)
    this.form["id_categoria"].setValue(0)
    this.form["codigo"].setValue(this.generateRandomString(5).trim())
    this.form["editorial"].setValue("")
    this.form["nombre"].setValue("")
    this.form["autor"].setValue("")
    this.form["anio_publicacion"].setValue(0)
    this.form["tipo"].setValue("")
    this.form["estado"].setValue("D")
    this.update = false;
  }

  seleccionarItem(ejemplar: Ejemplar) {
    this.ejemplar = ejemplar;
    this.form["id"].setValue(ejemplar.id);
    this.form["id_categoria"].setValue(ejemplar.id_categoria);
    this.form["codigo"].setValue(ejemplar.codigo);
    this.form["editorial"].setValue(ejemplar.editorial);
    this.form["nombre"].setValue(ejemplar.nombre);
    this.form["autor"].setValue(ejemplar.autor);
    this.form["anio_publicacion"].setValue(ejemplar.anio_publicacion);
    this.form["tipo"].setValue(ejemplar.tipo);
    this.form["estado"].setValue(ejemplar.estado);
    this.update = true;
  }

  eliminarItem(ejemplar: Ejemplar) {
    // @ts-ignore
    // @ts-ignore
    Swal.fire({
      title: 'Seguro de eliminar este registro (' + ejemplar.nombre + ')?',
      text: "Esta accion no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result: any) => {
      if (result.isConfirmed) {
        // @ts-ignore
        this.ejemplar = ejemplar;
        this.eliminarApi(this.ejemplar).subscribe(response => {
          console.log(response);
          if (response.status === 2) {
            this.getList();
            this._closeModal.nativeElement.click();
          }
        });
      }
    })
  }

  getList() {
    this.getListsApi().subscribe(response => {
      console.log(response);
      this.ejemplares = response.data;
    });
  }

  getListsApi(): Observable<any> {
    this.globalUri = "http://localhost:8080/ejemplar/get";
    return this._http.get<any>(this.globalUri, {});
  }

  saveChangesApi(ejemplar: Ejemplar): Observable<any> {
    let action = this.update ? "update" : "insert"
    this.globalUri = "http://localhost:8080/ejemplar/" + action;
    console.log(this.globalUri);
    return this._http.post(this.globalUri, ejemplar, {});
  }

  eliminarApi(ejemplar: Ejemplar): Observable<any> {
    this.globalUri = "http://localhost:8080/ejemplar/delete";
    console.log(this.globalUri);
    return this._http.post(this.globalUri, ejemplar, {});
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
}
