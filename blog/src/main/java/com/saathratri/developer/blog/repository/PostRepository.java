package com.saathratri.developer.blog.repository;

import com.saathratri.developer.blog.domain.Post;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Post entity.
 *
 * When extending this class, extend PostRepositoryWithBagRelationships too.
 * For more information refer to https://github.com/jhipster/generator-jhipster/issues/17990.
 */
@Repository
public interface PostRepository extends PostRepositoryWithBagRelationships, JpaRepository<Post, UUID> {
    default Optional<Post> findOneWithEagerRelationships(UUID id) {
        return this.fetchBagRelationships(this.findById(id));
    }

    default List<Post> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAll());
    }

    default Page<Post> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAll(pageable));
    }
}
