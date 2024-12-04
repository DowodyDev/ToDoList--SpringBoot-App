package dev.dowody.todolist_app.repository;

import dev.dowody.todolist_app.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
