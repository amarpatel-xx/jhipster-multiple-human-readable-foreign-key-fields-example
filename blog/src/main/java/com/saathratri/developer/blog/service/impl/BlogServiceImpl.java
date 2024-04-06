package com.saathratri.developer.blog.service.impl;

import com.saathratri.developer.blog.repository.BlogRepository;
import com.saathratri.developer.blog.service.BlogService;
import com.saathratri.developer.blog.service.dto.BlogDTO;
import com.saathratri.developer.blog.service.mapper.BlogMapper;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link com.saathratri.developer.blog.domain.Blog}.
 */
@Service
@Transactional
public class BlogServiceImpl implements BlogService {

    private final Logger log = LoggerFactory.getLogger(BlogServiceImpl.class);

    private final BlogRepository blogRepository;

    private final BlogMapper blogMapper;

    public BlogServiceImpl(BlogRepository blogRepository, BlogMapper blogMapper) {
        this.blogRepository = blogRepository;
        this.blogMapper = blogMapper;
    }

    @Override
    public Mono<BlogDTO> save(BlogDTO blogDTO) {
        log.debug("Request to save Blog : {}", blogDTO);
        return blogRepository.save(blogMapper.toEntity(blogDTO)).map(blogMapper::toDto);
    }

    @Override
    public Mono<BlogDTO> update(BlogDTO blogDTO) {
        log.debug("Request to update Blog : {}", blogDTO);
        return blogRepository.save(blogMapper.toEntity(blogDTO).setIsPersisted()).map(blogMapper::toDto);
    }

    @Override
    public Mono<BlogDTO> partialUpdate(BlogDTO blogDTO) {
        log.debug("Request to partially update Blog : {}", blogDTO);

        return blogRepository
            .findById(blogDTO.getId())
            .map(existingBlog -> {
                blogMapper.partialUpdate(existingBlog, blogDTO);

                return existingBlog;
            })
            .flatMap(blogRepository::save)
            .map(blogMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<BlogDTO> findAll() {
        log.debug("Request to get all Blogs");
        return blogRepository.findAll().map(blogMapper::toDto);
    }

    public Flux<BlogDTO> findAllWithEagerRelationships(Pageable pageable) {
        return blogRepository.findAllWithEagerRelationships(pageable).map(blogMapper::toDto);
    }

    public Mono<Long> countAll() {
        return blogRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<BlogDTO> findOne(UUID id) {
        log.debug("Request to get Blog : {}", id);
        return blogRepository.findOneWithEagerRelationships(id).map(blogMapper::toDto);
    }

    @Override
    public Mono<Void> delete(UUID id) {
        log.debug("Request to delete Blog : {}", id);
        return blogRepository.deleteById(id);
    }
}
