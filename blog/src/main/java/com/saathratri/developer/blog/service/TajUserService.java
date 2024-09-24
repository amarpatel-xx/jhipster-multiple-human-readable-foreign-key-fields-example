package com.saathratri.developer.blog.service;

import com.saathratri.developer.blog.service.dto.TajUserDTO;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Service Interface for managing {@link com.saathratri.developer.blog.domain.TajUser}.
 */
public interface TajUserService {
    /**
     * Save a tajUser.
     *
     * @param tajUserDTO the entity to save.
     * @return the persisted entity.
     */
    TajUserDTO save(TajUserDTO tajUserDTO);

    /**
     * Updates a tajUser.
     *
     * @param tajUserDTO the entity to update.
     * @return the persisted entity.
     */
    TajUserDTO update(TajUserDTO tajUserDTO);

    /**
     * Partially updates a tajUser.
     *
     * @param tajUserDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<TajUserDTO> partialUpdate(TajUserDTO tajUserDTO);

    /**
     * Get all the tajUsers.
     *
     * @return the list of entities.
     */
    List<TajUserDTO> findAll();

    /**
     * Get the "id" tajUser.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TajUserDTO> findOne(UUID id);

    /**
     * Delete the "id" tajUser.
     *
     * @param id the id of the entity.
     */
    void delete(UUID id);
}
