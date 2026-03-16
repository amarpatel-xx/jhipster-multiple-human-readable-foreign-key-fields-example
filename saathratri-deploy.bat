@echo off
cd psqlgateway
docker compose -f src\main\docker\keycloak.yml up -d
docker compose -f src\main\docker\jhipster-registry.yml up -d
cd ..

cd psqlgateway
call npm run docker:db:up
start "Gateway" cmd /k "mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev"
cd ..

cd psqlstore
call npm run docker:db:up
start "Store" cmd /k "mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev"
cd ..

cd psqlblog
call npm run docker:db:up
start "Blog" cmd /k "mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev"
cd ..
