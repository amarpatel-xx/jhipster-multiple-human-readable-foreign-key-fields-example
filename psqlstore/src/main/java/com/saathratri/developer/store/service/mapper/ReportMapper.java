package com.saathratri.developer.store.service.mapper;

import com.saathratri.developer.store.domain.Product;
import com.saathratri.developer.store.domain.Report;
import com.saathratri.developer.store.service.dto.ProductDTO;
import com.saathratri.developer.store.service.dto.ReportDTO;
import java.util.Objects;
import java.util.UUID;
import org.mapstruct.*;
import org.mapstruct.control.NoComplexMapping;

/**
 * Mapper for the entity {@link Report} and its DTO {@link ReportDTO}.
 *
 * Uses NoComplexMapping to prevent MapStruct from generating deep/complex mappings
 * that can cause infinite recursion with bidirectional entity relationships.
 * This limits MapStruct to direct field mappings only, requiring explicit @Mapping
 * annotations for any relationship mappings.
 */
@Mapper(componentModel = "spring", mappingControl = NoComplexMapping.class)
public interface ReportMapper extends EntityMapper<ReportDTO, Report> {
    @Mapping(target = "product", source = "product", qualifiedByName = "productId")
    ReportDTO toDto(Report s);

    @Named("productId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ProductDTO toDtoProductId(Product product);

    default String map(UUID value) {
        return Objects.toString(value, null);
    }
}
