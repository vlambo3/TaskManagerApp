package com.dh.TaskManager.service.impl;

import com.dh.TaskManager.dto.TaskRequestDTO;
import com.dh.TaskManager.dto.TaskRequestToUpdateDTO;
import com.dh.TaskManager.dto.TaskResponseDTO;
import com.dh.TaskManager.entity.Task;
import com.dh.TaskManager.exception.NotFoundException;
import com.dh.TaskManager.repository.ITaskRepository;
import com.dh.TaskManager.service.ITaskService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementación concreta del servicio de tareas que gestiona las operaciones relacionadas con las tareas.
 */
@Service
public class TaskService implements ITaskService {

    private final ITaskRepository taskRepository;
    private final ObjectMapper objectMapper;

    /**
     * Constructor de la clase TaskService que realiza la inyección de dependencias del repositorio de tareas y del ObjectMapper.
     *
     * @param taskRepository La implementación concreta del repositorio de tareas que se utilizará en el servicio.
     *                       Se sigue el principio de inversión de dependencias al utilizar la interfaz ITaskRepository.
     * @param objectMapper   El objeto ObjectMapper que se utilizará para mapear objetos a JSON y viceversa.
     */
    public TaskService(ITaskRepository taskRepository, ObjectMapper objectMapper) {
        this.taskRepository = taskRepository;
        this.objectMapper = objectMapper;
    }

    private final String NOT_FOUND_MESSAGE = "No se encontró la tarea solicitada";

    /**
     * Crea una nueva tarea utilizando los datos proporcionados en el objeto TaskRequestDTO.
     *
     * @param taskDTO El objeto TaskRequestDTO que contiene los datos de la tarea a crear.
     * @return TaskResponseDTO El objeto TaskResponseDTO correspondiente a la tarea creada.
     */
    @Override
    public TaskResponseDTO createTask(TaskRequestDTO taskDTO) {
        Task task = objectMapper.convertValue(taskDTO, Task.class);
        Task taskSaved = taskRepository.save(task);
        return objectMapper.convertValue(taskSaved, TaskResponseDTO.class);
    }

    /**
     * Obtiene una tarea específica por su identificador.
     *
     * @param id El identificador único de la tarea.
     * @return TaskResponseDTO El objeto TaskResponseDTO correspondiente a la tarea solicitada.
     * @throws NotFoundException Si no se encuentra ninguna tarea con el identificador proporcionado.
     */
    @Override
    public TaskResponseDTO getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElse(null);

        if (task != null) {
            return mapToDTO(task);
        }
        throw new NotFoundException(NOT_FOUND_MESSAGE);

    }

    /**
     * Obtiene todas las tareas disponibles utilizando un flujo (stream) de datos.
     * Se utiliza un flujo para procesar de manera eficiente la lista de tareas y mapearlas
     * a objetos TaskResponseDTO.
     *
     * @return List<TaskResponseDTO> Una lista de objetos TaskResponseDTO que representan todas las tareas disponibles.
     */
    @Override
    public List<TaskResponseDTO> getAllTasks() {
        return taskRepository.findAll()
                .stream() // Inicia un flujo de datos sobre la lista de tareas
                .map(this::mapToDTO) // Mapea cada tarea a un objeto TaskResponseDTO utilizando un método de referencia
                .collect(Collectors.toList()); // Recopila los resultados en una lista
    }

    /**
     * Actualiza una tarea existente utilizando los datos proporcionados en el objeto TaskRequestToUpdateDTO.
     *      *
     * Este método inicia una transacción para garantizar la atomicidad de la operación, lo que significa
     * que todas las operaciones de base de datos realizadas dentro de este método se ejecutarán de manera
     * indivisible, es decir, todas o ninguna. Si alguna operación de base de datos falla, la transacción
     * se revertirá y se desharán todos los cambios.
     *      *
     * El método busca la tarea en la base de datos utilizando el identificador proporcionado en el objeto
     * TaskRequestToUpdateDTO. Si la tarea existe, se actualizan sus datos con los valores proporcionados
     * en el objeto TaskRequestToUpdateDTO, y luego se guarda la tarea actualizada en la base de datos.
     *      *
     * @param taskRequestDTO El objeto TaskRequestToUpdateDTO que contiene los datos actualizados de la tarea.
     * @return TaskResponseDTO El objeto TaskResponseDTO correspondiente a la tarea actualizada.
     * @throws NotFoundException Si no se encuentra ninguna tarea con el identificador proporcionado.
     */
    @Override
    @Transactional
    public TaskResponseDTO updateTask(TaskRequestToUpdateDTO taskRequestDTO) {
        Task task = taskRepository.findById(taskRequestDTO.getId())
                .orElse(null);

        if (task != null) {
            task.setTitle(taskRequestDTO.getTitle());
            task.setDescription(taskRequestDTO.getDescription());

            taskRepository.save(task);
            return mapToDTO(task);
        }
        throw new NotFoundException(NOT_FOUND_MESSAGE);
    }

    @Override
    public void deleteTaskById(Long id) {
        // Busca la tarea en la base de datos utilizando el identificador proporcionado
        Task task = taskRepository.findById(id)
                .orElse(null);

        // Si la tarea existe, actualiza sus datos y guarda la tarea actualizada en la base de datos
        if (task != null) {
            taskRepository.delete(task);
        }

        // Si la tarea no existe, lanza una excepción NotFoundException
        throw new NotFoundException(NOT_FOUND_MESSAGE);
    }

    /**
     * Convierte un objeto de tipo Task a un objeto de tipo TaskResponseDTO.
     *
     * @param task El objeto de tipo Task a convertir.
     * @return TaskResponseDTO El objeto TaskResponseDTO resultante de la conversión.
     */
    private TaskResponseDTO mapToDTO(Task task) {
        return objectMapper.convertValue(task, TaskResponseDTO.class);
    }

    /**
     * Convierte un objeto de tipo TaskResponseDTO a un objeto de tipo Task.
     *
     * @param taskResponseDTO El objeto de tipo TaskResponseDTO a convertir.
     * @return Task El objeto Task resultante de la conversión.
     */
    private Task mapToEntity(TaskResponseDTO taskResponseDTO) {
        return objectMapper.convertValue(taskResponseDTO, Task.class);
    }
}
