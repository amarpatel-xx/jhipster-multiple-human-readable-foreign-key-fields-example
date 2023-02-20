package com.okta.developer.blog.repository;

import com.okta.developer.blog.domain.Post;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data Neo4j repository for the Post entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PostRepository extends Neo4jRepository<Post, String> {}
