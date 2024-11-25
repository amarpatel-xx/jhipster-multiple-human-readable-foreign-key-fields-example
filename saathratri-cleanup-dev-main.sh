echo "Deleting Kubernetes..."
rm -fr kubernetes 
echo "Deleting docker-compose..."
rm -fr docker-compose 
echo "Deleting node_modules..."
rm -fr node_modules
echo "Deleting package.json..."
rm package.json
rm package-lock.json
echo "Deleting .yo-repository..."
rm -fr .yo-repository
rm .yo-rc.json
echo "Deleting .jhipster..."
rm -fr .jhipster
echo "Deleting target..."
rm -fr target
echo "Deleting .npmrc..."
rm -f .npmrc
echo "Deleting Gateway..."
rm -fr gateway
sh saathratri-cleanup-dev-sql.sh