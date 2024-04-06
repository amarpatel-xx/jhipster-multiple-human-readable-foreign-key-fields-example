package com.saathratri.developer.blog.repository;

import com.saathratri.developer.blog.domain.Blog;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the Blog entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BlogRepository extends ReactiveCrudRepository<Blog, String>, BlogRepositoryInternal {
    @Override
    <S extends Blog> Mono<S> save(S entity);

    @Override
    Flux<Blog> findAll();

    @Override
    Mono<Blog> findById(String id);

    @Override
    Mono<Void> deleteById(String id);
}

interface BlogRepositoryInternal {
    <S extends Blog> Mono<S> save(S entity);

    Flux<Blog> findAllBy(Pageable pageable);

    Flux<Blog> findAll();

    Mono<Blog> findById(String id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<Blog> findAllBy(Pageable pageable, Criteria criteria);
}
