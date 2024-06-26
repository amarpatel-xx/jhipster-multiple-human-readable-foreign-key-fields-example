sh copy-files.sh custom-files/ .

cd gateway
npm run docker:db:up
ttab ./mvnw spring-boot:run
cd ..

cd store
npm run docker:db:up
ttab ./mvnw spring-boot:run
cd ..

cd blog
npm run docker:db:up
ttab ./mvnw spring-boot:run
cd ..

cd gateway
ttab docker compose -f src/main/docker/keycloak.yml up -d
ttab docker compose -f src/main/docker/jhipster-registry.yml up -d
