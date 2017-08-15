/** Makes sure the user enters a valid product id before routing
 * to the ProductDetailPage.
 * Alert user and redirect to another page if the product id is not valid.
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable()
export class ProductDetailGuard implements CanActivate {

    constructor(private _router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot): boolean {

        // Get the id from the route variable and convert it to a number
        let id = +route.url[1].path;

        if (isNaN(id) || id < 1) {
            alert('Invalid product Id');

            // Navigate the user to the products list page
            this._router.navigate(['/products']);
            return false;
        };
        return true;
    }
}
