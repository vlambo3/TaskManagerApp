window.addEventListener('load', function () {

    //Al cargar la pagina buscamos y obtenemos el formulario donde estarán
    //los datos que el usuario cargará de la nueva tarea
    const formulario = document.querySelector('#add_new_task');

    //Ante un submit del formulario se ejecutará la siguiente funcion
    formulario.addEventListener('submit', function (event) {
        //Agrego para no ver los datos en la ruta
        event.preventDefault()

       //creamos un JSON que tendrá los datos de la nueva tarea
        const formData = {
            title: document.querySelector('#title').value,
            description: document.querySelector('#description').value,

        };
        //invocamos utilizando la función fetch la API tareas con el método POST que guardará
        //la tarea que enviaremos en formato JSON
        const url = '/tasks';
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }

        fetch(url, settings)
            .then(response => response.json())
            .then(data => {
                 /*let successAlert = '<div class="alert alert-success alert-dismissible">' +
                     '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                     '<strong> Tarea agregada </strong> </div>';*/

                 alert("Task added successfully")

                 /*const responseAlert =  document.querySelector('#response');
                 responseAlert.innerHTML = successAlert;
                 responseAlert.style.display = "block";

                 // Ocultar el mensaje después de 3 segundos (3000 milisegundos)
                 setTimeout(function(){
                     document.querySelector('#response').style.display = "none";
                 }, 3000);*/

                 resetUploadForm();

            })
            .catch(error => {
                    //Si hay algun error se muestra un mensaje diciendo que la tarea
                    //no se pudo guardar y se intente nuevamente
                    let errorAlert = '<div class="alert alert-danger alert-dismissible">' +
                                     '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                                     '<strong> Error intente nuevamente</strong> </div>'

                      document.querySelector('#response').innerHTML = errorAlert;
                      document.querySelector('#response').style.display = "block";
                     //se dejan todos los campos vacíos por si se quiere ingresar otra tarea
                     resetUploadForm();})
    });


    function resetUploadForm(){
        document.querySelector('#title').value = "";
        document.querySelector('#description').value = "";

    }

    (function(){
        let pathname = window.location.pathname;
        if(pathname === "/"){
            document.querySelector(".nav .nav-item a:first").addClass("active");
        } else if (pathname == "/addTask.html") {
            document.querySelector(".nav .nav-item a:last").addClass("active");
        }
    })();
});