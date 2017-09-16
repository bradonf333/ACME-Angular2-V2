/**
 * Makes sure the user enters a valid product id before routing
 * to the ProductDetailPage.
 * Alert user and redirect to another page if the product id is not valid.
 */


import { CanActivate, ActivatedRouteSnapshot, Router, CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { ProductEditComponent } from './product-edit.component';

/**
 * Validates that the id passed in is greater than 0.
 * If not then alert the user and return the user to the products page.
 */
@Injectable()
export class ProductDetailGuard implements CanActivate {

    constructor(private _router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot): boolean {

        // Get the id from the route variable and convert it to a number
        const id = +route.url[1].path;

        if (isNaN(id) || id < 1) {
            alert('Invalid product Id');

            // Navigate the user to the products list page
            this._router.navigate(['/products']);
            return false;
        }
        return true;
    }
}

/**
 * Validates that the user wants to leave the page if they have made any changes
 * to the form.
 */
@Injectable()
export class ProductEditGuard implements CanDeactivate<ProductEditComponent> {

    canDeactivate(component: ProductEditComponent): boolean {
        if (component.productForm.dirty) {
            const productName = component.productForm.get('productName').value || 'New Product';
            return confirm(`Navigate away and lose all changes to ${productName}?`);
        }
        return true;
    }
}
