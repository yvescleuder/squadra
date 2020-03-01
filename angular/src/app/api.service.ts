import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Sistema} from './models/sistema';
import {catchError, map, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private api = 'http://localhost:8000/sistema/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**
   * Criar um sistema, faz a requisição para a API enviando as informações em JSON
   *
   * @param sistema
   */
  createSistema(sistema: Sistema): Observable<Sistema> {
    return this.http.post<Sistema>(this.api + 'store/', JSON.stringify(sistema), this.httpOptions);
  }

  /**
   * Faz uma pesquisa de um sistema, envia os para a API alguns parametros
   *
   * @param sistema
   */
  searchSistema(sistema) {
    let descricao = '';
    let sigla = '';
    let email = '';
    // Verifica se os parametros estão chegando para montar a query string.
    if (sistema.descricao) {
      descricao = '&descricao=' + sistema.descricao;
    }
    if (sistema.sigla) {
      sigla = '&sigla=' + sistema.sigla;
    }
    if (sistema.email) {
      email = '&email=' + sistema.email;
    }
    return this.http.get<Sistema>(this.api + '?' + descricao + sigla + email)
      .pipe(
        map(responseData => {
          const sistemasArray: Sistema[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              sistemasArray.push({ ...responseData[key], id: key });
            }
          }
          return sistemasArray;
        })
      );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.message;
    } else {
      // Erro na API
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }

    return throwError(errorMessage);
  }
}
