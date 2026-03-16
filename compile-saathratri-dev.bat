@echo off
echo Compiling Blog
cd psqlblog
call mvnw.cmd clean package -Pdev,api-docs -DskipTests
cd ..

echo Compiling Store
cd psqlstore
call mvnw.cmd clean package -Pdev,api-docs -DskipTests
cd ..

echo Compiling Gateway
cd psqlgateway
call mvnw.cmd clean package -Pdev,api-docs -DskipTests
cd ..

echo Completed compilation of Saathratri Development Version
