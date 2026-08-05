/*
 * Copyright (c) 2023-2026 Saathratri, LLC. All rights reserved.
 * SPDX-License-Identifier: LicenseRef-Saathratri-Proprietary
 * Proprietary and confidential - see LICENSE in the repository root.
 */

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
