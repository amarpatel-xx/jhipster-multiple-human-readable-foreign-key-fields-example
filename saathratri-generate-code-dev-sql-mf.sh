echo "Cleaning up previous code..."
sh cleanup.sh
echo "Generating code..."
jhipster --blueprints ai-postgresql jdl non-reactive-mf.jdl --monorepository --workspaces --skip-jhipster-dependencies --skip-git

