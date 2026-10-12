const btnBuscar = document.getElementById('btnBuscar');
const inputNombre = document.getElementById('inputNombre');
const resultado = document.getElementById('resultado');

btnBuscar.addEventListener('click', async () => {
    const nombre = inputNombre.value.toLowerCase().trim();
    if(!nombre) return;
    resultado.innerHTML = 'Buscando...';
    try{
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        if(!respuesta.ok){
            throw new Error('Pokemon no encontrado');
        }
        const datos = await respuesta.json();
    }catch(error){
        resultado.innerHTML = `<p>X${error.message}</p>`;
    }
})