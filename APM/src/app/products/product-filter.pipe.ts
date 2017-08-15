import { PipeTransform, Pipe } from '@angular/core';
import { IProduct } from './product';

/** Custom Pipe used to filter an array of Products */
@Pipe({
    name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

    transform(value: IProduct[], filterBy: string): IProduct[] {

        // Checks if the param passed in is defined or sets to null
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;

        // Filters the products by the variable passed in
        return filterBy ? value.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }

}
