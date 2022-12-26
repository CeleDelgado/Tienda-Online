//Creamos un array vacio para almacenar nuestros productos
let carrito = [];
////no debo hacer un addEventListener por cada boton, todos ellos botones estan dentro de un contenedor llamado main, el cual contiene un id. Entonces 1ero capturo un elemento por su id
const productoContenedor = document.getElementById('producto-contenedor');
//Del producto contenedor, quiero escuchar un evento click, recibe el objeto event y luego invoco una función que agregue productos al carrito. Cada vez que se desencadene un evento click se crea un event, este objeto event, almacena INFO del EVENTO: por ejemplo, hago click en la img, y al inspeccionar en la consola, veo un "PointerEvent" que posee la propiedad target: y me informa donde estoy haciendo click
productoContenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('agregar')) {
        //antes de agregar un producto al carrito es validar si tenemos un producto repetido. Le pasamos el parametro del click que recibira
        validarProductoRepetido(e.target.id)
    }
});
//Desarrollamos la funcion de validar producto repetido, y aca el nombre del parametro, puede ser otro, pero referido a lo que es, en este caso, el producto id
const validarProductoRepetido = (productoId) => {
    //creamos una consante y mediante el metodo find, le digo que busque un producto dentro del array carrito, cuyo id sea igual al id que le pasamos en la funcion 
    const productoRepetido = carrito.find(producto => producto.id == productoId);

    if (!productoRepetido) {
        //si producto repetido es falso, busco en mi array de prodcutos, es decir de stock, un producto id que sea al id que le paso como parametro . Si encuentra una coincidenca me devuelve ese objeto, sino undefined
        //Cuando NO tenemos un producto repetido: 1) lo agregamos al carrio de compras con un push, 2) lo pintamos en el html con la funcion pintarProductoCarrito
        const producto = productos.find(producto => producto.id == productoId);
        carrito.push(producto);
        pintarProductoCarrito(producto); //le pasamos por parametro el producto
        guardarCarritoStorage(carrito);
        actualizarTotalesCarrito(carrito);
    } else { //Cuando el producto ES repetido: 
        productoRepetido.cantidad++
        // capturo un elemento por medio de su id
        const cantidadProducto = document.getElementById(`cantidad${productoRepetido.id}`);
        //con innerText modifico el nodo texto, muestra el valor actualizado de cantidad
        cantidadProducto.innerText = `Cantidad: ${productoRepetido.cantidad}`
        //
        actualizarTotalesCarrito(carrito);
    }
};

//Esta función obtiene desde el html un elemento a traves de su id: carrito-contenedor
const pintarProductoCarrito = (producto) => {
    const contenedor = document.getElementById('carrito-contenedor');
    //para pintar el carrito, debo crear un div para que se vea mas espaciado
    const div = document.createElement('div');
    //Al div creado le digo que quiero listas sus clases y añadir una, y le añadimos la clase productoEnCarrito, a la cual le dimos estilo en el css
    div.classList.add('productoEnCarrito');
    //luego debo agregar elementos html: agregamos los templates con info del producto que queremos ir agregando
    div.innerHTML = `
        <p>${producto.nombre}</p>
        <p>Precio: ${producto.precio}</p>
        <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
        <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
    `
    contenedor.appendChild(div); //el div que acabo de crear o agrego en el contenedor que creamos como constante
};

const eliminarProductoCarrito = (productoId) => {
    const productoIndex = carrito.findIndex(producto => producto.id == productoId);
    carrito.splice(productoIndex, 1);
    actualizarCarrito(carrito);
    actualizarTotalesCarrito(carrito);
};

const actualizarCarrito = (carrito) => {
    const contenedor = document.getElementById('carrito-contenedor');

    contenedor.innerHTML = '';

    carrito.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('productoEnCarrito');
        div.innerHTML += `
            <p>${producto.nombre}</p>
            <p>Precio: ${producto.precio}</p>
            <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
            <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
        `
        contenedor.appendChild(div);
    });
};

const guardarCarritoStorage = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

const obtenerCarritoStorage = () => {
    const carritoStorage = JSON.parse(localStorage.getItem('carrito'));
    return carritoStorage;
};

const actualizarTotalesCarrito = (carrito) => {
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalCompra = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    pintarTotalesCarrito(totalCantidad, totalCompra);
    guardarCarritoStorage(carrito);
};

const pintarTotalesCarrito = (totalCantidad, totalCompra) => {
    const contadorCarrito = document.getElementById('contador-carrito');
    const precioTotal = document.getElementById('precioTotal');
    console.log(contadorCarrito, precioTotal)

    contadorCarrito.innerText = totalCantidad;
    precioTotal.innerText = totalCompra;
};