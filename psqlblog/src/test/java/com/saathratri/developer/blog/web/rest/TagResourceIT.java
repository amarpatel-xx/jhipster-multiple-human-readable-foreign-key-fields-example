package com.saathratri.developer.blog.web.rest;

import static com.saathratri.developer.blog.domain.TagAsserts.*;
import static com.saathratri.developer.blog.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.not;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.saathratri.developer.blog.IntegrationTest;
import com.saathratri.developer.blog.domain.Tag;
import com.saathratri.developer.blog.repository.TagRepository;
import com.saathratri.developer.blog.service.dto.TagDTO;
import com.saathratri.developer.blog.service.mapper.TagMapper;
import jakarta.persistence.EntityManager;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.ai.embedding.Embedding;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.embedding.EmbeddingResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link TagResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TagResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/tags";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private TagMapper tagMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTagMockMvc;

    private Tag tag;

    private Tag insertedTag;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tag createEntity() {
        return new Tag().name(DEFAULT_NAME).description(DEFAULT_DESCRIPTION);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tag createUpdatedEntity() {
        return new Tag().name(UPDATED_NAME).description(UPDATED_DESCRIPTION);
    }

    @BeforeEach
    void initTest() {
        tag = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedTag != null) {
            tagRepository.delete(insertedTag);
            insertedTag = null;
        }
    }

    @Test
    @Transactional
    void createTag() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Tag
        TagDTO tagDTO = tagMapper.toDto(tag);
        var returnedTagDTO = om.readValue(
            restTagMockMvc
                .perform(post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(tagDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            TagDTO.class
        );

        // Validate the Tag in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedTag = tagMapper.toEntity(returnedTagDTO);
        assertTagUpdatableFieldsEquals(returnedTag, getPersistedTag(returnedTag));

        insertedTag = returnedTag;
    }

    @Test
    @Transactional
    void createTagWithExistingId() throws Exception {
        // Create the Tag with an existing ID
        insertedTag = tagRepository.saveAndFlush(tag);
        TagDTO tagDTO = tagMapper.toDto(tag);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTagMockMvc
            .perform(post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(tagDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Tag in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        tag.setName(null);

        // Create the Tag, which fails.
        TagDTO tagDTO = tagMapper.toDto(tag);

        restTagMockMvc
            .perform(post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(tagDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTags() throws Exception {
        // Initialize the database
        insertedTag = tagRepository.saveAndFlush(tag);

        // Get all the tagList
        restTagMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tag.getId().toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }

    @Test
    @Transactional
    void getTag() throws Exception {
        // Initialize the database
        insertedTag = tagRepository.saveAndFlush(tag);

        // Get the tag
        restTagMockMvc
            .perform(get(ENTITY_API_URL_ID, tag.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tag.getId().toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    void getNonExistingTag() throws Exception {
        // Get the tag
        restTagMockMvc.perform(get(ENTITY_API_URL_ID, UUID.randomUUID().toString())).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingTag() throws Exception {
        // Initialize the database
        insertedTag = tagRepository.saveAndFlush(tag);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the tag
        Tag updatedTag = tagRepository.findById(tag.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedTag are not directly saved in db
        em.detach(updatedTag);
        updatedTag.name(UPDATED_NAME).description(UPDATED_DESCRIPTION);
        TagDTO tagDTO = tagMapper.toDto(updatedTag);

        restTagMockMvc
            .perform(
                put(ENTITY_API_URL_ID, tagDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(tagDTO))
            )
            .andExpect(status().isOk());

        // Validate the Tag in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedTagToMatchAllProperties(updatedTag);
    }

    @Test
    @Transactional
    void putNonExistingTag() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        tag.setId(UUID.randomUUID());

        // Create the Tag
        TagDTO tagDTO = tagMapper.toDto(tag);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTagMockMvc
            .perform(
                put(ENTITY_API_URL_ID, tagDTO.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(tagDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Tag in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTag() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        tag.setId(UUID.randomUUID());

        // Create the Tag
        TagDTO tagDTO = tagMapper.toDto(tag);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTagMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(tagDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Tag in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTag() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        tag.setId(UUID.randomUUID());

        // Create the Tag
        TagDTO tagDTO = tagMapper.toDto(tag);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTagMockMvc
            .perform(put(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(tagDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Tag in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTagWithPatch() throws Exception {
        // Initialize the database
        insertedTag = tagRepository.saveAndFlush(tag);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the tag using partial update
        Tag partialUpdatedTag = new Tag();
        partialUpdatedTag.setId(tag.getId());

        restTagMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTag.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedTag))
            )
            .andExpect(status().isOk());

        // Validate the Tag in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertTagUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedTag, tag), getPersistedTag(tag));
    }

    @Test
    @Transactional
    void fullUpdateTagWithPatch() throws Exception {
        // Initialize the database
        insertedTag = tagRepository.saveAndFlush(tag);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the tag using partial update
        Tag partialUpdatedTag = new Tag();
        partialUpdatedTag.setId(tag.getId());

        partialUpdatedTag.name(UPDATED_NAME).description(UPDATED_DESCRIPTION);

        restTagMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTag.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedTag))
            )
            .andExpect(status().isOk());

        // Validate the Tag in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertTagUpdatableFieldsEquals(partialUpdatedTag, getPersistedTag(partialUpdatedTag));
    }

    @Test
    @Transactional
    void patchNonExistingTag() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        tag.setId(UUID.randomUUID());

        // Create the Tag
        TagDTO tagDTO = tagMapper.toDto(tag);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTagMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, tagDTO.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(tagDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Tag in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTag() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        tag.setId(UUID.randomUUID());

        // Create the Tag
        TagDTO tagDTO = tagMapper.toDto(tag);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTagMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(tagDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Tag in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTag() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        tag.setId(UUID.randomUUID());

        // Create the Tag
        TagDTO tagDTO = tagMapper.toDto(tag);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTagMockMvc
            .perform(patch(ENTITY_API_URL).with(csrf()).contentType("application/merge-patch+json").content(om.writeValueAsBytes(tagDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Tag in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTag() throws Exception {
        // Initialize the database
        insertedTag = tagRepository.saveAndFlush(tag);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the tag
        restTagMockMvc
            .perform(delete(ENTITY_API_URL_ID, tag.getId().toString()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return tagRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected Tag getPersistedTag(Tag tag) {
        return tagRepository.findById(tag.getId()).orElseThrow();
    }

    protected void assertPersistedTagToMatchAllProperties(Tag expectedTag) {
        assertTagAllPropertiesEquals(expectedTag, getPersistedTag(expectedTag));
    }

    protected void assertPersistedTagToMatchUpdatableProperties(Tag expectedTag) {
        assertTagAllUpdatablePropertiesEquals(expectedTag, getPersistedTag(expectedTag));
    }

    // ==================== Vector / AI-search integration tests (Saathratri) ====================

    private static final float[] DEFAULT_NAME_EMBEDDING = sampleVectorSaathratri(1536, 0.10f);

    private static final float[] DEFAULT_DESCRIPTION_EMBEDDING = sampleVectorSaathratri(1536, 0.10f);

    @MockitoBean
    private EmbeddingModel embeddingModelSaathratriMock;

    /**
     * Build a deterministic, non-zero embedding of the given dimension so it round-trips through the
     * <code>vector(n)</code> column and yields a well-defined cosine distance (a zero vector is undefined).
     */
    private static float[] sampleVectorSaathratri(int dimension, float base) {
        float[] vector = new float[dimension];
        for (int i = 0; i < dimension; i++) {
            vector[i] = base + ((i % 8) * 0.01f);
        }
        return vector;
    }

    /**
     * Format a float[] as a pgvector literal "[v1, v2, ...]" for the vector-search request body.
     */
    private static String vectorToPgStringSaathratri(float[] vector) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < vector.length; i++) {
            if (i > 0) {
                sb.append(", ");
            }
            sb.append(String.format(java.util.Locale.ROOT, "%.8f", vector[i]));
        }
        return sb.append("]").toString();
    }

    @Test
    @Transactional
    void vectorSearchByNameEmbeddingReturnsTheSimilarRow() throws Exception {
        // Persist a row whose nameEmbedding equals the query vector (cosine distance 0).
        tag.setNameEmbedding(DEFAULT_NAME_EMBEDDING);
        insertedTag = tagRepository.saveAndFlush(tag);

        restTagMockMvc
            .perform(
                post(ENTITY_API_URL + "/vector-search/nameEmbedding")
                    .with(csrf())
                    .param("limit", "10")
                    .contentType(MediaType.TEXT_PLAIN)
                    .content(vectorToPgStringSaathratri(DEFAULT_NAME_EMBEDDING))
            )
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$.[*].id").value(hasItem(insertedTag.getId().toString())));
    }

    @Test
    @Transactional
    void vectorSearchByNameEmbeddingWithThresholdFiltersByDistance() throws Exception {
        tag.setNameEmbedding(DEFAULT_NAME_EMBEDDING);
        insertedTag = tagRepository.saveAndFlush(tag);
        String queryVector = vectorToPgStringSaathratri(DEFAULT_NAME_EMBEDDING);

        // A generous threshold keeps the identical match (distance 0 < 1.0).
        restTagMockMvc
            .perform(
                post(ENTITY_API_URL + "/vector-search/nameEmbedding/threshold")
                    .with(csrf())
                    .param("maxDistance", "1.0")
                    .param("limit", "10")
                    .contentType(MediaType.TEXT_PLAIN)
                    .content(queryVector)
            )
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.[*].id").value(hasItem(insertedTag.getId().toString())));

        // The native query uses a strict "< maxDistance", so maxDistance 0.0 excludes even an identical match.
        restTagMockMvc
            .perform(
                post(ENTITY_API_URL + "/vector-search/nameEmbedding/threshold")
                    .with(csrf())
                    .param("maxDistance", "0.0")
                    .param("limit", "10")
                    .contentType(MediaType.TEXT_PLAIN)
                    .content(queryVector)
            )
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$.[*].id").value(not(hasItem(insertedTag.getId().toString()))));
    }

    @Test
    @Transactional
    void vectorSearchByDescriptionEmbeddingReturnsTheSimilarRow() throws Exception {
        // Persist a row whose descriptionEmbedding equals the query vector (cosine distance 0).
        tag.setDescriptionEmbedding(DEFAULT_DESCRIPTION_EMBEDDING);
        insertedTag = tagRepository.saveAndFlush(tag);

        restTagMockMvc
            .perform(
                post(ENTITY_API_URL + "/vector-search/descriptionEmbedding")
                    .with(csrf())
                    .param("limit", "10")
                    .contentType(MediaType.TEXT_PLAIN)
                    .content(vectorToPgStringSaathratri(DEFAULT_DESCRIPTION_EMBEDDING))
            )
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$.[*].id").value(hasItem(insertedTag.getId().toString())));
    }

    @Test
    @Transactional
    void vectorSearchByDescriptionEmbeddingWithThresholdFiltersByDistance() throws Exception {
        tag.setDescriptionEmbedding(DEFAULT_DESCRIPTION_EMBEDDING);
        insertedTag = tagRepository.saveAndFlush(tag);
        String queryVector = vectorToPgStringSaathratri(DEFAULT_DESCRIPTION_EMBEDDING);

        // A generous threshold keeps the identical match (distance 0 < 1.0).
        restTagMockMvc
            .perform(
                post(ENTITY_API_URL + "/vector-search/descriptionEmbedding/threshold")
                    .with(csrf())
                    .param("maxDistance", "1.0")
                    .param("limit", "10")
                    .contentType(MediaType.TEXT_PLAIN)
                    .content(queryVector)
            )
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.[*].id").value(hasItem(insertedTag.getId().toString())));

        // The native query uses a strict "< maxDistance", so maxDistance 0.0 excludes even an identical match.
        restTagMockMvc
            .perform(
                post(ENTITY_API_URL + "/vector-search/descriptionEmbedding/threshold")
                    .with(csrf())
                    .param("maxDistance", "0.0")
                    .param("limit", "10")
                    .contentType(MediaType.TEXT_PLAIN)
                    .content(queryVector)
            )
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$.[*].id").value(not(hasItem(insertedTag.getId().toString()))));
    }

    @Test
    @Transactional
    void aiSearchReturnsSemanticMatchesWhenEmbeddingModelIsAvailable() throws Exception {
        tag.setNameEmbedding(DEFAULT_NAME_EMBEDDING);
        insertedTag = tagRepository.saveAndFlush(tag);
        // Mock the embedding model so the text query embeds to the same vector stored above
        // (cosine distance 0, well within the service's 0.8 threshold).
        when(embeddingModelSaathratriMock.embedForResponse(any())).thenReturn(
            new EmbeddingResponse(List.of(new Embedding(DEFAULT_NAME_EMBEDDING, 0)))
        );

        restTagMockMvc
            .perform(get(ENTITY_API_URL + "/ai-search").param("query", "find similar rows").param("limit", "10"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$.[*].id").value(hasItem(insertedTag.getId().toString())));
    }

    @Test
    @Transactional
    void aiSearchReturnsEmptyForBlankQuery() throws Exception {
        restTagMockMvc
            .perform(get(ENTITY_API_URL + "/ai-search").param("query", "  ").param("limit", "10"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$.length()").value(0));
    }

    @Test
    @Transactional
    void nameEmbeddingRoundTripsThroughTheVectorColumn() {
        // A float[] written through the entity persists into the vector(1536) column.
        // Read it back as text via native SQL (the pgvector text form is "[v1,v2,...]") and assert it
        // stored as a vector of the expected dimension. This verifies the column round-trip without
        // loading the entity, whose vector read goes through the PgVectorType converter.
        tag.setNameEmbedding(DEFAULT_NAME_EMBEDDING);
        insertedTag = tagRepository.saveAndFlush(tag);

        Object storedVector = em
            .createNativeQuery("SELECT CAST(name_embedding AS text) FROM tag WHERE id = :id")
            .setParameter("id", insertedTag.getId())
            .getSingleResult();

        assertThat(storedVector).isNotNull();
        String vectorText = storedVector.toString().trim();
        assertThat(vectorText).startsWith("[").endsWith("]");
        assertThat(vectorText.substring(1, vectorText.length() - 1).split(",")).hasSize(DEFAULT_NAME_EMBEDDING.length);
    }
}
