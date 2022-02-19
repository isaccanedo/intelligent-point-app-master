import { LoginComponent, LogarComponent } from './components';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const LoginRoutes: Routes = [
    {
        path: 'login',
        component: LogarComponent,
        children: [{ path: '', component: LoginComponent }]
}];

@NgModule({
    imports: [ RouterModule.forChild(LoginRoutes)],
    exports: [ RouterModule ]
})

export class LoginRoutingModule {
}

