function deleteBy(id)
{
          //con fetch invocamos a la API de tarea con el método DELETE
          //pasandole el id en la URL
          const url = '/tasks/'+ id;
          const settings = {
              method: 'DELETE'
          }
          fetch(url,settings)
          .then(response => response.json())

          //borrar la fila de la tarea eliminada
          let row_id = "#tr_" + id;
          document.querySelector(row_id).remove();

}