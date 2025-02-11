package dev.dowody.todolist_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin(origins = "http://localhost:5500")
public class App {
	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}
}
