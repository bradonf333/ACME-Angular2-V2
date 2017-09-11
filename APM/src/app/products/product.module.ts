import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListComponent } from './product-list.component';
import { ProductService } from './product.service';
import { StarComponent } from '../shared/star.component';
import { ProductDetailComponent } from './product-detail.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailGuard } from './product-guard.service';
import { ProductEditComponent } from './product-edit.component';


@NgModule({
    declarations: [
        ProductListComponent,
        ProductDetailComponent,
        ConvertToSpacesPipe,
        ProductEditComponent,
    ],
    imports: [
        SharedModule,
        HttpClientModule,
        RouterModule.forChild([
            { path: 'products', component: ProductListComponent },
            { path: 'productEdit', component: ProductEditComponent},
            { path: 'product/:id', canActivate: [ProductDetailGuard], component: ProductDetailComponent }
        ])
    ],
    exports: [],
    providers: [ ProductService ],
})
export class ProductModule {

}
