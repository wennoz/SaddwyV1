import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Shared/login/login.component';
import { SingUpComponent } from './Shared/sing-up/sing-up.component';
import { HomePageComponent } from './Shared/home-page/home-page.component';
import { UserIndexComponent } from './Modules/user-index/user-index.component';
import { PrincipalComponent } from './Modules/principal/principal.component';
import { PerfilComponent } from './Modules/perfil/perfil.component';



const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'sing-up',
    component:SingUpComponent
  },
  {
    path:'',
    component:HomePageComponent
  },
  {
    path:'dashboard',
    component:UserIndexComponent,
    children:[
          {
            path:'',
            component:PrincipalComponent
          },
          {
            path:'perfil',
            component:PerfilComponent
          }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
