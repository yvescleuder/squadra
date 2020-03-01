import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Sistema} from './models/sistema';
import {catchError, map, retry} from 'rxjs/operators';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**
   * Criar um sistema, faz a requisição para a API enviando as informações em JSON
   *
   * @param sistema
   */
  createSistema(sistema: Sistema): Observable<Sistema> {
    return this.http.post<Sistema>(environment.api + 'store/', JSON.stringify(sistema), this.httpOptions);
  }

  /**
   * Faz uma pesquisa de um sistema, envia os para a API alguns parametros
   *
   * @param sistema
   */
  searchSistema(sistema) {
    // Variavel para manipular a query string
    let searchParams = new HttpParams();
    // Verifica se os parametros estão chegando para montar a query string.
    if (sistema.descricao) {
      searchParams = searchParams.append('descricao', sistema.descricao);
    }
    if (sistema.sigla) {
      searchParams = searchParams.append('sigla', sistema.sigla);
    }
    if (sistema.email) {
      searchParams = searchParams.append('email', sistema.email);
    }

    return this.http.get<Sistema>(environment.api,
      {
        params: searchParams
      })
      .pipe(
        map(responseData => {
          const sistemasArray: Sistema[] = [];
          for (const key in responseData) {
            sistemasArray.push(responseData[key]);
          }
          return sistemasArray;
        })
      );
  }
}
