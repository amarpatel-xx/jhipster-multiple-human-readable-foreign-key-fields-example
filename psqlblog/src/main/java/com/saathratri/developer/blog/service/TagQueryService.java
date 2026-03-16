package com.saathratri.developer.blog.service;

import com.saathratri.developer.blog.domain.*; // for static metamodels
import com.saathratri.developer.blog.domain.Tag;
import com.saathratri.developer.blog.repository.TagRepository;
import com.saathratri.developer.blog.service.criteria.TagCriteria;
import com.saathratri.developer.blog.service.dto.TagDTO;
import com.saathratri.developer.blog.service.mapper.TagMapper;
import jakarta.persistence.criteria.JoinType;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link Tag} entities in the database.
 * The main input is a {@link TagCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link Page} of {@link TagDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class TagQueryService extends QueryService<Tag> {

    private static final Logger LOG = LoggerFactory.getLogger(TagQueryService.class);

    private final TagRepository tagRepository;

    private final TagMapper tagMapper;

    public TagQueryService(TagRepository tagRepository, TagMapper tagMapper) {
        this.tagRepository = tagRepository;
        this.tagMapper = tagMapper;
    }

    /**
     * Return a {@link List} of {@link TagDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<TagDTO> findByCriteria(TagCriteria criteria) {
        LOG.debug("find by criteria : {}", criteria);
        final Specification<Tag> specification = createSpecification(criteria);
        return tagMapper.toDto(tagRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link TagDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<TagDTO> findByCriteria(TagCriteria criteria, Pageable page) {
        LOG.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Tag> specification = createSpecification(criteria);
        return tagRepository.findAll(specification, page).map(tagMapper::toDtoBasic);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(TagCriteria criteria) {
        LOG.debug("count by criteria : {}", criteria);
        final Specification<Tag> specification = createSpecification(criteria);
        return tagRepository.count(specification);
    }

    /**
     * Function to convert {@link TagCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Tag> createSpecification(TagCriteria criteria) {
        Specification<Tag> specification = Specification.unrestricted();
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            specification = Specification.allOf(
                Boolean.TRUE.equals(criteria.getDistinct()) ? distinct(criteria.getDistinct()) : Specification.unrestricted(),
                buildSpecification(criteria.getId(), Tag_.id),
                buildStringSpecification(criteria.getName(), Tag_.name),
                buildSpecification(criteria.getPostId(), root -> root.join(Tag_.posts, JoinType.LEFT).get(Post_.id))
            );
        }
        return specification;
    }
}
