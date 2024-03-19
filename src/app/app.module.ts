import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Shared/login/login.component';
import { SingUpComponent } from './Shared/sing-up/sing-up.component';
import { HomePageComponent } from './Shared/home-page/home-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserIndexComponent } from './Modules/user-index/user-index.component';
import { HttpClientModule } from '@angular/common/http';
import { PrincipalComponent } from './Modules/principal/principal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { PerfilComponent } from './Modules/perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SingUpComponent,
    HomePageComponent,
    UserIndexComponent,
    PrincipalComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
