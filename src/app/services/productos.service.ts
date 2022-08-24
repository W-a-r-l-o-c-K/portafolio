import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando: boolean = true;

  productos: Producto[] = [];

  constructor(private http: HttpClient) {

    this.cargarProductos();
   }

   private cargarProductos() {

    this.http.get('https://angular-html-4a7fd-default-rtdb.europe-west1.firebasedatabase.app/productos_idx.json')
    .subscribe( (resp: any) => {

      this.productos = resp;

      console.log(this.productos);

      setTimeout(() => {
        this.cargando = false;
      }, 500);

    });
    }
}
