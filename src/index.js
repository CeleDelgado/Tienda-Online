//Archivo raiz en cuanto a toda nuestra logica en javaScript

document.addEventListener('DOMContentLoaded', () => { //Quiero escuchar un evento que se va a llamar DOMContentLeaded, cada ves que la pagina se recargue o actualize va a llamar a la función pintar producto
    pintarProductos();

    if (localStorage.getItem('carrito')) {
        carrito = obtenerCarritoStorage();
        actualizarCarrito(carrito);
    }
}); 