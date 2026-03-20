package com.saathratri.developer.blog.web.rest;

import com.saathratri.developer.blog.repository.TagRepository;
import com.saathratri.developer.blog.service.TagService;
import com.saathratri.developer.blog.service.dto.TagDTO;
import com.saathratri.developer.blog.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.saathratri.developer.blog.domain.Tag}.
 */
@RestController
@RequestMapping("/api/tags")
public class TagResource {

    private static final Logger LOG = LoggerFactory.getLogger(TagResource.class);

    private static final String ENTITY_NAME = "psqlblogTag";

    @Value("${jhipster.clientApp.name:psqlblog}")
    private String applicationName;

    private final TagService tagService;

    private final TagRepository tagRepository;

    public TagResource(TagService tagService, TagRepository tagRepository) {
        this.tagService = tagService;
        this.tagRepository = tagRepository;
    }

    /**
     * {@code POST  /tags} : Create a new tag.
     *
     * @param tagDTO the tagDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tagDTO, or with status {@code 400 (Bad Request)} if the tag has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<TagDTO> createTag(@Valid @RequestBody TagDTO tagDTO) throws URISyntaxException {
        LOG.debug("REST request to save Tag : {}", tagDTO);
        if (tagDTO.getId() != null) {
            throw new BadRequestAlertException("A new tag cannot already have an ID", ENTITY_NAME, "idexists");
        }
        tagDTO = tagService.save(tagDTO);
        return ResponseEntity.created(new URI("/api/tags/" + tagDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, tagDTO.getId().toString()))
            .body(tagDTO);
    }

    /**
     * {@code PUT  /tags/:id} : Updates an existing tag.
     *
     * @param id the id of the tagDTO to save.
     * @param tagDTO the tagDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tagDTO,
     * or with status {@code 400 (Bad Request)} if the tagDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tagDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<TagDTO> updateTag(@PathVariable(value = "id", required = false) final UUID id, @Valid @RequestBody TagDTO tagDTO)
        throws URISyntaxException {
        LOG.debug("REST request to update Tag : {}, {}", id, tagDTO);
        if (tagDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tagDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tagRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        tagDTO = tagService.update(tagDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tagDTO.getId().toString()))
            .body(tagDTO);
    }

    /**
     * {@code PATCH  /tags/:id} : Partial updates given fields of an existing tag, field will ignore if it is null
     *
     * @param id the id of the tagDTO to save.
     * @param tagDTO the tagDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tagDTO,
     * or with status {@code 400 (Bad Request)} if the tagDTO is not valid,
     * or with status {@code 404 (Not Found)} if the tagDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the tagDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TagDTO> partialUpdateTag(
        @PathVariable(value = "id", required = false) final UUID id,
        @NotNull @RequestBody TagDTO tagDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Tag partially : {}, {}", id, tagDTO);
        if (tagDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tagDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tagRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TagDTO> result = tagService.partialUpdate(tagDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tagDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /tags} : get all the Tags.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Tags in body.
     */
    @GetMapping("")
    public ResponseEntity<List<TagDTO>> getAllTags(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        LOG.debug("REST request to get a page of Tags");
        Page<TagDTO> page = tagService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /saathratri-orchestrator} : get all the Tags.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Tags in body.
     */
    @GetMapping("/saathratri-orchestrator")
    public ResponseEntity<List<TagDTO>> getAllTagsForSaathratriOrchestrator() {
        LOG.debug("REST request to get all Tags for saathratri orchestrator");
        List<TagDTO> entityList;
        entityList = tagService.findAllForSaathratriOrchestrator();
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /tags/:id} : get the "id" tag.
     *
     * @param id the id of the tagDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tagDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<TagDTO> getTag(@PathVariable("id") UUID id) {
        LOG.debug("REST request to get Tag : {}", id);
        Optional<TagDTO> tagDTO = tagService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tagDTO);
    }

    /**
     * {@code DELETE  /tags/:id} : delete the "id" tag.
     *
     * @param id the id of the tagDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTag(@PathVariable("id") UUID id) {
        LOG.debug("REST request to delete Tag : {}", id);
        tagService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    // ==================== AI Text Search Endpoint ====================

    /**
     * {@code GET  /tags/ai-search} : search for Tags using AI-powered semantic similarity.
     * Converts the text query to an embedding and searches across all vector fields.
     *
     * @param query the text query to search for.
     * @param limit maximum number of results to return (default: 10).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of matching Tags in body.
     */
    @GetMapping("/ai-search")
    public ResponseEntity<List<TagDTO>> aiSearch(
        @RequestParam("query") String query,
        @RequestParam(value = "limit", defaultValue = "10") int limit
    ) {
        LOG.debug("REST request to AI search Tags for query: {}, limit: {}", query, limit);
        List<TagDTO> result = tagService.aiSearch(query, limit);
        return ResponseEntity.ok().body(result);
    }

    // ==================== Vector Similarity Search Endpoints ====================

    /**
     * {@code POST  /tags/vector-search/nameEmbedding} : search for Tags similar to the given embedding.
     *
     * @param embedding the query embedding vector as a JSON array string (e.g., "[0.1, 0.2, ...]")
     * @param limit maximum number of results to return (default: 10)
     * @return the list of similar Tags ordered by similarity.
     */
    @PostMapping("/vector-search/nameEmbedding")
    public ResponseEntity<List<TagDTO>> searchSimilarByNameEmbedding(
        @RequestBody String embedding,
        @RequestParam(value = "limit", defaultValue = "10") int limit
    ) {
        LOG.debug("REST request to search Tags similar by nameEmbedding, limit: {}", limit);
        List<TagDTO> result = tagService.findSimilarByNameEmbedding(embedding, limit);
        return ResponseEntity.ok().body(result);
    }

    /**
     * {@code POST  /tags/vector-search/nameEmbedding/threshold} : search for Tags similar to the given embedding with distance threshold.
     *
     * @param embedding the query embedding vector as a JSON array string (e.g., "[0.1, 0.2, ...]")
     * @param maxDistance maximum cosine distance (0 = identical, 2 = opposite). Default: 0.5
     * @param limit maximum number of results to return (default: 10)
     * @return the list of similar Tags ordered by similarity.
     */
    @PostMapping("/vector-search/nameEmbedding/threshold")
    public ResponseEntity<List<TagDTO>> searchSimilarByNameEmbeddingWithThreshold(
        @RequestBody String embedding,
        @RequestParam(value = "maxDistance", defaultValue = "0.5") double maxDistance,
        @RequestParam(value = "limit", defaultValue = "10") int limit
    ) {
        LOG.debug("REST request to search Tags similar by nameEmbedding with threshold, maxDistance: {}, limit: {}", maxDistance, limit);
        List<TagDTO> result = tagService.findSimilarByNameEmbeddingWithThreshold(embedding, maxDistance, limit);
        return ResponseEntity.ok().body(result);
    }

    /**
     * {@code POST  /tags/vector-search/descriptionEmbedding} : search for Tags similar to the given embedding.
     *
     * @param embedding the query embedding vector as a JSON array string (e.g., "[0.1, 0.2, ...]")
     * @param limit maximum number of results to return (default: 10)
     * @return the list of similar Tags ordered by similarity.
     */
    @PostMapping("/vector-search/descriptionEmbedding")
    public ResponseEntity<List<TagDTO>> searchSimilarByDescriptionEmbedding(
        @RequestBody String embedding,
        @RequestParam(value = "limit", defaultValue = "10") int limit
    ) {
        LOG.debug("REST request to search Tags similar by descriptionEmbedding, limit: {}", limit);
        List<TagDTO> result = tagService.findSimilarByDescriptionEmbedding(embedding, limit);
        return ResponseEntity.ok().body(result);
    }

    /**
     * {@code POST  /tags/vector-search/descriptionEmbedding/threshold} : search for Tags similar to the given embedding with distance threshold.
     *
     * @param embedding the query embedding vector as a JSON array string (e.g., "[0.1, 0.2, ...]")
     * @param maxDistance maximum cosine distance (0 = identical, 2 = opposite). Default: 0.5
     * @param limit maximum number of results to return (default: 10)
     * @return the list of similar Tags ordered by similarity.
     */
    @PostMapping("/vector-search/descriptionEmbedding/threshold")
    public ResponseEntity<List<TagDTO>> searchSimilarByDescriptionEmbeddingWithThreshold(
        @RequestBody String embedding,
        @RequestParam(value = "maxDistance", defaultValue = "0.5") double maxDistance,
        @RequestParam(value = "limit", defaultValue = "10") int limit
    ) {
        LOG.debug(
            "REST request to search Tags similar by descriptionEmbedding with threshold, maxDistance: {}, limit: {}",
            maxDistance,
            limit
        );
        List<TagDTO> result = tagService.findSimilarByDescriptionEmbeddingWithThreshold(embedding, maxDistance, limit);
        return ResponseEntity.ok().body(result);
    }
}
