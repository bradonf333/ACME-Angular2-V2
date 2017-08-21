import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './product.service';

@Component({
    templateUrl: 'product-detail.component.html'
    // , styleUrls: ['product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

    pageTitle: string = 'Product Details';
    product: IProduct;
    errorMessage: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _productService: ProductService
    ) { }

    ngOnInit(): void {

        // Get the id from the clicked product
        const id = +this._route.snapshot.params['id'];
        this.pageTitle += `: ${id}`;

        /** Calls the service to return a list of products */
        this._productService.getProduct(id)
        .subscribe(
            product => {
                this.product = product;
            },
            error => this.errorMessage = <any>error);
    }

    onBack(): void {
        this._router.navigate(['/products']);
    }

}
