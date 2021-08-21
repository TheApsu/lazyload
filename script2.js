"use strict"

const publicaciones = document.querySelector(".publicaciones")
let contador = 0;

const createPublicationCode = (name, content) => {
    const container = document.createElement("DIV");
    const nombre = document.createElement("H3");
    const contenido = document.createElement("P");

    const comentarySection = document.createElement("DIV");
    const boxComentary = document.createElement("INPUT");
    const btnSubmit = document.createElement("INPUT");

    nombre.textContent = name;
    contenido.textContent = content;

    boxComentary.placeholder = "Introduce un comentario";
    btnSubmit.type = "submit";

    container.classList.add("publicacion");
    comentarySection.classList.add("comentarios");
    boxComentary.classList.add("comentario");
    btnSubmit.classList.add("enviar");
  
    comentarySection.appendChild(boxComentary);
    comentarySection.appendChild(btnSubmit);

    container.appendChild(nombre);
    container.appendChild(contenido)
    container.appendChild(comentarySection);

    return container;
}

const loadMorePost = entry => {
    if(entry[0].isIntersecting) loadPosts(7)
}

const observer = new IntersectionObserver(loadMorePost);


const loadPosts = async num => {
        const request = await fetch("publi.txt");
        const arr = await request.json();
        const fragment = document.createDocumentFragment()
        for(let i = 0; i < num; i++){
            if(arr.content[contador] != undefined){
                const newPublicacion = createPublicationCode(arr.content[contador].nombre, arr.content[contador].post);    
                contador++;
                fragment.appendChild(newPublicacion)

                if( i == num-1) observer.observe(newPublicacion);   
            }else{
                document.querySelector(".no-more-content-text").textContent = "No hay más publicaciones"

            }           
        }

        publicaciones.appendChild(fragment);
};


loadPosts(4)

