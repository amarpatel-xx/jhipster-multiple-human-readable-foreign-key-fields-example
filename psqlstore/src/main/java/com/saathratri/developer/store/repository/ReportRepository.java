package com.saathratri.developer.store.repository;

import com.saathratri.developer.store.domain.Report;
import java.util.UUID;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Report entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReportRepository extends JpaRepository<Report, UUID> {}
