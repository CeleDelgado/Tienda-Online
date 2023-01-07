//Archivo para funciones principales

const pintarProductos = async () => {
  const contenedor = document.getElementById("producto-contenedor");

  //invocamos a la funcion controller
  const productos = await homeController()

  //con await digo "espera a que homeController me retorne ese array de objetos", cuando esta listo para retornarlo, en el array de productos lo guardamos y recorremos con un for each
  productos.forEach(producto => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML += `<div class="card-image">
                        <img src=${producto.img}>
                        <span class="card-title">${producto.nombre}</span>
                        <a class="btn-floating halfway-fab wabes-effect waves-light red"><i id=${producto.id} class="material-icons agregar">add_shopping_cart</i></a>
                      </div>
                      <div class="card-content">
                          <p>Formato: ${producto.formato}</p>
                          <p>Precio: U$D${producto.precio}</p>
                          <p>Breve descripción: ${producto.descripcionCorta}</p>
                      </div>`
    contenedor.appendChild(div);
  });
}; 