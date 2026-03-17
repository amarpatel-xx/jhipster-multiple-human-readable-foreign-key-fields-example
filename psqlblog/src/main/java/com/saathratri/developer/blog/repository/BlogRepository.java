package com.saathratri.developer.blog.repository;

import com.saathratri.developer.blog.domain.Blog;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Blog entity.
 */
@Repository
public interface BlogRepository extends JpaRepository<Blog, UUID> {
    default Optional<Blog> findOneWithEagerRelationships(UUID id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Blog> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Blog> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(value = "select blog from Blog blog left join fetch blog.tajUser", countQuery = "select count(blog) from Blog blog")
    Page<Blog> findAllWithToOneRelationships(Pageable pageable);

    @Query("select blog from Blog blog left join fetch blog.tajUser")
    List<Blog> findAllWithToOneRelationships();

    @Query("select blog from Blog blog left join fetch blog.tajUser where blog.id =:id")
    Optional<Blog> findOneWithToOneRelationships(@Param("id") UUID id);
}
