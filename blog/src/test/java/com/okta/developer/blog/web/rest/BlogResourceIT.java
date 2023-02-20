package com.okta.developer.blog.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.okta.developer.blog.IntegrationTest;
import com.okta.developer.blog.domain.Blog;
import com.okta.developer.blog.repository.BlogRepository;
import com.okta.developer.blog.repository.UserRepository;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

/**
 * Integration tests for the {@link BlogResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class BlogResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_HANDLE = "AAAAAAAAAA";
    private static final String UPDATED_HANDLE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/blogs";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MockMvc restBlogMockMvc;

    private Blog blog;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Blog createEntity() {
        Blog blog = new Blog().name(DEFAULT_NAME).handle(DEFAULT_HANDLE);
        return blog;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Blog createUpdatedEntity() {
        Blog blog = new Blog().name(UPDATED_NAME).handle(UPDATED_HANDLE);
        return blog;
    }

    @BeforeEach
    public void initTest() {
        blogRepository.deleteAll();
        blog = createEntity();
    }

    @Test
    void createBlog() throws Exception {
        int databaseSizeBeforeCreate = blogRepository.findAll().size();
        // Create the Blog
        restBlogMockMvc
            .perform(
                post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(blog))
            )
            .andExpect(status().isCreated());

        // Validate the Blog in the database
        List<Blog> blogList = blogRepository.findAll();
        assertThat(blogList).hasSize(databaseSizeBeforeCreate + 1);
        Blog testBlog = blogList.get(blogList.size() - 1);
        assertThat(testBlog.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testBlog.getHandle()).isEqualTo(DEFAULT_HANDLE);
    }

    @Test
    void createBlogWithExistingId() throws Exception {
        // Create the Blog with an existing ID
        blog.setId("existing_id");

        int databaseSizeBeforeCreate = blogRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restBlogMockMvc
            .perform(
                post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(blog))
            )
            .andExpect(status().isBadRequest());

        // Validate the Blog in the database
        List<Blog> blogList = blogRepository.findAll();
        assertThat(blogList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = blogRepository.findAll().size();
        // set the field null
        blog.setName(null);

        // Create the Blog, which fails.

        restBlogMockMvc
            .perform(
                post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(blog))
            )
            .andExpect(status().isBadRequest());

        List<Blog> blogList = blogRepository.findAll();
        assertThat(blogList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkHandleIsRequired() throws Exception {
        int databaseSizeBeforeTest = blogRepository.findAll().size();
        // set the field null
        blog.setHandle(null);

        // Create the Blog, which fails.

        restBlogMockMvc
            .perform(
                post(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(blog))
            )
            .andExpect(status().isBadRequest());

        List<Blog> blogList = blogRepository.findAll();
        assertThat(blogList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void getAllBlogs() throws Exception {
        // Initialize the database
        blogRepository.save(blog);

        // Get all the blogList
        restBlogMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].handle").value(hasItem(DEFAULT_HANDLE)));
    }

    @Test
    void getBlog() throws Exception {
        // Initialize the database
        blogRepository.save(blog);

        // Get the blog
        restBlogMockMvc
            .perform(get(ENTITY_API_URL_ID, blog.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.handle").value(DEFAULT_HANDLE));
    }

    @Test
    void getNonExistingBlog() throws Exception {
        // Get the blog
        restBlogMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingBlog() throws Exception {
        // Initialize the database
        blogRepository.save(blog);

        int databaseSizeBeforeUpdate = blogRepository.findAll().size();

        // Update the blog
        Blog updatedBlog = blogRepository.findById(blog.getId()).get();
        updatedBlog.name(UPDATED_NAME).handle(UPDATED_HANDLE);

        restBlogMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedBlog.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedBlog))
            )
            .andExpect(status().isOk());

        // Validate the Blog in the database
        List<Blog> blogList = blogRepository.findAll();
        assertThat(blogList).hasSize(databaseSizeBeforeUpdate);
        Blog testBlog = blogList.get(blogList.size() - 1);
        assertThat(testBlog.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBlog.getHandle()).isEqualTo(UPDATED_HANDLE);
    }

    @Test
    void putNonExistingBlog() throws Exception {
        int databaseSizeBeforeUpdate = blogRepository.findAll().size();
        blog.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBlogMockMvc
            .perform(
                put(ENTITY_API_URL_ID, blog.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(blog))
            )
            .andExpect(status().isBadRequest());

        // Validate the Blog in the database
        List<Blog> blogList = blogRepository.findAll();
        assertThat(blogList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchBlog() throws Exception {
        int databaseSizeBeforeUpdate = blogRepository.findAll().size();
        blog.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBlogMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(blog))
            )
            .andExpect(status().isBadRequest());

        // Validate the Blog in the database
        List<Blog> blogList = blogRepository.findAll();
        assertThat(blogList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamBlog() throws Exception {
        int databaseSizeBeforeUpdate = blogRepository.findAll().size();
        blog.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBlogMockMvc
            .perform(
                put(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(blog))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Blog in the database
        List<Blog> blogList = blogRepository.findAll();
        assertThat(blogList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateBlogWithPatch() throws Exception {
        // Initialize the database
        blogRepository.save(blog);

        int databaseSizeBeforeUpdate = blogRepository.findAll().size();

        // Update the blog using partial update
        Blog partialUpdatedBlog = new Blog();
        partialUpdatedBlog.setId(blog.getId());

        partialUpdatedBlog.name(UPDATED_NAME);

        restBlogMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBlog.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedBlog))
            )
            .andExpect(status().isOk());

        // Validate the Blog in the database
        List<Blog> blogList = blogRepository.findAll();
        assertThat(blogList).hasSize(databaseSizeBeforeUpdate);
        Blog testBlog = blogList.get(blogList.size() - 1);
        assertThat(testBlog.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBlog.getHandle()).isEqualTo(DEFAULT_HANDLE);
    }

    @Test
    void fullUpdateBlogWithPatch() throws Exception {
        // Initialize the database
        blogRepository.save(blog);

        int databaseSizeBeforeUpdate = blogRepository.findAll().size();

        // Update the blog using partial update
        Blog partialUpdatedBlog = new Blog();
        partialUpdatedBlog.setId(blog.getId());

        partialUpdatedBlog.name(UPDATED_NAME).handle(UPDATED_HANDLE);

        restBlogMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBlog.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedBlog))
            )
            .andExpect(status().isOk());

        // Validate the Blog in the database
        List<Blog> blogList = blogRepository.findAll();
        assertThat(blogList).hasSize(databaseSizeBeforeUpdate);
        Blog testBlog = blogList.get(blogList.size() - 1);
        assertThat(testBlog.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBlog.getHandle()).isEqualTo(UPDATED_HANDLE);
    }

    @Test
    void patchNonExistingBlog() throws Exception {
        int databaseSizeBeforeUpdate = blogRepository.findAll().size();
        blog.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBlogMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, blog.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(blog))
            )
            .andExpect(status().isBadRequest());

        // Validate the Blog in the database
        List<Blog> blogList = blogRepository.findAll();
        assertThat(blogList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchBlog() throws Exception {
        int databaseSizeBeforeUpdate = blogRepository.findAll().size();
        blog.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBlogMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(blog))
            )
            .andExpect(status().isBadRequest());

        // Validate the Blog in the database
        List<Blog> blogList = blogRepository.findAll();
        assertThat(blogList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamBlog() throws Exception {
        int databaseSizeBeforeUpdate = blogRepository.findAll().size();
        blog.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBlogMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(blog))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Blog in the database
        List<Blog> blogList = blogRepository.findAll();
        assertThat(blogList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteBlog() throws Exception {
        // Initialize the database
        blogRepository.save(blog);

        int databaseSizeBeforeDelete = blogRepository.findAll().size();

        // Delete the blog
        restBlogMockMvc
            .perform(delete(ENTITY_API_URL_ID, blog.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Blog> blogList = blogRepository.findAll();
        assertThat(blogList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
