import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { adminGuard } from '../guards/admin.guard';
import { authGuard } from '../guards/auth.guard';
import { RedirectComponent } from './components/redirect/redirect.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
        canActivate: [adminGuard, authGuard],
      },
      {
        path: 'car-rental',
        loadChildren: () =>
          import('./car-rental/car-rental.module').then(
            (m) => m.CarRentalModule
          ),
      },
      {
        path: 'userprofile',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'redirect',
        component: RedirectComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatformRoutingModule {}
