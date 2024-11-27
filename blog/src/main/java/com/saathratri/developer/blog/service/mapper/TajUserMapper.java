package com.saathratri.developer.blog.service.mapper;

import com.saathratri.developer.blog.domain.TajUser;
import com.saathratri.developer.blog.service.dto.TajUserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TajUser} and its DTO {@link TajUserDTO}.
 */
@Mapper(componentModel = "spring")
public interface TajUserMapper extends EntityMapper<TajUserDTO, TajUser> {}
