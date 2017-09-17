import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    pageTitle: string = 'Product List';
    showImage: boolean;
    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;
    products: IProduct[];
    filteredProducts: IProduct[];

    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }


    /**
     * Constructor to initialize values.
     * @param _productService
     */
    constructor(private _productService: ProductService) {
    }

    /**
     * Method called when the page is initialized
     */
    ngOnInit(): void {

        /** Calls the service to return a list of products */
        this._productService.getProducts().subscribe(
            products => {
                this.products = products;
                this.filteredProducts = this.products;
                console.log(this.filteredProducts);
            },
            error => this.errorMessage = <any>error);

        // Default the filteredProducts list to the full list
        this.filteredProducts = this.products;
    }

    /**
     * Sets the showImage property to the opposite of what it was before
     */
    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    /**
     * Adds the passed in string value to the end of the pageTitle
     * @param message
     */
    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }

    /**
     * Search products array by the string passed in.
     * Compares the value passed in with the productName.
     * @param filterBy
     */
    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
}
