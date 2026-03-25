package com.saathratri.developer.blog.service.mapper;

import com.saathratri.developer.blog.domain.Post;
import com.saathratri.developer.blog.domain.Tag;
import com.saathratri.developer.blog.service.dto.PostDTO;
import com.saathratri.developer.blog.service.dto.TagDTO;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import org.mapstruct.*;
import org.mapstruct.control.NoComplexMapping;

/**
 * Mapper for the entity {@link Tag} and its DTO {@link TagDTO}.
 *
 * Uses NoComplexMapping to prevent MapStruct from generating deep/complex mappings
 * that can cause infinite recursion with bidirectional entity relationships.
 * This limits MapStruct to direct field mappings only, requiring explicit @Mapping
 * annotations for any relationship mappings.
 */
@Mapper(componentModel = "spring", mappingControl = NoComplexMapping.class)
public interface TagMapper extends EntityMapper<TagDTO, Tag> {
    @Mapping(target = "posts", source = "posts", qualifiedByName = "postIdSet")
    TagDTO toDto(Tag s);

    @Mapping(target = "nameEmbedding", ignore = true)
    @Mapping(target = "descriptionEmbedding", ignore = true)
    Tag toEntity(TagDTO tagDTO);

    @Mapping(target = "nameEmbedding", ignore = true)
    @Mapping(target = "descriptionEmbedding", ignore = true)
    void partialUpdate(@MappingTarget Tag entity, TagDTO dto);

    /**
     * Lightweight mapper for list views that doesn't trigger lazy loading of collections.
     * Only maps basic fields and ManyToOne relationships, ignoring all ManyToMany collections.
     */
    @Named("toDtoBasic")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    @Mapping(target = "description", source = "description")
    @Mapping(target = "nameEmbedding", source = "nameEmbedding")
    @Mapping(target = "descriptionEmbedding", source = "descriptionEmbedding")
    @Mapping(target = "posts", ignore = true)
    TagDTO toDtoBasic(Tag tag);

    @Mapping(target = "posts", ignore = true)
    @Mapping(target = "removePost", ignore = true)
    Tag toEntity(TagDTO tagDTO);

    @Named("postId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    PostDTO toDtoPostId(Post post);

    @Named("postIdSet")
    default Set<PostDTO> toDtoPostIdSet(Set<Post> post) {
        return post.stream().map(this::toDtoPostId).collect(Collectors.toSet());
    }

    default String map(UUID value) {
        return Objects.toString(value, null);
    }

    default String map(byte[] value) {
        return value == null ? null : new String(value);
    }

    default byte[] map(String value) {
        return value == null ? null : value.getBytes();
    }

    default java.util.List<Float> mapFloatArrayToList(float[] array) {
        if (array == null) {
            return null;
        }
        java.util.List<Float> list = new java.util.ArrayList<>(array.length);
        for (float f : array) {
            list.add(f);
        }
        return list;
    }
}
