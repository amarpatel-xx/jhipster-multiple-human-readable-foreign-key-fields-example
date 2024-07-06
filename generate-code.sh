sh cleanup.sh
jhipster --blueprints multiple-human-readable-foreign-key-fields jdl non-reactive-mf.jdl --monorepository --workspaces --skip-jhipster-dependencies
sh copy-files.sh custom-files/ .
