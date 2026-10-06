const URL_SCRIPT =
"https://script.google.com/macros/s/AKfycbxjNzz-T8O5PxnQ1z9LXD9JzAl49YVjwGYbqPAezSF6iIVYcT77tXpYF5DbRFBgo-FIYw/exec";


// ====================
// FECHA DEL EVENTO
// ====================

const fechaEvento =
new Date("2027-02-04T13:00:00");


// ====================
// CONTADOR
// ====================

setInterval(() => {

    const ahora = new Date();

    const diferencia =
    fechaEvento - ahora;

    const dias = Math.floor(
        diferencia /
        (1000 * 60 * 60 * 24)
    );

    const horas = Math.floor(
        (diferencia %
        (1000 * 60 * 60 * 24))
        /
        (1000 * 60 * 60)
    );

    const minutos = Math.floor(
        (diferencia %
        (1000 * 60 * 60))
        /
        (1000 * 60)
    );

    const segundos = Math.floor(
        (diferencia %
        (1000 * 60))
        /
        1000
    );

    document.getElementById("days").textContent = dias;
    document.getElementById("hours").textContent = horas;
    document.getElementById("minutes").textContent = minutos;
    document.getElementById("seconds").textContent = segundos;

}, 1000);


// ====================
// MÚSICA
// ====================

const music =
document.getElementById("bgMusic");

function toggleMusic(){

    if(music.paused){

        music.play();

    }else{

        music.pause();

    }

}


// ====================
// FORMULARIO RSVP
// ====================

document
.getElementById("formulario")
.addEventListener(
"submit",
async(e)=>{

    e.preventDefault();

    const nombre =
    document.getElementById("nombre").value;

    const personas =
    document.getElementById("personas").value;

    try{

        const respuesta =
        await fetch(URL_SCRIPT,{

            method:"POST",

            headers:{
                "Content-Type":"text/plain"
            },

            body:JSON.stringify({

                nombre,
                personas

            })

        });

        const resultado =
        await respuesta.text();

        console.log(resultado);

        document
        .getElementById("mensajeConfirmacion")
        .innerHTML =
        "✅ Gracias por confirmar tu asistencia";

        const telefono =
        "5218112345678";

        const mensaje =
        `Hola, soy ${nombre}. Confirmo ${personas} persona(s).`;

        window.open(
        `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`,
        "_blank"
        );

        cargarTotal();

    }catch(error){

        console.error(error);

        document
        .getElementById("mensajeConfirmacion")
        .innerHTML =
        "❌ Error al registrar asistencia";

    }

});


// ====================
// TOTAL CONFIRMADOS
// ====================

async function cargarTotal(){

    try{

        const respuesta =
        await fetch(URL_SCRIPT);

        const total =
        await respuesta.text();

        document
        .getElementById("totalAsistentes")
        .textContent =
        `👥 Confirmados: ${total}`;

    }catch(error){

        console.error(error);

    }

}

cargarTotal();
