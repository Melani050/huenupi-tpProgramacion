import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  coleccionProductos: Producto[] = [];// creamos coleccion basada en interfaz Producto

  productoSeleccionado!: Producto;// != recibir valores vacios

  modalVisibleProducto: boolean = false;

  // FORMULARIO DEL HTML
  producto = new FormGroup({
    nombre: new FormControl('',Validators.required),
    imagen: new FormControl('',Validators.required),
    alt: new FormControl('',Validators.required),
    descripcion: new FormControl('',Validators.required),
    precio: new FormControl(0,Validators.required),
    categoria: new FormControl('',Validators.required)
  });

  constructor(public servicioCrud: CrudService){}//planteamos servicio de forma local

  ngOnInit(): void{
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      this.coleccionProductos = producto;
    })
  }

  // FUNCIONA COMO UN METODO DE VALIDACIÓN 
  async agregarProducto(){

    if (this.producto.valid) {
      let nuevoProducto: Producto = {
        idProducto: '',
        nombre: this.producto.value.nombre!,
        imagen: this.producto.value.imagen!,
        alt: this.producto.value.alt!,
        descripcion: this.producto.value.descripcion!,
        precio: this.producto.value.precio!,
        categoria: this.producto.value.categoria!
      };
      
      // esta enviando el nuevo producto a la funcion crearProducto
      // llamamos al servicioCrud; funcion crearProducto; seteamos nuevoProducto  
      await this.servicioCrud.crearProducto(nuevoProducto)
      .then(producto => {
        alert("Ha agregado un nuevo producto con éxito");
      })

      .catch(error => {
        alert("Hubo un error al cargar el producto \n"+error);
      })
    }
  }
}
 