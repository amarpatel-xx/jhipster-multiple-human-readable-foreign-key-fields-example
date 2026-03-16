package com.saathratri.developer.store.service.mapper;

import com.saathratri.developer.store.domain.Product;
import com.saathratri.developer.store.service.dto.ProductDTO;
import org.mapstruct.*;
import org.mapstruct.control.NoComplexMapping;

/**
 * Mapper for the entity {@link Product} and its DTO {@link ProductDTO}.
 *
 * Uses NoComplexMapping to prevent MapStruct from generating deep/complex mappings
 * that can cause infinite recursion with bidirectional entity relationships.
 * This limits MapStruct to direct field mappings only, requiring explicit @Mapping
 * annotations for any relationship mappings.
 */
@Mapper(componentModel = "spring", mappingControl = NoComplexMapping.class)
public interface ProductMapper extends EntityMapper<ProductDTO, Product> {}
