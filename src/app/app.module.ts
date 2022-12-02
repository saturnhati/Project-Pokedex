import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { GenModule } from './pages/gen.module';
import { AuthModule } from './auth/auth.module';
import { FormsModule } from '@angular/forms';
import { SearchPage } from './search/search.page';

@NgModule({
  declarations: [AppComponent, HeaderComponent, SearchPage],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    GenModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
