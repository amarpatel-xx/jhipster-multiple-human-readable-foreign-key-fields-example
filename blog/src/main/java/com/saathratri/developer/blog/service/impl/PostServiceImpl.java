package com.saathratri.developer.blog.service.impl;

import com.saathratri.developer.blog.repository.PostRepository;
import com.saathratri.developer.blog.service.PostService;
import com.saathratri.developer.blog.service.dto.PostDTO;
import com.saathratri.developer.blog.service.mapper.PostMapper;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link com.saathratri.developer.blog.domain.Post}.
 */
@Service
@Transactional
public class PostServiceImpl implements PostService {

    private final Logger log = LoggerFactory.getLogger(PostServiceImpl.class);

    private final PostRepository postRepository;

    private final PostMapper postMapper;

    public PostServiceImpl(PostRepository postRepository, PostMapper postMapper) {
        this.postRepository = postRepository;
        this.postMapper = postMapper;
    }

    @Override
    public Mono<PostDTO> save(PostDTO postDTO) {
        log.debug("Request to save Post : {}", postDTO);
        return postRepository.save(postMapper.toEntity(postDTO)).map(postMapper::toDto);
    }

    @Override
    public Mono<PostDTO> update(PostDTO postDTO) {
        log.debug("Request to update Post : {}", postDTO);
        return postRepository.save(postMapper.toEntity(postDTO).setIsPersisted()).map(postMapper::toDto);
    }

    @Override
    public Mono<PostDTO> partialUpdate(PostDTO postDTO) {
        log.debug("Request to partially update Post : {}", postDTO);

        return postRepository
            .findById(postDTO.getId())
            .map(existingPost -> {
                postMapper.partialUpdate(existingPost, postDTO);

                return existingPost;
            })
            .flatMap(postRepository::save)
            .map(postMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<PostDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Posts");
        return postRepository.findAllBy(pageable).map(postMapper::toDto);
    }

    public Flux<PostDTO> findAllWithEagerRelationships(Pageable pageable) {
        return postRepository.findAllWithEagerRelationships(pageable).map(postMapper::toDto);
    }

    public Mono<Long> countAll() {
        return postRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<PostDTO> findOne(UUID id) {
        log.debug("Request to get Post : {}", id);
        return postRepository.findOneWithEagerRelationships(id).map(postMapper::toDto);
    }

    @Override
    public Mono<Void> delete(UUID id) {
        log.debug("Request to delete Post : {}", id);
        return postRepository.deleteById(id);
    }
}
