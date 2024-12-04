# Use the official OpenJDK image as the base image
FROM openjdk:17-jdk-slim as build

# Set the working directory
WORKDIR /app

# Copy the Maven wrapper and pom.xml to the container
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download the project dependencies
RUN ./mvnw dependency:go-offline

# Copy the source code into the container
COPY src ./src

# Package the Spring Boot application
RUN ./mvnw clean package -DskipTests

# Create a new image with just the built application
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the packaged .jar file from the build stage
COPY --from=build /app/target/todolist-app-0.0.1-SNAPSHOT.jar /app/todolist-app.jar

# Set environment variables for MySQL user/password
ENV MYSQL_USER=${MYSQL_USER}
ENV MYSQL_PASSWORD=${MYSQL_PASSWORD}

# Expose the port that the application will run on
EXPOSE 5500

# Command to run the Spring Boot app
ENTRYPOINT ["java", "-jar", "/app/todolist-app.jar"]