package com.saathratri.developer.store.service;

import com.saathratri.developer.store.service.dto.ReportDTO;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Service Interface for managing {@link com.saathratri.developer.store.domain.Report}.
 */
public interface ReportService {
    /**
     * Save a report.
     *
     * @param reportDTO the entity to save.
     * @return the persisted entity.
     */
    ReportDTO save(ReportDTO reportDTO);

    /**
     * Updates a report.
     *
     * @param reportDTO the entity to update.
     * @return the persisted entity.
     */
    ReportDTO update(ReportDTO reportDTO);

    /**
     * Partially updates a report.
     *
     * @param reportDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ReportDTO> partialUpdate(ReportDTO reportDTO);

    /**
     * Get all the reports for saathratri orchestrator.
     *
     * @return the list of entities.
     */
    List<ReportDTO> findAllForSaathratriOrchestrator();

    /**
     * Get all the reports.
     *
     * @return the list of entities.
     */
    List<ReportDTO> findAll();

    /**
     * Get the "id" report.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ReportDTO> findOne(UUID id);

    /**
     * Delete the "id" report.
     *
     * @param id the id of the entity.
     */
    void delete(UUID id);
}
