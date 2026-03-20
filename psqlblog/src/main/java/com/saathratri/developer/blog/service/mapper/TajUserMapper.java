package com.saathratri.developer.blog.service.mapper;

import com.saathratri.developer.blog.domain.TajUser;
import com.saathratri.developer.blog.service.dto.TajUserDTO;
import org.mapstruct.*;
import org.mapstruct.control.NoComplexMapping;

/**
 * Mapper for the entity {@link TajUser} and its DTO {@link TajUserDTO}.
 *
 * Uses NoComplexMapping to prevent MapStruct from generating deep/complex mappings
 * that can cause infinite recursion with bidirectional entity relationships.
 * This limits MapStruct to direct field mappings only, requiring explicit @Mapping
 * annotations for any relationship mappings.
 */
@Mapper(componentModel = "spring", mappingControl = NoComplexMapping.class)
public interface TajUserMapper extends EntityMapper<TajUserDTO, TajUser> {
    default String map(byte[] value) {
        return value == null ? null : new String(value);
    }

    default byte[] map(String value) {
        return value == null ? null : value.getBytes();
    }
}
