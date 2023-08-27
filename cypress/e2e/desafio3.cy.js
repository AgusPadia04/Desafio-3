import{LoginPage} from '../support/pages/loginPage'
import { ProductPage } from '../support/pages/productPage';
import { ShoppingCartPage } from '../support/pages/shoppingCartPage';

describe('desafio 3', ()=>{
    const shoppingCartPage = new ShoppingCartPage;
    const productPage = new ProductPage;
    const loginPage = new LoginPage;
    let datosLogin;
    let datosProductos;
    before(()=>{
        cy.fixture('login').then(data =>{datosLogin = data;})
        cy.fixture('productos').then(data =>{datosProductos = data;})
    })
    beforeEach(()=>{
        cy.visit('');
        cy.xpath('//span[text()="Iniciá sesión"]').dblclick();
        loginPage.escribirUsuario(datosLogin.username);
        loginPage.escribirContraseña(datosLogin.password);
        loginPage.clickLoginButton();
    })
    it('prueba desafio 3', ()=>{
        cy.get('#onlineshoplink').click();
        productPage.agregarProducto(datosProductos.producto1.nombre);
        productPage.confirmarProducto();
        productPage.agregarProducto(datosProductos.producto2.nombre);
        productPage.confirmarProducto();
        cy.get('#goShoppingCart').click();
        shoppingCartPage.verificarNombreProducto(datosProductos.producto1.nombre).should('have.text',datosProductos.producto1.nombre);
        shoppingCartPage.verificarPrecioProducto(datosProductos.producto1.precio).should('have.text','$'+ datosProductos.producto1.precio);
        shoppingCartPage.verificarNombreProducto(datosProductos.producto2.nombre).should('have.text',datosProductos.producto2.nombre);
        shoppingCartPage.verificarPrecioProducto(datosProductos.producto2.precio).should('have.text','$'+ datosProductos.producto2.precio);
        cy.xpath('//button[text()="Show total price"]').click();
        shoppingCartPage.verificarPrecioAcumulado(datosProductos.producto1.precio + datosProductos.producto2.precio);
    })
    
})