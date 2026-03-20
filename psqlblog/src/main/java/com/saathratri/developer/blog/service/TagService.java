package com.saathratri.developer.blog.service;

import com.saathratri.developer.blog.service.dto.TagDTO;
import java.util.List;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.saathratri.developer.blog.domain.Tag}.
 */
public interface TagService {
    /**
     * Save a tag.
     *
     * @param tagDTO the entity to save.
     * @return the persisted entity.
     */
    TagDTO save(TagDTO tagDTO);

    /**
     * Updates a tag.
     *
     * @param tagDTO the entity to update.
     * @return the persisted entity.
     */
    TagDTO update(TagDTO tagDTO);

    /**
     * Partially updates a tag.
     *
     * @param tagDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<TagDTO> partialUpdate(TagDTO tagDTO);

    /**
     * Get all the tags for saathratri orchestrator.
     *
     * @return the list of entities.
     */
    List<TagDTO> findAllForSaathratriOrchestrator();

    /**
     * Get all the tags.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TagDTO> findAll(Pageable pageable);

    /**
     * Get the "id" tag.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TagDTO> findOne(UUID id);

    /**
     * Delete the "id" tag.
     *
     * @param id the id of the entity.
     */
    void delete(UUID id);

    // ==================== AI Text Search ====================

    /**
     * Search for tags using AI-powered semantic similarity.
     * Converts the text query to an embedding and searches across all vector fields.
     *
     * @param query the text query to search for
     * @param limit maximum number of results to return
     * @return list of semantically similar tags
     */
    List<TagDTO> aiSearch(String query, int limit);

    // ==================== Vector Similarity Search Methods ====================

    /**
     * Find tags similar to the given embedding vector using nameEmbedding.
     *
     * @param embedding the query embedding vector as a formatted string "[0.1, 0.2, ...]"
     * @param limit maximum number of results to return
     * @return list of tags ordered by similarity (most similar first)
     */
    List<TagDTO> findSimilarByNameEmbedding(String embedding, int limit);

    /**
     * Find tags similar to the given embedding vector using nameEmbedding with threshold.
     *
     * @param embedding the query embedding vector as a formatted string "[0.1, 0.2, ...]"
     * @param maxDistance maximum cosine distance (0 = identical, 2 = opposite)
     * @param limit maximum number of results to return
     * @return list of tags ordered by similarity (most similar first)
     */
    List<TagDTO> findSimilarByNameEmbeddingWithThreshold(String embedding, double maxDistance, int limit);

    /**
     * Find tags similar to the given embedding vector using descriptionEmbedding.
     *
     * @param embedding the query embedding vector as a formatted string "[0.1, 0.2, ...]"
     * @param limit maximum number of results to return
     * @return list of tags ordered by similarity (most similar first)
     */
    List<TagDTO> findSimilarByDescriptionEmbedding(String embedding, int limit);

    /**
     * Find tags similar to the given embedding vector using descriptionEmbedding with threshold.
     *
     * @param embedding the query embedding vector as a formatted string "[0.1, 0.2, ...]"
     * @param maxDistance maximum cosine distance (0 = identical, 2 = opposite)
     * @param limit maximum number of results to return
     * @return list of tags ordered by similarity (most similar first)
     */
    List<TagDTO> findSimilarByDescriptionEmbeddingWithThreshold(String embedding, double maxDistance, int limit);
}
