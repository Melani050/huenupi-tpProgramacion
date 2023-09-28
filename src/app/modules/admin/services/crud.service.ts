import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';//mapea valores - similar a la funcion de un arreglo

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private productosCollection: AngularFirestoreCollection<Producto>

  constructor(private database: AngularFirestore) {
    this.productosCollection = database.collection('productos')
  }
  // CRUD -> PRODUCTOS
  crearProducto(producto: Producto){
    return new Promise(async(resolve,reject)=> {
      try{
        // creamos constante para que guarde un nuevo ID
        const idProducto = this.database.createId();

        // se lo asignamos al atributo ID de la interfaz producto
        producto.idProducto = idProducto;

        const resultado = await this.productosCollection.doc(idProducto).set(producto)

        resolve(resultado);
      }catch(error){
        reject(error);
      }
    })
  }

  obtenerProducto(){
    /**snapshotsChange = funciona como una captura del estado de los datos, como una captura de pantalla y luego pasa por el pipe
      pipe = funciona como una tuberia, retorna el nuevo arreglo
      map = "mapea" o recorre esa nueva información
      a = resguarda la nueva información y la envía*/
    return this.productosCollection.snapshotChanges().
    pipe(map(action => action.map(a =>a.payload.doc.data())));
  }
}