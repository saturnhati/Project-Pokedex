import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home/home.page';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PokePage } from './poke/poke.page';
import { TeamsPage } from './teams/teams.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
  },
  {
    path: 'pokemon/:id',
    component: PokePage,
  },
];

@NgModule({
  declarations: [HomePage, PokePage, TeamsPage],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [HomePage, PokePage, TeamsPage],
})
export class PokemonModule {}
