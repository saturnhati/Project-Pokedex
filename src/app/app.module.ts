import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomePage } from './home/home.page';
import { HeaderComponent } from './header/header.component';
import { GenModule } from './gen/gen.module';

@NgModule({
  declarations: [AppComponent, HomePage, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule, GenModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
