package com.saathratri.developer.blog.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

/**
 * A DTO for the {@link com.saathratri.developer.blog.domain.Tag} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TagDTO implements Serializable {

    private UUID id;

    @NotNull
    @Size(max = 100)
    private String name;

    @Size(max = 255)
    private String description;

    private float[] nameEmbedding;

    private float[] descriptionEmbedding;

    private Set<PostDTO> posts = new HashSet<>();

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float[] getNameEmbedding() {
        return nameEmbedding;
    }

    public void setNameEmbedding(float[] nameEmbedding) {
        this.nameEmbedding = nameEmbedding;
    }

    public float[] getDescriptionEmbedding() {
        return descriptionEmbedding;
    }

    public void setDescriptionEmbedding(float[] descriptionEmbedding) {
        this.descriptionEmbedding = descriptionEmbedding;
    }

    public Set<PostDTO> getPosts() {
        return posts;
    }

    public void setPosts(Set<PostDTO> posts) {
        this.posts = posts;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TagDTO)) {
            return false;
        }

        TagDTO tagDTO = (TagDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, tagDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TagDTO{" +
            "id='" + getId() + "'" +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", nameEmbedding='" + getNameEmbedding() + "'" +
            ", descriptionEmbedding='" + getDescriptionEmbedding() + "'" +
            ", posts=" + getPosts() +
            "}";
    }
}
