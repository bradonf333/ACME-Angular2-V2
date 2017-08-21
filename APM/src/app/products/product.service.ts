import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IProduct } from './product';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';


@Injectable()
export class ProductService {

    // Represents a web api url that would have access to the list of products
    private _productUrl = './api/products/products.json';

    /**
     * Constructor to inject the Http Service from Angular
     */
    constructor(private _http: HttpClient) {
    }

    /**
     * Returns a list of IProducts by sending an http request to the
     * given url and casting the json response into an IProduct[]
     */
    getProducts(): Observable<IProduct[]> {
        return this._http.get<IProduct[]>(this._productUrl)
        .do(data => console.log('All: ' + JSON.stringify(data)))
        .catch(this.handleError);
    }

    /**
     * Searches the list of products by calling the getProducts method and searching
     * for the given id.
     */
    getProduct(id: number): Observable<IProduct> {
        return this.getProducts()
        .map((products: IProduct[]) => products.find(p => p.productId === id));
    }

    /**
     * Takes an error, logs it to the console and throws it to the calling code.
     * @param error
     */
    private handleError(error: HttpErrorResponse) {
        console.error(error.message);
        return Observable.throw(error.message);
    }
}
