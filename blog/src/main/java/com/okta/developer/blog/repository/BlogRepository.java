package com.okta.developer.blog.repository;

import com.okta.developer.blog.domain.Blog;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data Neo4j repository for the Blog entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BlogRepository extends Neo4jRepository<Blog, String> {}
