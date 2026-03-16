package com.saathratri.developer.blog.service;

import com.saathratri.developer.blog.domain.*; // for static metamodels
import com.saathratri.developer.blog.domain.TajUser;
import com.saathratri.developer.blog.repository.TajUserRepository;
import com.saathratri.developer.blog.service.criteria.TajUserCriteria;
import com.saathratri.developer.blog.service.dto.TajUserDTO;
import com.saathratri.developer.blog.service.mapper.TajUserMapper;
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
 * Service for executing complex queries for {@link TajUser} entities in the database.
 * The main input is a {@link TajUserCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link TajUserDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class TajUserQueryService extends QueryService<TajUser> {

    private static final Logger LOG = LoggerFactory.getLogger(TajUserQueryService.class);

    private final TajUserRepository tajUserRepository;

    private final TajUserMapper tajUserMapper;

    public TajUserQueryService(TajUserRepository tajUserRepository, TajUserMapper tajUserMapper) {
        this.tajUserRepository = tajUserRepository;
        this.tajUserMapper = tajUserMapper;
    }

    /**
     * Return a {@link List} of {@link TajUserDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<TajUserDTO> findByCriteria(TajUserCriteria criteria) {
        LOG.debug("find by criteria : {}", criteria);
        final Specification<TajUser> specification = createSpecification(criteria);
        return tajUserMapper.toDto(tajUserRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link TajUserDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<TajUserDTO> findByCriteria(TajUserCriteria criteria, Pageable page) {
        LOG.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<TajUser> specification = createSpecification(criteria);
        return tajUserRepository.findAll(specification, page).map(tajUserMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(TajUserCriteria criteria) {
        LOG.debug("count by criteria : {}", criteria);
        final Specification<TajUser> specification = createSpecification(criteria);
        return tajUserRepository.count(specification);
    }

    /**
     * Function to convert {@link TajUserCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<TajUser> createSpecification(TajUserCriteria criteria) {
        Specification<TajUser> specification = Specification.unrestricted();
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            specification = Specification.allOf(
                Boolean.TRUE.equals(criteria.getDistinct()) ? distinct(criteria.getDistinct()) : Specification.unrestricted(),
                buildSpecification(criteria.getId(), TajUser_.id),
                buildStringSpecification(criteria.getLogin(), TajUser_.login)
            );
        }
        return specification;
    }
}
