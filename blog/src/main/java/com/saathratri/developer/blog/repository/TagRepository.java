package com.saathratri.developer.blog.repository;

import com.saathratri.developer.blog.domain.Tag;
import java.util.UUID;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the Tag entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TagRepository extends ReactiveCrudRepository<Tag, UUID>, TagRepositoryInternal {
    Flux<Tag> findAllBy(Pageable pageable);

    @Override
    <S extends Tag> Mono<S> save(S entity);

    @Override
    Flux<Tag> findAll();

    @Override
    Mono<Tag> findById(UUID id);

    @Override
    Mono<Void> deleteById(UUID id);
}

interface TagRepositoryInternal {
    <S extends Tag> Mono<S> save(S entity);

    Flux<Tag> findAllBy(Pageable pageable);

    Flux<Tag> findAll();

    Mono<Tag> findById(UUID id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<Tag> findAllBy(Pageable pageable, Criteria criteria);
}
