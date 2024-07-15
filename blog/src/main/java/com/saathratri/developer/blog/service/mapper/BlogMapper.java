package com.saathratri.developer.blog.service.mapper;

import com.saathratri.developer.blog.domain.Blog;
import com.saathratri.developer.blog.domain.TajUser;
import com.saathratri.developer.blog.service.dto.BlogDTO;
import com.saathratri.developer.blog.service.dto.TajUserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Blog} and its DTO {@link BlogDTO}.
 */
@Mapper(componentModel = "spring")
public interface BlogMapper extends EntityMapper<BlogDTO, Blog> {
    @Mapping(target = "tajUser", source = "tajUser", qualifiedByName = "tajUserLogin")
    BlogDTO toDto(Blog s);

    @Named("tajUserLogin")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "login", source = "login")
    TajUserDTO toDtoTajUserLogin(TajUser tajUser);
}
