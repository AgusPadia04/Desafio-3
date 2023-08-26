export class ShoppingCartPage{
    constructor(){
        this.productName = 'p#productName';
        this.productPrice = 'p#productPrice';
        this.price = 'p#price'
    }

    verificarNombreProducto(nombreProducto){
        cy.get(this.productName).contains(nombreProducto).should('have.text',nombreProducto);
    }
    verificarPrecioProducto(precioProducto){
        cy.get(this.productPrice).contains(precioProducto).should('have.text','$'+ precioProducto);
    }
    verificarPrecioAcumulado(precio1, precio2){
        cy.get(this.price).contains(precio1+precio2);
    }
}

