package com.saathratri.developer.blog.repository;

import com.saathratri.developer.blog.domain.Blog;
import com.saathratri.developer.blog.repository.rowmapper.BlogRowMapper;
import io.r2dbc.spi.Row;
import io.r2dbc.spi.RowMetadata;
import java.util.List;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.convert.R2dbcConverter;
import org.springframework.data.r2dbc.core.R2dbcEntityOperations;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.data.r2dbc.repository.support.SimpleR2dbcRepository;
import org.springframework.data.relational.core.sql.Comparison;
import org.springframework.data.relational.core.sql.Condition;
import org.springframework.data.relational.core.sql.Conditions;
import org.springframework.data.relational.core.sql.Expression;
import org.springframework.data.relational.core.sql.Select;
import org.springframework.data.relational.core.sql.SelectBuilder.SelectFromAndJoin;
import org.springframework.data.relational.core.sql.Table;
import org.springframework.data.relational.repository.support.MappingRelationalEntityInformation;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.r2dbc.core.RowsFetchSpec;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC custom repository implementation for the Blog entity.
 */
@SuppressWarnings("unused")
class BlogRepositoryInternalImpl extends SimpleR2dbcRepository<Blog, String> implements BlogRepositoryInternal {

    private final DatabaseClient db;
    private final R2dbcEntityTemplate r2dbcEntityTemplate;
    private final EntityManager entityManager;

    private final BlogRowMapper blogMapper;

    private static final Table entityTable = Table.aliased("blog", EntityManager.ENTITY_ALIAS);

    public BlogRepositoryInternalImpl(
        R2dbcEntityTemplate template,
        EntityManager entityManager,
        BlogRowMapper blogMapper,
        R2dbcEntityOperations entityOperations,
        R2dbcConverter converter
    ) {
        super(
            new MappingRelationalEntityInformation(converter.getMappingContext().getRequiredPersistentEntity(Blog.class)),
            entityOperations,
            converter
        );
        this.db = template.getDatabaseClient();
        this.r2dbcEntityTemplate = template;
        this.entityManager = entityManager;
        this.blogMapper = blogMapper;
    }

    @Override
    public Flux<Blog> findAllBy(Pageable pageable) {
        return createQuery(pageable, null).all();
    }

    RowsFetchSpec<Blog> createQuery(Pageable pageable, Condition whereClause) {
        List<Expression> columns = BlogSqlHelper.getColumns(entityTable, EntityManager.ENTITY_ALIAS);
        SelectFromAndJoin selectFrom = Select.builder().select(columns).from(entityTable);
        // we do not support Criteria here for now as of https://github.com/jhipster/generator-jhipster/issues/18269
        String select = entityManager.createSelect(selectFrom, Blog.class, pageable, whereClause);
        return db.sql(select).map(this::process);
    }

    @Override
    public Flux<Blog> findAll() {
        return findAllBy(null);
    }

    @Override
    public Mono<Blog> findById(String id) {
        Comparison whereClause = Conditions.isEqual(entityTable.column("id"), Conditions.just(StringUtils.wrap(id.toString(), "'")));
        return createQuery(null, whereClause).one();
    }

    private Blog process(Row row, RowMetadata metadata) {
        Blog entity = blogMapper.apply(row, "e");
        return entity;
    }

    @Override
    public <S extends Blog> Mono<S> save(S entity) {
        return super.save(entity);
    }
}
