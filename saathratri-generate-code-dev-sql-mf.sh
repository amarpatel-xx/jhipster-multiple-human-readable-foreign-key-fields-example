echo "Cleaning up previous code..."
sh cleanup.sh
echo "Generating code..."
jhipster --blueprints multiple-human-readable-foreign-key-fields jdl non-reactive-mf.jdl --monorepository --workspaces --skip-jhipster-dependencies

