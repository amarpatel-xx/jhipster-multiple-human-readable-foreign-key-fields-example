package com.saathratri.developer.blog.service.mapper;

import com.saathratri.developer.blog.domain.Blog;
import com.saathratri.developer.blog.domain.Post;
import com.saathratri.developer.blog.domain.Tag;
import com.saathratri.developer.blog.service.dto.BlogDTO;
import com.saathratri.developer.blog.service.dto.PostDTO;
import com.saathratri.developer.blog.service.dto.TagDTO;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import org.mapstruct.*;
import org.mapstruct.control.NoComplexMapping;

/**
 * Mapper for the entity {@link Post} and its DTO {@link PostDTO}.
 *
 * Uses NoComplexMapping to prevent MapStruct from generating deep/complex mappings
 * that can cause infinite recursion with bidirectional entity relationships.
 * This limits MapStruct to direct field mappings only, requiring explicit @Mapping
 * annotations for any relationship mappings.
 */
@Mapper(componentModel = "spring", mappingControl = NoComplexMapping.class)
public interface PostMapper extends EntityMapper<PostDTO, Post> {
    @Mapping(target = "blog", source = "blog", qualifiedByName = "blogId")
    @Mapping(target = "tags", source = "tags", qualifiedByName = "tagNameSet")
    PostDTO toDto(Post s);

    /**
     * Lightweight mapper for list views that doesn't trigger lazy loading of collections.
     * Only maps basic fields and ManyToOne relationships, ignoring all ManyToMany collections.
     */
    @Named("toDtoBasic")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "title", source = "title")
    @Mapping(target = "content", source = "content")
    @Mapping(target = "date", source = "date")
    @Mapping(target = "blog", source = "blog", qualifiedByName = "blogId")
    @Mapping(target = "tags", ignore = true)
    PostDTO toDtoBasic(Post post);

    @Mapping(target = "removeTag", ignore = true)
    Post toEntity(PostDTO postDTO);

    @Named("blogId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    @Mapping(target = "handle", source = "handle")
    BlogDTO toDtoBlogId(Blog blog);

    @Named("tagName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    TagDTO toDtoTagName(Tag tag);

    @Named("tagNameSet")
    default Set<TagDTO> toDtoTagNameSet(Set<Tag> tag) {
        return tag.stream().map(this::toDtoTagName).collect(Collectors.toSet());
    }

    default String map(UUID value) {
        return Objects.toString(value, null);
    }
}
