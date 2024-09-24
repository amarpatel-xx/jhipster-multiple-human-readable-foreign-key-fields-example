// Amar
package com.saathratri.developer.store.service.mapper;

import com.saathratri.developer.store.domain.Product;
import com.saathratri.developer.store.service.dto.ProductDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Product} and its DTO {@link ProductDTO}.
 */
@Mapper(componentModel = "spring")
public interface ProductMapper extends EntityMapper<ProductDTO, Product> {}
