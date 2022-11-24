import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gen1Page } from './gen1/gen1.page';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: 'gen1',
    component: Gen1Page,
  },
];

@NgModule({
  declarations: [Gen1Page],
  imports: [CommonModule, RouterModule.forChild(routes), HttpClientModule],
})
export class GenModule {}
