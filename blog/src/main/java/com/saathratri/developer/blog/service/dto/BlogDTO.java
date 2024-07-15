package com.saathratri.developer.blog.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

/**
 * A DTO for the {@link com.saathratri.developer.blog.domain.Blog} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class BlogDTO implements Serializable {

    private UUID id;

    @NotNull
    @Size(min = 3)
    private String name;

    @NotNull
    @Size(min = 2)
    private String handle;

    private TajUserDTO tajUser;

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

    public String getHandle() {
        return handle;
    }

    public void setHandle(String handle) {
        this.handle = handle;
    }

    public TajUserDTO getTajUser() {
        return tajUser;
    }

    public void setTajUser(TajUserDTO tajUser) {
        this.tajUser = tajUser;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BlogDTO)) {
            return false;
        }

        BlogDTO blogDTO = (BlogDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, blogDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BlogDTO{" +
            "id='" + getId() + "'" +
            ", name='" + getName() + "'" +
            ", handle='" + getHandle() + "'" +
            ", tajUser=" + getTajUser() +
            "}";
    }
}
