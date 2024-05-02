window.addEventListener('load', function () {
    (function(){

      //con fetch invocamos a la API de tareas con el método GET
      //nos devolverá un JSON con una colección de tareas
      const url = '/tasks';
      const settings = {
        method: 'GET'
      }

      fetch(url,settings)
      .then(response => response.json())
      .then(data => {
      //recorremos la colección de tareas del JSON
         for(task of data){
            //por cada tarea armaremos una fila de la tabla
            //cada fila tendrá un id que luego nos permitirá borrar la fila si eliminamos la tarea
            var table = document.getElementById("taskTable");
            var taskRow =table.insertRow();
            let tr_id = 'tr_' + task.id;
            taskRow.id = tr_id;

            //por cada tarea creamos un boton delete que agregaremos en cada fila para poder eliminar la misma
            //dicho boton invocara a la funcion de java script deleteByKey que se encargará
            //de llamar a la API para eliminar una tarea
            let deleteButton = '<button' +
                                      ' id=' + '\"' + 'btn_delete_' + task.id + '\"' +
                                      ' type="button" onclick="deleteBy('+task.id+')" class="btn btn-danger btn_delete">' +
                                      '&times' +
                                      '</button>';

            //por cada tarea creamos un boton que muestra el id y que al hacerle clic invocará
            //a la función de java script findBy que se encargará de buscar la tarea que queremos
            //modificar y mostrar los datos de la misma en un formulario.
            let updateButton = '<button' +
                                      ' id=' + '\"' + 'btn_id_' + task.id + '\"' +
                                      ' type="button" onclick="findBy('+task.id+')" class="btn btn-info btn_id">' +
                                      task.id +
                                      '</button>';

            //armamos cada columna de la fila
            //como primer columna pondremos el boton modificar
            //luego los datos de la tarea
            //como ultima columna el boton eliminar
            taskRow.innerHTML = '<td>' + updateButton + '</td>' +
                    '<td class=\"td_title\">' + task.title.toUpperCase() + '</td>' +
                    '<td class=\"td_description\">' + task.description.toUpperCase() + '</td>' +
                    '<td>' + deleteButton + '</td>';

        };

    })
    })

    (function(){
      let pathname = window.location.pathname;
      if (pathname == "/taskList.html") {
          document.querySelector(".nav .nav-item a:last").addClass("active");
      }
    })


    })