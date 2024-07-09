package com.saathratri.developer.blog.service.impl;

import com.saathratri.developer.blog.domain.TajUser;
import com.saathratri.developer.blog.repository.TajUserRepository;
import com.saathratri.developer.blog.service.TajUserService;
import com.saathratri.developer.blog.service.dto.TajUserDTO;
import com.saathratri.developer.blog.service.mapper.TajUserMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.saathratri.developer.blog.domain.TajUser}.
 */
@Service
@Transactional
public class TajUserServiceImpl implements TajUserService {

    private final Logger log = LoggerFactory.getLogger(TajUserServiceImpl.class);

    private final TajUserRepository tajUserRepository;

    private final TajUserMapper tajUserMapper;

    public TajUserServiceImpl(TajUserRepository tajUserRepository, TajUserMapper tajUserMapper) {
        this.tajUserRepository = tajUserRepository;
        this.tajUserMapper = tajUserMapper;
    }

    @Override
    public TajUserDTO save(TajUserDTO tajUserDTO) {
        log.debug("Request to save TajUser : {}", tajUserDTO);
        TajUser tajUser = tajUserMapper.toEntity(tajUserDTO);
        tajUser = tajUserRepository.save(tajUser);
        return tajUserMapper.toDto(tajUser);
    }

    @Override
    public TajUserDTO update(TajUserDTO tajUserDTO) {
        log.debug("Request to update TajUser : {}", tajUserDTO);
        TajUser tajUser = tajUserMapper.toEntity(tajUserDTO);
        tajUser = tajUserRepository.save(tajUser);
        return tajUserMapper.toDto(tajUser);
    }

    @Override
    public Optional<TajUserDTO> partialUpdate(TajUserDTO tajUserDTO) {
        log.debug("Request to partially update TajUser : {}", tajUserDTO);

        return tajUserRepository
            .findById(tajUserDTO.getId())
            .map(existingTajUser -> {
                tajUserMapper.partialUpdate(existingTajUser, tajUserDTO);

                return existingTajUser;
            })
            .map(tajUserRepository::save)
            .map(tajUserMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TajUserDTO> findAll() {
        log.debug("Request to get all TajUsers");
        return tajUserRepository.findAll().stream().map(tajUserMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TajUserDTO> findOne(UUID id) {
        log.debug("Request to get TajUser : {}", id);
        return tajUserRepository.findById(id).map(tajUserMapper::toDto);
    }

    @Override
    public void delete(UUID id) {
        log.debug("Request to delete TajUser : {}", id);
        tajUserRepository.deleteById(id);
    }
}
