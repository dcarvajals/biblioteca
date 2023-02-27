import {Component, ViewChild} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Estudiante} from "../Models/Estudiante";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Prestamo} from "../Models/Prestamo";
import {Ejemplar} from "../Models/Ejemplar";

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent {

  @ViewChild('closeModal') _closeModal: any;
  @ViewChild('closeModalx')_closeModalx: any;
  regForm: FormGroup;
  regFormDev: FormGroup;
  prestamo: Prestamo;
  prestamos: Prestamo[];
  globalUri: string = "";
  update = false;

  estudiante: Estudiante;
  estudiantes: Estudiante[];

  ejemplar: Ejemplar;
  ejemplares: Ejemplar[];

  constructor(private _http: HttpClient, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getList();
    this.getListEstudiante();
    this.getListEjemplares();
    this.prestamo = {
      id: 0,
      id_ejemplar: 0,
      codigo: "",
      id_estudiante: 0,
      cedula: "",
      fecha_prestamo: "",
      fecha_entrega: "",
      fecha_devolucion: "",
      estado: "",
    }
    this.regForm = this.formBuilder.group(
      {
        id: [0],
        id_estudiante: [0, Validators.required],
        cedula: [""],
        id_ejemplar: [0, Validators.required],
        codigo: [""],
        fecha_prestamo: ["", Validators.required],
        fecha_entrega: ["", Validators.required],
        fecha_devolucion: [""],
        estado: [""]
      }
    );
    this.regFormDev = this.formBuilder.group({
      fecha_devolucion: ["", Validators.required]
    });
  }

  get form() {
    return this.regForm.controls;
  }

  get formdev() {
    return this.regFormDev.controls;
  }

  guardarCambios() {
    console.log("guardarCambios()");

    console.log(this.regForm);

    if (this.regForm.invalid) {
      console.log("FORMULARIO INVALIDO");
      return;
    }
    this.prestamo = {
      id: this.form["id"].value,
      id_ejemplar: this.form["id_ejemplar"].value,
      codigo: "",
      id_estudiante: this.form["id_estudiante"].value,
      cedula: "",
      fecha_prestamo: this.form["fecha_prestamo"].value,
      fecha_entrega: this.form["fecha_entrega"].value,
      fecha_devolucion: this.form["fecha_devolucion"].value,
      estado: this.form["estado"].value,
    }
    console.log(this.prestamo);
    this.saveChangesApi(this.prestamo).subscribe(response => {
      console.log(response);
      if (response.status === 2) {
        this._closeModal.nativeElement.click();
        this.getList();
        this.getListEjemplares();
        alert(response.information);
      }
    });
  }

  nuevoItem() {
    this.form["id"].setValue(0)
    this.form["id_estudiante"].setValue(0);
    this.form["id_ejemplar"].setValue(0)
    this.form["codigo"].setValue("")
    this.form["cedula"].setValue("")
    this.form["fecha_prestamo"].setValue("")
    this.form["fecha_entrega"].setValue("")
    this.form["fecha_devolucion"].setValue(null)
    this.form["estado"].setValue("P")
    this.update = false;
  }

  seleccionarItem(prestamo: Prestamo) {
    this.prestamo = prestamo;
    this.form["id"].setValue(prestamo.id);
    this.form["id_estudiante"].setValue(prestamo.id_estudiante);
    this.form["cedula"].setValue(prestamo.cedula);
    this.form["id_ejemplar"].setValue(prestamo.id_ejemplar);
    this.form["codigo"].setValue(prestamo.codigo);
    this.form["fecha_prestamo"].setValue(prestamo.fecha_prestamo);
    this.form["fecha_entrega"].setValue(prestamo.fecha_entrega);
    this.form["fecha_devolucion"].setValue(prestamo.fecha_devolucion);
    this.form["estado"].setValue(prestamo.estado);
    this.update = true;
  }

  eliminarItem(prestamo: Prestamo) {
    // @ts-ignore
    // @ts-ignore
    Swal.fire({
      title: 'Seguro de eliminar este registro (' + prestamo.cedula + ' ' + prestamo.codigo +')?',
      text: "Esta accion no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result: any) => {
      if (result.isConfirmed) {
        // @ts-ignore
        this.prestamo = prestamo;
        this.eliminarApi(this.prestamo).subscribe(response => {
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
      this.prestamos = response.data;
    });
  }

  getListsApi(): Observable<any> {
    this.globalUri = "http://localhost:8080/prestamo/get";
    return this._http.get<any>(this.globalUri, {});
  }

  saveChangesApi(prestamo: Prestamo): Observable<any> {
    let action = this.update ? "update" : "insert"
    this.globalUri = "http://localhost:8080/prestamo/" + action;
    console.log(this.globalUri);
    return this._http.post(this.globalUri, prestamo, {});
  }

  selectedPrestamo (item: Prestamo) {
    this.prestamo = item;
    console.log(this.prestamo);
  }

  guardarDev () {
    this.prestamo.fecha_devolucion = this.formdev["fecha_devolucion"].value;
    console.log(this.prestamo)
    this.guardarDevApi(this.prestamo).subscribe(response => {
      console.log(response);
      this._closeModalx.nativeElement.click();
      this.getList();
      this.getListEjemplares();
    })
  }


  guardarDevApi(prestamo: Prestamo): Observable<any> {
    this.globalUri = "http://localhost:8080/prestamo/devolucion";
    return this._http.post(this.globalUri, prestamo, {});
  }

  eliminarApi(prestamo: Prestamo): Observable<any> {
    this.globalUri = "http://localhost:8080/estudiante/delete";
    console.log(this.globalUri);
    return this._http.post(this.globalUri, prestamo, {});
  }

  getListEstudiante() {
    this.getListsEstudiantesApi().subscribe(response => {
      console.log(response);
      this.estudiantes = response.data;
    });
  }

  getListsEstudiantesApi(): Observable<any> {
    this.globalUri = "http://localhost:8080/estudiante/get";
    return this._http.get<any>(this.globalUri, {});
  }

  getListEjemplares() {
    this.getListsEjemplareesApi().subscribe(response => {
      console.log(response);
      this.ejemplares = response.data;
    });
  }

  getListsEjemplareesApi(): Observable<any> {
    this.globalUri = "http://localhost:8080/ejemplar/get";
    return this._http.get<any>(this.globalUri, {});
  }

}
