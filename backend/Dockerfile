# 1. Maven ilə build mərhələsi
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# 2. OpenJDK ilə run mərhələsi 

FROM openjdk:17-jdk-slim
WORKDIR /app

# 3. Build olunmuş jar faylını və `application.docker.properties` faylını kopyala
COPY --from=builder /app/target/*.jar app.jar
COPY application.docker.properties /app/config/application.properties  

# 4. Spring Boot tətbiqi başlatmaq
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
