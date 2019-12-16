import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { AuthGuardService as AuthGuard } from './core/guard/auth-guard.service';
import { SecuredComponent } from './secured/secured.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';

import { PermissionGuard } from './core/model/permission-guard';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'secured', canActivate: [AuthGuard], component: SecuredComponent },
	{
		path: 'secured-role',
		canLoad: [AuthGuard],
		loadChildren: '../app/secured/secured-role/secured-role.module#SecuredRoleModule',
		data: {
			Permission: {
				Role: 'rani_app_role',
				RedirectTo: '403'
			} as PermissionGuard
		}
	}, 
	{
		path: 'groupRestricted',
		canLoad: [AuthGuard],
		loadChildren: '../app/group-restricted/group-restricted.module#GroupRestrictedModule',
		data: {
			Permission: {
				Only: ['User'],
				RedirectTo: '403'
			} as PermissionGuard
		}
	},

	{ path: '403', component: ForbiddenComponent },
	{ path: '404', component: NotfoundComponent },

	{ path: '**', redirectTo: '404' }
]
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
