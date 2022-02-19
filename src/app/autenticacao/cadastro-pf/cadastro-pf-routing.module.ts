import { CadastroPfComponent, CadastrarPfComponent } from './components';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const CadastroPfRoutes: Routes = [
    {
        path: 'cadastro-pf',
        component: CadastroPfComponent,
        children: [
            {
                path: '',
                component: CadastrarPfComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(CadastroPfRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class CadastroPfRoutingModule {
}
