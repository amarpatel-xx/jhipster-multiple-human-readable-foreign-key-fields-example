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

    @NotNull(message = "must not be null")
    private UUID id;

    @NotNull(message = "must not be null")
    @Size(min = 3)
    private String name;

    @NotNull(message = "must not be null")
    @Size(min = 2)
    private String handle;

    private UserDTO user;

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

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
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
            ", user=" + getUser() +
            "}";
    }
}