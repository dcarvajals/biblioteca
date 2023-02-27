export interface Prestamo {
  id: number,
  id_estudiante: number,
  cedula: string,
  id_ejemplar: number,
  codigo: string,
  fecha_prestamo: string,
  fecha_entrega: string,
  fecha_devolucion: string,
  estado: string
}
