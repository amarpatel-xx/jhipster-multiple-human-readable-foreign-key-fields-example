package com.saathratri.developer.blog.service.impl;

import com.saathratri.developer.blog.domain.Tag;
import com.saathratri.developer.blog.repository.TagRepository;
import com.saathratri.developer.blog.service.TagService;
import com.saathratri.developer.blog.service.dto.TagDTO;
import com.saathratri.developer.blog.service.embedding.EmbeddingService;
import com.saathratri.developer.blog.service.mapper.TagMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.saathratri.developer.blog.domain.Tag}.
 */
@Service
@Transactional
public class TagServiceImpl implements TagService {

    private static final Logger LOG = LoggerFactory.getLogger(TagServiceImpl.class);

    private final TagRepository tagRepository;

    private final TagMapper tagMapper;

    private final EmbeddingService embeddingService;

    public TagServiceImpl(TagRepository tagRepository, TagMapper tagMapper, EmbeddingService embeddingService) {
        this.tagRepository = tagRepository;
        this.tagMapper = tagMapper;
        this.embeddingService = embeddingService;
    }

    @Override
    public TagDTO save(TagDTO tagDTO) {
        LOG.debug("Request to save Tag : {}", tagDTO);
        Tag tag = tagMapper.toEntity(tagDTO);
        generateEmbeddings(tag);
        tag = tagRepository.save(tag);
        return tagMapper.toDto(tag);
    }

    @Override
    public TagDTO update(TagDTO tagDTO) {
        LOG.debug("Request to update Tag : {}", tagDTO);
        Tag tag = tagMapper.toEntity(tagDTO);
        generateEmbeddings(tag);
        tag = tagRepository.save(tag);
        return tagMapper.toDto(tag);
    }

    @Override
    public Optional<TagDTO> partialUpdate(TagDTO tagDTO) {
        LOG.debug("Request to partially update Tag : {}", tagDTO);

        return tagRepository
            .findById(tagDTO.getId())
            .map(existingTag -> {
                tagMapper.partialUpdate(existingTag, tagDTO);

                return existingTag;
            })
            .map(tagRepository::save)
            .map(tagMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TagDTO> findAllForSaathratriOrchestrator() {
        LOG.debug("Request to get all Tags for saathratri orchestrator");
        return tagRepository.findAll().stream().map(tagMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TagDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all Tags");
        return tagRepository.findAll(pageable).map(tagMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TagDTO> findOne(UUID id) {
        LOG.debug("Request to get Tag : {}", id);
        return tagRepository.findById(id).map(tagMapper::toDto);
    }

    @Override
    public void delete(UUID id) {
        LOG.debug("Request to delete Tag : {}", id);
        tagRepository.deleteById(id);
    }

    // ==================== AI Text Search ====================

    @Override
    @Transactional(readOnly = true)
    public List<TagDTO> aiSearch(String query, int limit) {
        LOG.debug("Request to AI search Tags for query: {}, limit: {}", query, limit);

        if (query == null || query.isBlank()) {
            return List.of();
        }

        if (!embeddingService.isAvailable()) {
            LOG.warn("Embedding service not available for AI search, returning empty results");
            return List.of();
        }

        String embeddingStr = embeddingService.generateEmbeddingAsVectorString(query);
        if (embeddingStr == null) {
            LOG.warn("Failed to generate embedding for AI search query, returning empty results");
            return List.of();
        }

        // Search across all vector fields and merge results (deduplicated by ID)
        // Use cosine distance threshold of 0.8 to filter out unrelated results
        // Cosine distance: 0 = identical, 1 = orthogonal, 2 = opposite
        double maxDistance = 0.8;
        java.util.Map<UUID, TagDTO> resultMap = new java.util.LinkedHashMap<>();

        // Search by nameEmbedding
        tagRepository
            .findSimilarByNameEmbeddingWithThreshold(embeddingStr, maxDistance, limit)
            .stream()
            .map(tagMapper::toDto)
            .forEach(item -> resultMap.putIfAbsent(item.getId(), item));

        // Search by descriptionEmbedding
        tagRepository
            .findSimilarByDescriptionEmbeddingWithThreshold(embeddingStr, maxDistance, limit)
            .stream()
            .map(tagMapper::toDto)
            .forEach(item -> resultMap.putIfAbsent(item.getId(), item));

        return new java.util.ArrayList<>(resultMap.values());
    }

    // ==================== Vector Similarity Search Methods ====================

    @Override
    @Transactional(readOnly = true)
    public List<TagDTO> findSimilarByNameEmbedding(String embedding, int limit) {
        LOG.debug("Request to find Tags similar by nameEmbedding, limit: {}", limit);
        return tagRepository.findSimilarByNameEmbedding(embedding, limit).stream().map(tagMapper::toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<TagDTO> findSimilarByNameEmbeddingWithThreshold(String embedding, double maxDistance, int limit) {
        LOG.debug("Request to find Tags similar by nameEmbedding with threshold, maxDistance: {}, limit: {}", maxDistance, limit);
        return tagRepository
            .findSimilarByNameEmbeddingWithThreshold(embedding, maxDistance, limit)
            .stream()
            .map(tagMapper::toDto)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<TagDTO> findSimilarByDescriptionEmbedding(String embedding, int limit) {
        LOG.debug("Request to find Tags similar by descriptionEmbedding, limit: {}", limit);
        return tagRepository
            .findSimilarByDescriptionEmbedding(embedding, limit)
            .stream()
            .map(tagMapper::toDto)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<TagDTO> findSimilarByDescriptionEmbeddingWithThreshold(String embedding, double maxDistance, int limit) {
        LOG.debug("Request to find Tags similar by descriptionEmbedding with threshold, maxDistance: {}, limit: {}", maxDistance, limit);
        return tagRepository
            .findSimilarByDescriptionEmbeddingWithThreshold(embedding, maxDistance, limit)
            .stream()
            .map(tagMapper::toDto)
            .collect(Collectors.toList());
    }

    // ==================== Embedding Generation ====================

    /**
     * Generate embeddings for all vector fields from their source text fields.
     * Called automatically on save and update operations.
     */
    private void generateEmbeddings(Tag tag) {
        if (!embeddingService.isAvailable()) {
            LOG.debug("Embedding service not available, skipping embedding generation for Tag");
            return;
        }
        {
            String sourceText = tag.getName();
            float[] embedding = embeddingService.generateEmbedding(sourceText);
            if (embedding != null) {
                tag.setNameEmbedding(embedding);
                LOG.debug("Generated embedding for name ({} dimensions)", embedding.length);
            }
        }
        {
            String sourceText = tag.getDescription();
            float[] embedding = embeddingService.generateEmbedding(sourceText);
            if (embedding != null) {
                tag.setDescriptionEmbedding(embedding);
                LOG.debug("Generated embedding for description ({} dimensions)", embedding.length);
            }
        }
    }
}
