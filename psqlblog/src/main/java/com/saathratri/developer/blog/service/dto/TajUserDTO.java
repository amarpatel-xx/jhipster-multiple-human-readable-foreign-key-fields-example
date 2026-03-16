package com.saathratri.developer.blog.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

/**
 * A DTO for the {@link com.saathratri.developer.blog.domain.TajUser} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TajUserDTO implements Serializable {

    private UUID id;

    @NotNull
    @Size(min = 7)
    private String login;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TajUserDTO)) {
            return false;
        }

        TajUserDTO tajUserDTO = (TajUserDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, tajUserDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TajUserDTO{" +
            "id='" + getId() + "'" +
            ", login='" + getLogin() + "'" +
            "}";
    }
}
