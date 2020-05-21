import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

      this.subscription = this.regresaObservable()
      .subscribe(
        data => console.log('Subs', data),
        error => console.log('Error en el obs', error),
        () => console.log('El observador terminó')
      );
  }
  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log ('La pagina se va a cerrar');
  }

  regresaObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;
      const intervalo = setInterval( () => {

        contador ++;

        const salida = {
          valor:  contador
        };

        observer.next( salida );

        // if ( contador === 3) {
        //   clearInterval( intervalo );
        //   observer.complete();
        // }
        // if ( contador === 2) {
        //   observer.error('Auxilio!');
        //   // clearInterval( intervalo );

        // }
      }, 1000);


    } ).pipe(
      map( resp => {
        return resp.valor;
      }),
      filter( (valor, index) => {
        if ( ( valor % 2) === 1 ) {
          // impar
          return true;
        } else {
          return false;
        }
        
      })
      );

  }

}
