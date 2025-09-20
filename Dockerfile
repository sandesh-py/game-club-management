# Root-level Dockerfile to build the GameAPI subproject on Render

# --- Build stage ---
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copy Maven descriptor first to leverage caching
COPY GameAPI/pom.xml ./pom.xml
RUN mvn -q -e -B -DskipTests dependency:go-offline

# Copy source and build
COPY GameAPI/src ./src
RUN mvn -q -e -B -DskipTests package

# --- Run stage ---
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copy the fat jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Render provides $PORT; expose for local dev too
ENV PORT=8080
EXPOSE 8080

# Use PORT variable for server.port
ENTRYPOINT ["sh", "-c", "java -XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -Dserver.port=${PORT} -jar app.jar"]


