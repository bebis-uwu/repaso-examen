const btnBuscar = document.getElementById('btnBuscar');
const inputNombre = document.getElementById('inputNombre');
const resultado = document.getElementById('resultado');

btnBuscar.addEventListener('click', async () => {

    const nombre = inputNombre.value.toLowerCase().trim();

    if (!nombre) {
        resultado.innerHTML = '<p>Escribe el nombre de un Pokémon.</p>';
        return;
    }

    resultado.innerHTML = 'Buscando...';

    try {
        const respuesta = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${nombre}`
        );

        if (!respuesta.ok) {
            throw new Error('Pokémon no encontrado');
        }

        const datos = await respuesta.json();

        mostrarPokemon(datos);

    } catch (error) {
        resultado.innerHTML = `<p>${error.message}</p>`;
    }
});

function mostrarPokemon(datos) {

    const tipos = datos.types
        .map(t => t.type.name)
        .join(', ');

    resultado.innerHTML = `
        <div class="tarjeta">
            <h2>${datos.name}</h2>

            <img
                src="${datos.sprites.front_default || ''}"
                alt="${datos.name}"
            >

            <p>Tipos: ${tipos}</p>
            <p>Peso: ${datos.weight}</p>
            <p>Altura: ${datos.height}</p>
            <p>Experiencia base: ${datos.base_experience}</p>
        </div>
    `;
}