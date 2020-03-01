import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../api.service";
import {Sistema} from "../../models/sistema";
import Swal from "sweetalert2";

@Component({
  selector: 'app-create-sistema',
  templateUrl: './create-sistema.component.html',
  styleUrls: ['./create-sistema.component.css']
})
export class CreateSistemaComponent implements OnInit {
  // Variável global do sistema
  sistema = {} as Sistema;
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
   * Faz a requisição para cadastrar um sistema
   *
   * @param form
   */
  createSistema(form: NgForm) {
    // Uma nova requisição tem que retirar a mensagem de erro
    this.error = null;
    this.apiService.createSistema(this.sistema).subscribe((result) => {
      Swal.fire({
        text: result,
        icon: 'success'
      }).then((result) => {
          // Redireciona o usuário para a tela de pesquisar.
          this.router.navigate(['/sistema']);
      });
    }, error => {
      this.error = error.error;
    });
  }

  /**
   * Limpa todos os campos de um formulário
   *
   * @param form
   */
  cleanForm(form: NgForm) {
    form.resetForm();
  }
}
