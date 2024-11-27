echo "Compiling Blog"
cd blog
./mvnw clean package -Pdev,api-docs -DskipTests
cd ..

echo "Compiling Store"
cd store
./mvnw clean package -Pdev,api-docs -DskipTests
cd ..

echo "Compiling Fateway"
cd gateway
./mvnw clean package -Pdev,api-docs -DskipTests
cd ..

echo "Completed compilation of Saathratri Development Version"
