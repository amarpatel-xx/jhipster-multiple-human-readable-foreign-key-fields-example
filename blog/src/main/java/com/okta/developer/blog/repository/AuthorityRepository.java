package com.okta.developer.blog.repository;

import com.okta.developer.blog.domain.Authority;
import java.util.List;
import org.springframework.data.neo4j.repository.Neo4jRepository;

/**
 * Spring Data Neo4j repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends Neo4jRepository<Authority, String> {
    // See https://github.com/neo4j/sdn-rx/issues/51    List<Authority> findAll();

}
