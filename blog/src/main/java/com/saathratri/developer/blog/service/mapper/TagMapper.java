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

/**
 * Mapper for the entity {@link Tag} and its DTO {@link TagDTO}.
 */
@Mapper(componentModel = "spring")
public interface TagMapper extends EntityMapper<TagDTO, Tag> {
    @Mapping(target = "posts", source = "posts", qualifiedByName = "postIdSet")
    TagDTO toDto(Tag s);

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
}
