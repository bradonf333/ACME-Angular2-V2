/** Displays detailed information for a single product */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    moduleId: module.id,
    templateUrl: 'product-detail.component.html'
    // , styleUrls: ['product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

    pageTitle: string = 'Product Details';
    errorMessage: string;
    product: IProduct;

    /** Inject ActivatedRoute, Router and ProductService */
    constructor(
        private _route: ActivatedRoute
        , private _router: Router
        , private _productService: ProductService
    ) {
    }

    /** 
     * 1. Get the parameter passed in to the URL and display it as the page title.
     * 2. Search list of products by the productId
     */
    ngOnInit(): void {

        let id = +this._route.snapshot.params['id'];
        this.pageTitle += `: ${id}`;

        this._productService.getProduct(id)
            .subscribe(product => this.product = product,
            error => this.errorMessage = <any>error);
    }

    onBack(): void {
        this._router.navigate(['/products']);
    }

}
