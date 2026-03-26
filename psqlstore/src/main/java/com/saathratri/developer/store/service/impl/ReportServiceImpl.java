package com.saathratri.developer.store.service.impl;

import com.saathratri.developer.store.domain.Report;
import com.saathratri.developer.store.repository.ReportRepository;
import com.saathratri.developer.store.service.ReportService;
import com.saathratri.developer.store.service.dto.ReportDTO;
import com.saathratri.developer.store.service.mapper.ReportMapper;
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
 * Service Implementation for managing {@link com.saathratri.developer.store.domain.Report}.
 */
@Service
@Transactional
public class ReportServiceImpl implements ReportService {

    private static final Logger LOG = LoggerFactory.getLogger(ReportServiceImpl.class);

    private final ReportRepository reportRepository;

    private final ReportMapper reportMapper;

    public ReportServiceImpl(ReportRepository reportRepository, ReportMapper reportMapper) {
        this.reportRepository = reportRepository;
        this.reportMapper = reportMapper;
    }

    @Override
    public ReportDTO save(ReportDTO reportDTO) {
        LOG.debug("Request to save Report : {}", reportDTO);
        Report report = reportMapper.toEntity(reportDTO);
        report = reportRepository.save(report);
        return reportMapper.toDto(report);
    }

    @Override
    public ReportDTO update(ReportDTO reportDTO) {
        LOG.debug("Request to update Report : {}", reportDTO);
        Report report = reportMapper.toEntity(reportDTO);
        report = reportRepository.save(report);
        return reportMapper.toDto(report);
    }

    @Override
    public Optional<ReportDTO> partialUpdate(ReportDTO reportDTO) {
        LOG.debug("Request to partially update Report : {}", reportDTO);

        return reportRepository
            .findById(reportDTO.getId())
            .map(existingReport -> {
                reportMapper.partialUpdate(existingReport, reportDTO);

                return existingReport;
            })
            .map(reportRepository::save)
            .map(reportMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReportDTO> findAllForSaathratriOrchestrator() {
        LOG.debug("Request to get all Reports for saathratri orchestrator");
        return reportRepository.findAll().stream().map(reportMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReportDTO> findAll() {
        LOG.debug("Request to get all Reports");
        return reportRepository.findAll().stream().map(reportMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ReportDTO> findOne(UUID id) {
        LOG.debug("Request to get Report : {}", id);
        return reportRepository.findById(id).map(reportMapper::toDto);
    }

    @Override
    public void delete(UUID id) {
        LOG.debug("Request to delete Report : {}", id);
        reportRepository.deleteById(id);
    }
}
