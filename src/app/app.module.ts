import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Shared/login/login.component';
import { SingUpComponent } from './Shared/sing-up/sing-up.component';
import { HomePageComponent } from './Shared/home-page/home-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PrincipalComponent } from './Modules/User/principal/principal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { PerfilComponent } from './Modules/User/perfil/perfil.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { RankingComponent } from './Modules/User/ranking/ranking.component';
import { RecuperarPasswordComponent } from './Shared/recuperar-password/recuperar-password.component';
import { ConfirmarPasswordComponent } from './Shared/confirmar-password/confirmar-password.component';
import { PreguntaComponent } from './Modules/User/pregunta/pregunta.component';
import { IndexAdminComponent } from './Modules/Admin/index-admin/index-admin.component';
import { EvaluacionesComponent } from './Modules/Admin/evaluaciones/evaluaciones.component';
import { AgregarEvaluacionesComponent } from './Modules/Admin/agregar-evaluaciones/agregar-evaluaciones.component';
import { UsuariosComponent } from './Modules/Admin/usuarios/usuarios.component';
import { LenguajesComponent } from './Modules/Admin/lenguajes/lenguajes.component';
import { ManualComponent } from './Modules/User/manual/manual.component';
import { TokenInterceptor } from './Core/token.interceptor';
import { UserBaseComponent } from './Modules/User/user-base/user-base.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SingUpComponent,
    HomePageComponent,
    PrincipalComponent,
    PerfilComponent,
    FooterComponent,
    RankingComponent,
    RecuperarPasswordComponent,
    ConfirmarPasswordComponent,
    PreguntaComponent,
    IndexAdminComponent,
    EvaluacionesComponent,
    AgregarEvaluacionesComponent,
    UsuariosComponent,
    LenguajesComponent,
    ManualComponent,
    UserBaseComponent,
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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
