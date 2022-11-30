import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Gen1Page } from './gen/gen1/gen1.page';
import { SearchPage } from './search/search.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: Gen1Page,
  },
  {
    path: 'search',
    component: SearchPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
