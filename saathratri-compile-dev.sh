echo "Compiling Blog"
cd psqlblog
./mvnw clean package -Pdev,api-docs -DskipTests
cd ..

echo "Compiling Store"
cd psqlstore
./mvnw clean package -Pdev,api-docs -DskipTests
cd ..

echo "Compiling Gateway"
cd psqlgateway
./mvnw clean package -Pdev,api-docs -DskipTests
cd ..

echo "Completed compilation of Saathratri Development Version"
