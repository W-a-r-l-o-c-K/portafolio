import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina-interfaces';
import { InfoPagina2 } from '../interfaces/info-pagina2-interfaces';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;

  equipo: any[] = [];

  constructor(private http: HttpClient) {

    this.cargarInfo();

    this.cargarEquipo();

    // console.log('Servicio de InfoPagina listo.');

    // Leer archivo JSON:
    // this.http.get('assets/data/data-pagina.json').subscribe((resp: InfoPagina) => {
    //   this.cargada = true;
    //   this.info = resp;
    // } ,error => {
    //   console.log(error);
    // });

   }

   private cargarInfo() {

    this.http.get('assets/data/data-pagina.json').subscribe((resp: InfoPagina) => {
      this.cargada = true;
      this.info = resp;
    } ,error => {
      console.log(error);
    });
   }

   private cargarEquipo() {
     this.http.get("https://angular-html-4a7fd-default-rtdb.europe-west1.firebasedatabase.app/equipo.json").subscribe((data: any) => {

      this.equipo =data;
      console.log(this.equipo);
    },error => {
      console.log(error);
    })
   }
}
