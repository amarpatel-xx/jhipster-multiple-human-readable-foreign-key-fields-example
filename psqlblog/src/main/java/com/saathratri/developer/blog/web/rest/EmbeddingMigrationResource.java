package com.saathratri.developer.blog.web.rest;

import com.saathratri.developer.blog.service.embedding.EmbeddingMigrationService;
import com.saathratri.developer.blog.service.embedding.EmbeddingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for managing embedding migrations.
 * Provides endpoints to trigger one-time embedding generation for existing entities.
 */
@RestController
@RequestMapping("/api/admin/embeddings")
public class EmbeddingMigrationResource {

    private static final Logger LOG = LoggerFactory.getLogger(EmbeddingMigrationResource.class);

    private final EmbeddingMigrationService embeddingMigrationService;
    private final EmbeddingService embeddingService;

    public EmbeddingMigrationResource(EmbeddingMigrationService embeddingMigrationService, EmbeddingService embeddingService) {
        this.embeddingMigrationService = embeddingMigrationService;
        this.embeddingService = embeddingService;
    }

    /**
     * GET /api/admin/embeddings/status : Check embedding service status.
     *
     * @return status information
     */
    @GetMapping("/status")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<EmbeddingStatus> getStatus() {
        boolean available = embeddingService.isAvailable();
        return ResponseEntity.ok(
            new EmbeddingStatus(
                available,
                available ? "Embedding service is ready" : "Embedding service not configured. Set OPENAI_API_KEY environment variable"
            )
        );
    }

    /**
     * POST /api/admin/embeddings/migrate : Trigger embedding migration for all entities.
     * This is a synchronous operation that may take a long time for large datasets.
     *
     * @return migration summary
     */
    @PostMapping("/migrate")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<String> migrateEmbeddings() {
        LOG.info("REST request to migrate embeddings");
        String result = embeddingMigrationService.migrateAllEmbeddings();
        return ResponseEntity.ok(result);
    }

    /**
     * POST /api/admin/embeddings/migrate-async : Trigger async embedding migration.
     * Returns immediately while migration runs in background.
     *
     * @return acknowledgement
     */
    @PostMapping("/migrate-async")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<String> migrateEmbeddingsAsync() {
        LOG.info("REST request to migrate embeddings asynchronously");
        embeddingMigrationService.migrateAllEmbeddingsAsync();
        return ResponseEntity.accepted().body("Embedding migration started in background. Check logs for progress.");
    }

    /**
     * POST /api/admin/embeddings/migrate/tag : Migrate Tag embeddings only.
     *
     * @return migration summary for Tag
     */
    @PostMapping("/migrate/tag")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<String> migrateTagEmbeddings() {
        LOG.info("REST request to migrate Tag embeddings");
        String result = embeddingMigrationService.migrateTagEmbeddings();
        return ResponseEntity.ok(result);
    }

    /**
     * Status response object.
     */
    public record EmbeddingStatus(boolean available, String message) {}
}
