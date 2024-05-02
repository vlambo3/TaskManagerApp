window.addEventListener('load', function () {


    //Buscamos y obtenemos el formulario donde estan
    //los datos que el usuario pudo haber modificado de la tarea
    const formulario = document.querySelector('#update_task_form');

    formulario.addEventListener('submit', function (event) {
        let taskId = document.querySelector('#task_id').value;

        //creamos un JSON que tendrá los datos de la tarea
        //a diferencia de una tarea nueva en este caso enviamos el id
        //para poder identificarla y modificarla para no cargarla como nueva
        const formData = {
            id: document.querySelector('#task_id').value,
            title: document.querySelector('#title').value,
            description: document.querySelector('#description').value,
        };

        //invocamos utilizando la función fetch la API tarea con el método PUT que modificará
        //la tarea que enviaremos en formato JSON
        const url = '/tasks';
        const settings = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }
          fetch(url,settings)
          .then(response => response.json())

    })
 })

    //Es la funcion que se invoca cuando se hace click sobre el id de una tarea del listado
    //se encarga de llenar el formulario con los datos de la tarea
    //que se desea modificar
    function findBy(id) {
          const url = '/tasks'+"/"+id;
          const settings = {
              method: 'GET'
          }
          fetch(url,settings)
          .then(response => response.json())
          .then(data => {
              let task = data;
              document.querySelector('#task_id').value = task.id;
              document.querySelector('#title').value = task.title;
              document.querySelector('#description').value = task.description;

              //el formulario por default esta oculto y al editar se habilita
              document.querySelector('#div_task_updating').style.display = "block";
          }).catch(error => {
              alert("Error: " + error);
          })
      }


