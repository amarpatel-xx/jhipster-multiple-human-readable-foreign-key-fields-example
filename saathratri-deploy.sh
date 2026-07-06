cd psqlgateway
# Keycloak must be healthy before the registry starts (its oauth2 profile
# resolves the OIDC issuer at boot), so run them sequentially in one tab.
ttab "docker compose -f src/main/docker/keycloak.yml up -d --wait && docker compose -f src/main/docker/jhipster-registry.yml up -d"
cd ..

cd psqlgateway
npm run docker:db:up
ttab ./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
cd ..

cd psqlstore
npm run docker:db:up
ttab ./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
cd ..

cd psqlblog
npm run docker:db:up
ttab ./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
cd ..
