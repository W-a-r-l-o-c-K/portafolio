import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando: boolean = true;

  productos: Producto[] = [];

  productoFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {

    this.cargarProductos();
   }

   private cargarProductos() {

    return new Promise<void>( (resolve, reject) => {
      this.http.get('https://angular-html-4a7fd-default-rtdb.europe-west1.firebasedatabase.app/productos_idx.json')
        .subscribe( (resp: any) => {
        this.productos = resp;
        // console.log(this.productos);
        // setTimeout(() => {
          this.cargando = false;
        // }, 500);
        resolve();
    });
    })


    }

    getProducto( id:string ) {

      return this.http.get(`https://angular-html-4a7fd-default-rtdb.europe-west1.firebasedatabase.app/productos/${ id }.json`);
    }

    buscarProducto (termino: string) {

      if( this.productos.length === 0 ) {
        // cargar productos
        this.cargarProductos().then( ()=> {
          //callback, se ejecuta después de tener los productos
          // aplicar filtros
          this.filtrarProductos( termino );
        });
      }else {
        // aplicar el filtro
        this.filtrarProductos( termino );
      }


    }

    private filtrarProductos( termino: string ) {

      //vaciamos el array

      this.productoFiltrado = [];

      termino = termino.toLocaleLowerCase();

      // Una manera de filtrar la búsqueda:
      // this.productoFiltrado = this.productos.filter( producto => {
      //   return true;
      // });

      //Otra manera:
      this.productos.forEach( prod => {

        const tituloLower = prod.titulo.toLocaleLowerCase();

        if( prod.categoria.indexOf( termino) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
          this.productoFiltrado.push( prod );
        }
      });


    }
}
