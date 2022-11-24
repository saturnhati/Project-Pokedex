import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gen1Page } from './gen1/gen1.page';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PokePage } from './poke/poke.page';

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
  declarations: [Gen1Page, PokePage],
  imports: [CommonModule, RouterModule.forChild(routes), HttpClientModule],
  exports: [Gen1Page, PokePage],
})
export class GenModule {}
