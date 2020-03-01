import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchSistemaComponent } from './components/search-sistema/search-sistema.component';
import { CreateSistemaComponent } from './components/create-sistema/create-sistema.component';
import {ApiService} from "./api.service";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    SearchSistemaComponent,
    CreateSistemaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
