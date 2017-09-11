import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductModule } from './products/product.module';
import { WelcomeComponent } from './home/welcome.component';
import { ProductDetailGuard } from './products/product-guard.service';
import { ProductEditComponent } from './product-edit/product-edit.component';


@NgModule({
  declarations: [
    AppComponent, WelcomeComponent, ProductEditComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent},
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'products', pathMatch: 'full' }
    ]),
    ProductModule
  ],
  providers: [ ProductDetailGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
