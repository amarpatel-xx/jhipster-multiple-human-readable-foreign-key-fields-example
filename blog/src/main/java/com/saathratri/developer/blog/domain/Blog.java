package com.saathratri.developer.blog.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

/**
 * A Blog.
 */
@Entity
@Table(name = "blog")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Blog implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    @Column(name = "id")
    private UUID id;

    @NotNull
    @Size(min = 3)
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Size(min = 2)
    @Column(name = "handle", nullable = false)
    private String handle;

    @ManyToOne(fetch = FetchType.LAZY)
    private TajUser tajUser;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "blog")
    @JsonIgnoreProperties(value = { "blog", "tags" }, allowSetters = true)
    private Set<Post> posts = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public UUID getId() {
        return this.id;
    }

    public Blog id(UUID id) {
        this.setId(id);
        return this;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Blog name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHandle() {
        return this.handle;
    }

    public Blog handle(String handle) {
        this.setHandle(handle);
        return this;
    }

    public void setHandle(String handle) {
        this.handle = handle;
    }

    public TajUser getTajUser() {
        return this.tajUser;
    }

    public void setTajUser(TajUser tajUser) {
        this.tajUser = tajUser;
    }

    public Blog tajUser(TajUser tajUser) {
        this.setTajUser(tajUser);
        return this;
    }

    public Set<Post> getPosts() {
        return this.posts;
    }

    public void setPosts(Set<Post> posts) {
        if (this.posts != null) {
            this.posts.forEach(i -> i.setBlog(null));
        }
        if (posts != null) {
            posts.forEach(i -> i.setBlog(this));
        }
        this.posts = posts;
    }

    public Blog posts(Set<Post> posts) {
        this.setPosts(posts);
        return this;
    }

    public Blog addPost(Post post) {
        this.posts.add(post);
        post.setBlog(this);
        return this;
    }

    public Blog removePost(Post post) {
        this.posts.remove(post);
        post.setBlog(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Blog)) {
            return false;
        }
        return getId() != null && getId().equals(((Blog) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Blog{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", handle='" + getHandle() + "'" +
            "}";
    }
}
