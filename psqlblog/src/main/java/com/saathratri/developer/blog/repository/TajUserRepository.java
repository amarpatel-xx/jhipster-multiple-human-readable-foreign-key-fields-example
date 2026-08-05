package com.saathratri.developer.blog.repository;

import com.saathratri.developer.blog.domain.TajUser;
import java.util.UUID;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the TajUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TajUserRepository extends JpaRepository<TajUser, UUID> {}
