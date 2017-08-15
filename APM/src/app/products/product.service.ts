import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

    // Represents a web api url that would have access to the list of products
    private _productUrl = 'api/products/products.json';

    /**
     * Constructor to inject the Http Service from Angular
     */
    constructor(private _http: Http) {
    }

    /**
     * Returns a list of IProducts by sending an http request to the
     * given url and casting the json response into an IProduct[]
     */
    getProducts(): Observable<IProduct[]> {
        return this._http.get(this._productUrl)
            .map((response: Response) => <IProduct[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    /**
     * Returns a single product by searching the list of products.
     * Checks the productId property against the given number to find a match.
     * @param id 
     */
    getProduct(id: number): Observable<IProduct> {
        return this.getProducts()
        .map((products: IProduct[]) => products.find(p => p.productId === id))
        .do(data => console.log('Single Product: ' + JSON.stringify(data)))
        .catch(this.handleError);
    }

    /**
     * Takes an error, logs it to the console and throws it to the calling code.
     * @param error 
     */
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
