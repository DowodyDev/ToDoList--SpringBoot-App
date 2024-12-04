# Use OpenJDK 17 as the base image
FROM openjdk:17-jdk-slim AS build

# Install Maven
RUN apt-get update && apt-get install -y maven

# Set the working directory in the container
WORKDIR /app

# Copy the pom.xml and other necessary files
COPY pom.xml .

# Install dependencies
RUN mvn dependency:go-offline

# Copy the entire projectg
COPY . .

# Build the app using Maven
RUN mvn clean install -DskipTests

# Use OpenJDK image to run the app
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the jar file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port the app will run on
EXPOSE 8080

# Command to run the app
CMD ["java", "-jar", "app.jar"]