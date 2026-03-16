/**
 * @file main.js
 * @brief Archivo principal para consumir la API de Harry Potter.
 * @author Santiago Luque Villanueva
 * @details Este script gestiona las peticiones asíncronas usando fetch() para
 * obtener estudiantes, profesores y hechizos, manipulando el DOM para mostrarlos.
 */

document.addEventListener("DOMContentLoaded", () => {

    const btnEstudiantes = document.querySelector("#btn-buscar-estudiantes");

    if (btnEstudiantes) {
        const selectorCasa = document.querySelector("#selector-casa");
        const contenedorEstudiantes = document.querySelector("#contenedor-estudiantes");

        btnEstudiantes.addEventListener("click", () => {
            contenedorEstudiantes.innerHTML = "<p>Cargando estudiantes...</p>";

            const casa = selectorCasa.value;
            const url = "https://hp-api.onrender.com/api/characters/house/" + casa;

            fetch(url)
                .then(response => {
                    console.log("Respuesta Estudiantes:", response);
                    if (!response.ok) {
                        throw new Error("Respuesta no OK. Código HTTP: " + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Data Estudiantes: ", data);
                    contenedorEstudiantes.innerHTML = "";

                    for (const u of data) {
                        if (u.hogwartsStudent === true) {
                            const tarjeta = document.createElement("div");
                            tarjeta.className = "tarjeta";

                            const imagenURL = u.image !== "" ? u.image : "../img/hogwarts-fondo.avif";

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

    const btnProfesores = document.querySelector("#btn-cargar-profesores");

    if (btnProfesores) {
        const contenedorProfesores = document.querySelector("#contenedor-profesores");

        btnProfesores.addEventListener("click", () => {
            contenedorProfesores.innerHTML = "<p>Convocando al claustro de profesores...</p>";

            fetch("https://hp-api.onrender.com/api/characters/staff")
                .then(response => {
                    console.log("Respuesta Profesores:", response);
                    if (!response.ok) {
                        throw new Error("Respuesta no OK. Código HTTP: " + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Data Profesores: ", data);
                    contenedorProfesores.innerHTML = "";

                    for (const p of data) {
                        const tarjeta = document.createElement("div");
                        tarjeta.className = "tarjeta";

                        const imagenURL = p.image !== "" ? p.image : "../img/hogwarts-fondo.avif";

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

    const btnHechizos = document.querySelector("#btn-cargar-hechizos");

    if (btnHechizos) {
        const contenedorHechizos = document.querySelector("#contenedor-hechizos");

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
                    console.log("Data Hechizos: ", data);
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