import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Ejemplar} from "../Models/Ejemplar";
import {Categoria} from "../Models/Categoria";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Estudiante} from "../Models/Estudiante";

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent {

  @ViewChild('closeModal') _closeModal: any;
  regForm: FormGroup;
  estudiante: Estudiante;
  estudiantes: Estudiante[];
  globalUri: string = "";
  update = false;

  constructor(private _http: HttpClient, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getList();
    this.regForm = this.formBuilder.group(
      {
        id: [0],
        cedula: [0, Validators.required],
        nombres: ["", Validators.required],
        apellidos: ["", Validators.required],
        sexo: ["", Validators.required],
        fecha_nacimiento: ["", Validators.required],
        estado: [0, Validators.required]
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
    this.estudiante = {
      id: this.form["id"].value,
      cedula: this.form["cedula"].value,
      nombres: this.form["nombres"].value,
      apellidos: this.form["apellidos"].value,
      sexo: this.form["sexo"].value,
      fecha_nacimiento: this.form["fecha_nacimiento"].value,
      estado: this.form["estado"].value,
      dias_sancion: 0,
    }
    console.log(this.estudiante);
    this.saveChangesApi(this.estudiante).subscribe(response => {
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
    this.form["cedula"].setValue("")
    this.form["nombres"].setValue("")
    this.form["apellidos"].setValue("")
    this.form["sexo"].setValue("")
    this.form["fecha_nacimiento"].setValue("")
    this.form["estado"].setValue("D")
    this.update = false;
  }

  seleccionarItem(estudiante: Estudiante) {
    this.estudiante = estudiante;
    this.form["id"].setValue(estudiante.id);
    this.form["cedula"].setValue(estudiante.cedula);
    this.form["nombres"].setValue(estudiante.nombres);
    this.form["apellidos"].setValue(estudiante.apellidos);
    this.form["sexo"].setValue(estudiante.sexo);
    this.form["fecha_nacimiento"].setValue(estudiante.fecha_nacimiento);
    this.form["estado"].setValue(estudiante.estado);
    this.update = true;
  }

  eliminarItem(estudiante: Estudiante) {
    // @ts-ignore
    // @ts-ignore
    Swal.fire({
      title: 'Seguro de eliminar este registro (' + estudiante.nombres + ' ' + estudiante.apellidos +')?',
      text: "Esta accion no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result: any) => {
      if (result.isConfirmed) {
        // @ts-ignore
        this.estudiante = estudiante;
        this.eliminarApi(this.estudiante).subscribe(response => {
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
      this.estudiantes = response.data;
    });
  }

  getListsApi(): Observable<any> {
    this.globalUri = "http://localhost:8080/estudiante/get";
    return this._http.get<any>(this.globalUri, {});
  }

  saveChangesApi(estudiante: Estudiante): Observable<any> {
    let action = this.update ? "update" : "insert"
    this.globalUri = "http://localhost:8080/estudiante/" + action;
    console.log(this.globalUri);
    return this._http.post(this.globalUri, estudiante, {});
  }

  eliminarApi(estudiante: Estudiante): Observable<any> {
    this.globalUri = "http://localhost:8080/estudiante/delete";
    console.log(this.globalUri);
    return this._http.post(this.globalUri, estudiante, {});
  }

}
