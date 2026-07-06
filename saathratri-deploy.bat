@echo off
REM Bring up the full ai-postgresql example stack, each service in its own
REM Windows Terminal tab (mirrors the .sh version that uses `ttab`).
REM Requires Windows Terminal (`wt.exe`) — installed by default on Windows 11.

cd psqlgateway
REM Keycloak must be healthy before the registry starts (its oauth2 profile
REM resolves the OIDC issuer at boot), so run them sequentially in one tab.
wt -w 0 new-tab --title "Keycloak + Registry" -d "%cd%" cmd /k "docker compose -f src\main\docker\keycloak.yml up -d --wait && docker compose -f src\main\docker\jhipster-registry.yml up -d"
cd ..

cd psqlgateway
call npm run docker:db:up
wt -w 0 new-tab --title "Gateway" -d "%cd%" cmd /k "mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev"
cd ..

cd psqlstore
call npm run docker:db:up
echo Deploying Store Service...
wt -w 0 new-tab --title "Store" -d "%cd%" cmd /k "mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev"
cd ..

cd psqlblog
call npm run docker:db:up
echo Deploying Blog Service...
wt -w 0 new-tab --title "Blog" -d "%cd%" cmd /k "mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev"
cd ..
