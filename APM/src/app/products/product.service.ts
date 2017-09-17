import { Injectable } from '@angular/core';
import { Response, Http, RequestOptions, Headers } from '@angular/http';
import { IProduct } from './product';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';


@Injectable()
export class ProductService {

    // Represents a web api url that would have access to the list of products
    private _productUrl = './api/products/products.json';

    // In-memory-web-api url
    private baseUrl = 'api/products';

    /**
     * Constructor to inject the Http Service from Angular
     */
    constructor(private http: Http) {
    }

    /**
     * Returns a list of IProducts by sending an http request to the
     * given url and casting the json response into an IProduct[]
     */
    getProducts(): Observable<IProduct[]> {
            return this.http.get(this.baseUrl)
            .map(this.extractData)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    /**
     * Searches the list of products by calling the getProducts method and searching
     * for the given id.
     */
    getProduct(id: number): Observable<IProduct> {
        if (id === 0) {
            return Observable.create((observer: any) => {
                observer.next(this.initializeProduct());
                observer.complete();
            });
        }
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
            .map(this.extractData)
            .do(data => console.log('getProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveProduct(product: IProduct): Observable<IProduct> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        if (product.id === 0) {
            return this.createProduct(product, options);
        }
        return this.updateProduct(product, options);
    }

    private createProduct(product: IProduct, options: RequestOptions): Observable<IProduct> {
        product.id = undefined;
        return this.http.post(this.baseUrl, product, options)
            .map(this.extractData)
            .do(data => console.log('createProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateProduct(product: IProduct, options: RequestOptions): Observable<IProduct> {
        const url = `${this.baseUrl}/${product.id}`;
        return this.http.put(url, product, options)
            .map(() => product)
            .do(data => console.log('updateProduct: ' + JSON.stringify(data)))
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

    /**
     * Initialize a new product
     */
    initializeProduct(): IProduct {
        return {
            id: 0,
            productName: null,
            productCode: null,
            tags: [''],
            releaseDate: null,
            price: null,
            description: null,
            starRating: null,
            imageUrl: null
        };
    }

    extractData(response: Response) {
        const body = response.json();
        return body.data || {};
    }
}
