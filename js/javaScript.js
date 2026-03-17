/**
 * @file main.js
 * @brief Archivo principal para consumir la API de Harry Potter.
 * @author Santiago Luque Villanueva
 * @details Este script gestiona las peticiones asíncronas usando fetch() para
 * obtener estudiantes, profesores y hechizos, manipulando el DOM para mostrarlos.
 */

document.addEventtener("DOMContentLoaded", () => {

    const btnEstudiantes = document.getElementById("btn-buscar-estudiantes");

    if (btnEstudiantes) {
        const selectorCasa = document.getElementById("selector-casa");
        const contenedorEstudiantes = document.getElementById("contenedor-estudiantes");

        btnEstudiantes.addEventListener("click", () => {
            contenedorEstudiantes.innerHTML = "<p>Cargando estudiantes...</p>";

            const casa = selectorCasa.value;
            const url = "https://hp-api.onrender.com/api/characters/house/" + casa;

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Respuesta no OK. Código HTTP: " + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    contenedorEstudiantes.innerHTML = "";

                    for (const u of data) {
                        if (u.hogwartsStudent === true) {
                            const tarjeta = document.createElement("div");
                            tarjeta.className = "tarjeta";

                            let imagenURL;

                            if (u.image !== "") {
                                imagenURL = u.image;
                            } else {
                                imagenURL = "../img/hogwarts-fondo.avif";
                            }

                            tarjeta.innerHTML = `
                                <img src="${imagenURL}" alt="Foto de ${u.name}">
                                <h3>${u.name}</h3>
                                <p><strong>Especie:</strong> ${u.species}</p>
                                <p><strong>Patronus:</strong> ${u.patronus || "Desconocido"}</p>
                            `;
                            contenedorEstudiantes.appendChild(tarjeta);
                        }
                    }
                })
                .catch(err => {
                    contenedorEstudiantes.innerHTML = "<p>Error cargando los estudiantes. Inténtalo de nuevo.</p>";
                    console.log(err);
                });
        });
    }

    const btnProfesores = document.getElementById("btn-cargar-profesores");

    if (btnProfesores) {
        const contenedorProfesores = document.getElementById("contenedor-profesores");

        btnProfesores.addEventListener("click", () => {
            contenedorProfesores.innerHTML = "<p>Convocando al claustro de profesores...</p>";

            fetch("https://hp-api.onrender.com/api/characters/staff")
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Respuesta no OK. Código HTTP: " + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    contenedorProfesores.innerHTML = "";

                    for (const p of data) {
                        const tarjeta = document.createElement("div");
                        tarjeta.className = "tarjeta";

                        let imagenURL;

                        if (u.image !== "") {
                            imagenURL = u.image;
                        } else {
                            imagenURL = "../img/hogwarts-fondo.avif";
                        }

                        tarjeta.innerHTML = `
                            <img src="${imagenURL}" alt="Foto de ${p.name}">
                            <h3>${p.name}</h3>
                            <p><strong>Actor:</strong> ${p.actor}</p>
                            <p><strong>Vivo:</strong> ${p.alive ? "Sí" : "No"}</p>
                        `;
                        contenedorProfesores.appendChild(tarjeta);
                    }
                })
                .catch(err => {
                    contenedorProfesores.innerHTML = "<p>Error cargando a los profesores.</p>";
                    console.log(err);
                });
        });
    }

    const btnHechizos = document.getElementById("btn-cargar-hechizos");

    if (btnHechizos) {
        const contenedorHechizos = document.getElementById("contenedor-hechizos");

        btnHechizos.addEventListener("click", () => {
            contenedorHechizos.innerHTML = "<p>Abriendo libro de hechizos...</p>";

            fetch("https://hp-api.onrender.com/api/spells")
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Respuesta no OK. Código HTTP: " + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    contenedorHechizos.innerHTML = "";

                    for (const h of data) {
                        const tarjeta = document.createElement("div");
                        tarjeta.className = "tarjeta";
                        tarjeta.innerHTML = `
                            <h3>${h.name}</h3>
                            <p><em>${h.description}</em></p>
                        `;
                        contenedorHechizos.appendChild(tarjeta);
                    }
                })
                .catch(err => {
                    contenedorHechizos.innerHTML = "<p>Error leyendo el libro de hechizos.</p>";
                    console.log(err);
                });
        });
    }

});