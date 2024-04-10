import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Shared/login/login.component';
import { SingUpComponent } from './Shared/sing-up/sing-up.component';
import { HomePageComponent } from './Shared/home-page/home-page.component';
import { PrincipalComponent } from './Modules/User/principal/principal.component';
import { PerfilComponent } from './Modules/User/perfil/perfil.component';
import { RankingComponent } from './Modules/User/ranking/ranking.component';
import { RecuperarPasswordComponent } from './Shared/recuperar-password/recuperar-password.component';
import { ConfirmarPasswordComponent } from './Shared/confirmar-password/confirmar-password.component';
import { IndexAdminComponent } from './Modules/Admin/index-admin/index-admin.component';
import { EvaluacionesComponent } from './Modules/Admin/evaluaciones/evaluaciones.component';
import { AgregarEvaluacionesComponent } from './Modules/Admin/agregar-evaluaciones/agregar-evaluaciones.component';
import { UsuariosComponent } from './Modules/Admin/usuarios/usuarios.component';
import { LenguajesComponent } from './Modules/Admin/lenguajes/lenguajes.component';
import { PreguntaComponent } from './Modules/User/pregunta/pregunta.component';
import { ManualComponent } from './Modules/User/manual/manual.component';
import { AuthGuard } from './Core/auth.guard';
import { UserBaseComponent } from './Modules/User/user-base/user-base.component';
import { FotosComponent } from './Modules/Admin/fotos/fotos.component';
import { ContactoComponent } from './Modules/User/contacto/contacto.component';
import { NivelesComponent } from './Modules/User/niveles/niveles.component';
import { rolGuard } from './Core/auth/rol.guard';
import { ErrorComponent } from './Shared/error/error.component';
import { isAuthGuard } from './Core/is-auth.guard';
import { MensajesContactoComponent } from './Modules/Admin/mensajes-contacto/mensajes-contacto.component';



const routes: Routes = [
  {
    path: 'login',
    canActivate:[isAuthGuard],
    component: LoginComponent
  },
  {
    path: 'login/:token',
    canActivate:[isAuthGuard],
    component: LoginComponent
  },
  {
    path: 'sing-up',
    canActivate:[isAuthGuard],
    component: SingUpComponent
  },
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'recoverPassword',
    component: RecuperarPasswordComponent
  },
  {
    path: 'confirmarPassword/:token',
    component: ConfirmarPasswordComponent
  },
  {
    path: 'pregunta/:id',
    component: PreguntaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: UserBaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'principal', // Redireccionar a evaluaciones por defecto
        pathMatch: 'full'
      },
      {
        path: 'principal',
        component: PrincipalComponent
      },
      {
        path: 'perfil',
        component: PerfilComponent
      },
      {
        path: 'ranking',
        component: RankingComponent
      },
      {
        path: 'manual',
        component: ManualComponent
      },
      {
        path: 'contacto',
        component: ContactoComponent
      },
      {
        path: 'nivel/:nivel',
        component: NivelesComponent
      }
    ]
  },

  // INICIO ADMIN
  {
    path: 'admin',
    component: IndexAdminComponent,
    canActivate: [AuthGuard, rolGuard],
    children: [
      {
        path: '',
        redirectTo: 'niveles', // Redireccionar a evaluaciones por defecto
        pathMatch: 'full'
      },
      {
        path: 'niveles',
        component: EvaluacionesComponent
      },
      {
        path: 'editar/niveles/:id',
        component: AgregarEvaluacionesComponent
      },
      {
        path: 'agregar',
        component: AgregarEvaluacionesComponent
      },
      {
        path: 'usuarios',
        component: UsuariosComponent
      },
      {
        path: 'lenguajes',
        component: LenguajesComponent
      },
      {
        path: 'fotos',
        component: FotosComponent
      },
      {
        path: 'mensajes',
        component: MensajesContactoComponent
      }
    ]
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
