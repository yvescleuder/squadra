import { Component, OnInit } from '@angular/core';
import {Sistema} from "../../models/sistema";
import {ApiService} from "../../api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-search-sistema',
  templateUrl: './search-sistema.component.html',
  styleUrls: ['./search-sistema.component.css']
})
export class SearchSistemaComponent implements OnInit {
  // Variável global do sistema
  sistemas = {} as Sistema;
  loadedSistemas: Sistema[] = [];
  error = null;

  /**
   * Instancia a ApiService para ser utilizada
   *
   * @param apiService
   * @param router
   */
  constructor(
    public apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  /**
   * Faz a requisição para buscar um sistema
   *
   * @param form
   */
  searchSistema(form: NgForm) {
    // Uma nova requisição tem que retirar a mensagem de erro
    this.error = null;
    this.apiService.searchSistema(this.sistemas).subscribe(sistemas => {
      this.loadedSistemas = sistemas;
    }, error => {
      // Limpa os resultados a cada nova pesquisa
      this.loadedSistemas = [];
      this.error = error.error;
    });
  }

  /**
   * Limpa todos os campos do formulário e a buscar ja realizada
   *
   * @param form
   */
  clearSistemas(form: NgForm) {
    form.resetForm();
    this.loadedSistemas = [];
  }

}
