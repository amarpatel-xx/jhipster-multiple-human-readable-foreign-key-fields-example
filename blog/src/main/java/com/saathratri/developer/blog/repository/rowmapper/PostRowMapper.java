package com.saathratri.developer.blog.repository.rowmapper;

import com.saathratri.developer.blog.domain.Post;
import io.r2dbc.spi.Row;
import java.time.Instant;
import java.util.UUID;
import java.util.function.BiFunction;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link Post}, with proper type conversions.
 */
@Service
public class PostRowMapper implements BiFunction<Row, String, Post> {

    private final ColumnConverter converter;

    public PostRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link Post} stored in the database.
     */
    @Override
    public Post apply(Row row, String prefix) {
        Post entity = new Post();
        entity.setId(converter.fromRow(row, prefix + "_id", UUID.class));
        entity.setTitle(converter.fromRow(row, prefix + "_title", String.class));
        entity.setContent(converter.fromRow(row, prefix + "_content", String.class));
        entity.setDate(converter.fromRow(row, prefix + "_date", Instant.class));
        entity.setBlogId(converter.fromRow(row, prefix + "_blog_id", UUID.class));
        return entity;
    }
}