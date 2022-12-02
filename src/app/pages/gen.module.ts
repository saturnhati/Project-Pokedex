import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gen1Page } from './gen1/gen1.page';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PokePage } from './poke/poke.page';
import { TeamsPage } from './teams/teams.page';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'gen1',
    component: Gen1Page,
  },
  {
    path: 'pokemon/:id',
    component: PokePage,
  },
];

@NgModule({
  declarations: [Gen1Page, PokePage, TeamsPage],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
  ],
  exports: [Gen1Page, PokePage],
})
export class GenModule {}
