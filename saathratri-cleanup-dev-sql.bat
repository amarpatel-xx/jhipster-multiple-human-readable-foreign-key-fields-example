@echo off
echo Cleaning up the dev environment for Saathratri SQL
if exist .yo-rc.json del .yo-rc.json
if exist psqlgateway rmdir /s /q psqlgateway
if exist psqlblog rmdir /s /q psqlblog
if exist psqlstore rmdir /s /q psqlstore
if exist docker-compose rmdir /s /q docker-compose
if exist kubernetes rmdir /s /q kubernetes
if exist node_modules rmdir /s /q node_modules
if exist package.json del package.json
if exist package-lock.json del package-lock.json
if exist .gitignore del .gitignore
