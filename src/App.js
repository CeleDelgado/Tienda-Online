//Archivo para funciones principales

const pintarProductos = () => {
  const contenedor = document.getElementById("producto-contenedor");

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