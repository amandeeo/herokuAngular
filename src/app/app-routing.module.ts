import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';

import { AuthGuard } from './auth.guard';



const routes : Routes = [
{
	path:'',
	component:LoginComponent
},
{
	path:'home',
	component:HomepageComponent,
  canActivate: [AuthGuard]
}]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }
