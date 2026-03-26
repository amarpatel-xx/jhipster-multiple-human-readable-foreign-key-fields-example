package com.saathratri.developer.store.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;
import java.util.UUID;

/**
 * A Report.
 */
@Entity
@Table(name = "report")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Report implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    @Column(name = "id")
    private UUID id;

    @NotNull
    @Size(max = 255)
    @Column(name = "file_name", length = 255, nullable = false)
    private String fileName;

    @NotNull
    @Size(max = 10)
    @Column(name = "file_extension", length = 10, nullable = false)
    private String fileExtension;

    @NotNull
    @Column(name = "create_date", nullable = false)
    private Instant createDate;

    @Lob
    @Column(name = "file", nullable = false)
    private byte[] file;

    @NotNull
    @Column(name = "file_content_type", nullable = false)
    private String fileContentType;

    @Column(name = "approved")
    private Boolean approved;

    @ManyToOne(fetch = FetchType.LAZY)
    private Product product;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public UUID getId() {
        return this.id;
    }

    public Report id(UUID id) {
        this.setId(id);
        return this;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getFileName() {
        return this.fileName;
    }

    public Report fileName(String fileName) {
        this.setFileName(fileName);
        return this;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileExtension() {
        return this.fileExtension;
    }

    public Report fileExtension(String fileExtension) {
        this.setFileExtension(fileExtension);
        return this;
    }

    public void setFileExtension(String fileExtension) {
        this.fileExtension = fileExtension;
    }

    public Instant getCreateDate() {
        return this.createDate;
    }

    public Report createDate(Instant createDate) {
        this.setCreateDate(createDate);
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public byte[] getFile() {
        return this.file;
    }

    public Report file(byte[] file) {
        this.setFile(file);
        return this;
    }

    public void setFile(byte[] file) {
        this.file = file;
    }

    public String getFileContentType() {
        return this.fileContentType;
    }

    public Report fileContentType(String fileContentType) {
        this.fileContentType = fileContentType;
        return this;
    }

    public void setFileContentType(String fileContentType) {
        this.fileContentType = fileContentType;
    }

    public Boolean getApproved() {
        return this.approved;
    }

    public Report approved(Boolean approved) {
        this.setApproved(approved);
        return this;
    }

    public void setApproved(Boolean approved) {
        this.approved = approved;
    }

    public Product getProduct() {
        return this.product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Report product(Product product) {
        this.setProduct(product);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Report)) {
            return false;
        }
        return getId() != null && getId().equals(((Report) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Report{" +
            "id=" + getId() +
            ", fileName='" + getFileName() + "'" +
            ", fileExtension='" + getFileExtension() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", file='" + getFile() + "'" +
            ", fileContentType='" + getFileContentType() + "'" +
            ", approved='" + getApproved() + "'" +
            "}";
    }
}
