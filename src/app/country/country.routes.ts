import { Routes } from '@angular/router';
import { ByCapitalPage } from './pages/by-capital-page/by-capital-page';

export const countryRoutes: Routes = [
  {
    path: '',
    component: ByCapitalPage,
  },
  /*{
    path: 'country',
    // ??? {}
  },
  {
    path: '**',
    redirectTo: '',
  },*/
];

export default countryRoutes;
