package com.saathratri.developer.blog.service.impl;

import com.saathratri.developer.blog.domain.Post;
import com.saathratri.developer.blog.repository.PostRepository;
import com.saathratri.developer.blog.service.PostService;
import com.saathratri.developer.blog.service.dto.PostDTO;
import com.saathratri.developer.blog.service.mapper.PostMapper;
import java.util.Optional;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.saathratri.developer.blog.domain.Post}.
 */
@Service
@Transactional
public class PostServiceImpl implements PostService {

    private static final Logger LOG = LoggerFactory.getLogger(PostServiceImpl.class);

    private final PostRepository postRepository;

    private final PostMapper postMapper;

    public PostServiceImpl(PostRepository postRepository, PostMapper postMapper) {
        this.postRepository = postRepository;
        this.postMapper = postMapper;
    }

    @Override
    public PostDTO save(PostDTO postDTO) {
        LOG.debug("Request to save Post : {}", postDTO);
        Post post = postMapper.toEntity(postDTO);
        post = postRepository.save(post);
        return postMapper.toDto(post);
    }

    @Override
    public PostDTO update(PostDTO postDTO) {
        LOG.debug("Request to update Post : {}", postDTO);
        Post post = postMapper.toEntity(postDTO);
        post = postRepository.save(post);
        return postMapper.toDto(post);
    }

    @Override
    public Optional<PostDTO> partialUpdate(PostDTO postDTO) {
        LOG.debug("Request to partially update Post : {}", postDTO);

        return postRepository
            .findById(postDTO.getId())
            .map(existingPost -> {
                postMapper.partialUpdate(existingPost, postDTO);

                return existingPost;
            })
            .map(postRepository::save)
            .map(postMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PostDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all Posts");
        return postRepository.findAll(pageable).map(postMapper::toDto);
    }

    public Page<PostDTO> findAllWithEagerRelationships(Pageable pageable) {
        return postRepository.findAllWithEagerRelationships(pageable).map(postMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<PostDTO> findOne(UUID id) {
        LOG.debug("Request to get Post : {}", id);
        return postRepository.findOneWithEagerRelationships(id).map(postMapper::toDto);
    }

    @Override
    public void delete(UUID id) {
        LOG.debug("Request to delete Post : {}", id);
        postRepository.deleteById(id);
    }
}
