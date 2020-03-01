import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateSistemaComponent} from "./components/create-sistema/create-sistema.component";
import {SearchSistemaComponent} from "./components/search-sistema/search-sistema.component";


const routes: Routes = [
  { path: 'sistema', component: SearchSistemaComponent },
  { path: 'sistema/create', component: CreateSistemaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
