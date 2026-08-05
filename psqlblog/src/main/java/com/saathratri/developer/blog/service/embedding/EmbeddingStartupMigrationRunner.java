package com.saathratri.developer.blog.service.embedding;

import com.saathratri.developer.blog.domain.Tag;
import com.saathratri.developer.blog.repository.TagRepository;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Application runner that automatically populates missing vector embeddings on startup.
 * Similar to Liquibase - only processes records that need embeddings, skips if already done.
 *
 * This runner:
 * 1. Checks each entity for records with NULL embeddings but non-NULL source fields
 * 2. Generates embeddings only for those records
 * 3. Skips entirely if all embeddings are already populated
 *
 * Enable/disable via application property:
 *   embedding.startup-migration.enabled=true (default: true)
 *
 * @see EmbeddingService
 * @see EmbeddingMigrationService
 */
@Component
@Order(100) // Run after Liquibase (which typically runs at order 0-10)
@ConditionalOnProperty(name = "embedding.startup-migration.enabled", havingValue = "true", matchIfMissing = true)
public class EmbeddingStartupMigrationRunner implements ApplicationRunner {

    private static final Logger LOG = LoggerFactory.getLogger(EmbeddingStartupMigrationRunner.class);

    private static final long RATE_LIMIT_DELAY_MS = 100; // Delay between API calls to respect rate limits

    private final EmbeddingService embeddingService;
    private final TagRepository tagRepository;

    public EmbeddingStartupMigrationRunner(EmbeddingService embeddingService, TagRepository tagRepository) {
        this.embeddingService = embeddingService;
        this.tagRepository = tagRepository;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        if (!embeddingService.isAvailable()) {
            LOG.info("Embedding service not available (OPENAI_API_KEY not configured). Skipping startup embedding migration.");
            return;
        }

        LOG.info("Starting embedding migration check...");

        int totalMigrated = 0;
        totalMigrated += migrateTagEmbeddingsIfNeeded();

        if (totalMigrated > 0) {
            LOG.info("Embedding startup migration completed. Total records updated: {}", totalMigrated);
        } else {
            LOG.info("Embedding startup migration: No records needed embedding updates.");
        }
    }

    /**
     * Migrate embeddings for Tag entities that have NULL embeddings.
     *
     * @return number of records updated
     */
    private int migrateTagEmbeddingsIfNeeded() {
        AtomicInteger updated = new AtomicInteger(0);

        // Find all entities - we'll filter in memory for those needing embeddings
        List<Tag> entities = tagRepository.findAll();
        LOG.info(": Found {} total records", entities.size());

        for (Tag entity : entities) {
            boolean wasUpdated = false;

            // Generate embedding for name -> nameEmbedding
            if (entity.getNameEmbedding() == null && entity.getName() != null) {
                String sourceText = entity.getName();
                if (sourceText != null && !sourceText.isBlank()) {
                    // Use vector string format for pgvector compatibility: "[0.1, 0.2, ...]"
                    float[] embedding = embeddingService.generateEmbedding(sourceText);
                    if (embedding != null) {
                        entity.setNameEmbedding(embedding);
                        wasUpdated = true;
                        LOG.debug("Generated nameEmbedding for Tag id={}", entity.getId());
                    }
                    rateLimitDelay();
                }
            }

            // Generate embedding for description -> descriptionEmbedding
            if (entity.getDescriptionEmbedding() == null && entity.getDescription() != null) {
                String sourceText = entity.getDescription();
                if (sourceText != null && !sourceText.isBlank()) {
                    // Use vector string format for pgvector compatibility: "[0.1, 0.2, ...]"
                    float[] embedding = embeddingService.generateEmbedding(sourceText);
                    if (embedding != null) {
                        entity.setDescriptionEmbedding(embedding);
                        wasUpdated = true;
                        LOG.debug("Generated descriptionEmbedding for Tag id={}", entity.getId());
                    }
                    rateLimitDelay();
                }
            }

            if (wasUpdated) {
                tagRepository.save(entity);
                updated.incrementAndGet();
            }
        }

        if (updated.get() > 0) {
            LOG.info("Tag: {} records updated with embeddings", updated.get());
        }

        return updated.get();
    }

    private void rateLimitDelay() {
        try {
            Thread.sleep(RATE_LIMIT_DELAY_MS);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
