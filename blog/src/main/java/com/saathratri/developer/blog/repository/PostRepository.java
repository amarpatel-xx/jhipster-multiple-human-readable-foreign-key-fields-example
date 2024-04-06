package com.saathratri.developer.blog.repository;

import com.saathratri.developer.blog.domain.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the Post entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PostRepository extends ReactiveCrudRepository<Post, String>, PostRepositoryInternal {
    Flux<Post> findAllBy(Pageable pageable);

    @Override
    Mono<Post> findOneWithEagerRelationships(String id);

    @Override
    Flux<Post> findAllWithEagerRelationships();

    @Override
    Flux<Post> findAllWithEagerRelationships(Pageable page);

    @Query("SELECT * FROM post entity WHERE entity.blog_id = :id")
    Flux<Post> findByBlog(String id);

    @Query("SELECT * FROM post entity WHERE entity.blog_id IS NULL")
    Flux<Post> findAllWhereBlogIsNull();

    @Query("SELECT entity.* FROM post entity JOIN rel_post__tag joinTable ON entity.id = joinTable.tag_id WHERE joinTable.tag_id = :id")
    Flux<Post> findByTag(String id);

    @Override
    <S extends Post> Mono<S> save(S entity);

    @Override
    Flux<Post> findAll();

    @Override
    Mono<Post> findById(String id);

    @Override
    Mono<Void> deleteById(String id);
}

interface PostRepositoryInternal {
    <S extends Post> Mono<S> save(S entity);

    Flux<Post> findAllBy(Pageable pageable);

    Flux<Post> findAll();

    Mono<Post> findById(String id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<Post> findAllBy(Pageable pageable, Criteria criteria);

    Mono<Post> findOneWithEagerRelationships(String id);

    Flux<Post> findAllWithEagerRelationships();

    Flux<Post> findAllWithEagerRelationships(Pageable page);

    Mono<Void> deleteById(String id);
}
