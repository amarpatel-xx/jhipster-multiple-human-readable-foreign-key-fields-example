package com.saathratri.developer.store.service.dto;

import jakarta.persistence.Lob;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

/**
 * A DTO for the {@link com.saathratri.developer.store.domain.Report} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ReportDTO implements Serializable {

    private UUID id;

    @NotNull
    @Size(max = 255)
    private String fileName;

    @NotNull
    @Size(max = 10)
    private String fileExtension;

    @NotNull
    private Instant createDate;

    @Lob
    private byte[] file;

    private String fileContentType;

    private Boolean approved;

    private ProductDTO product;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileExtension() {
        return fileExtension;
    }

    public void setFileExtension(String fileExtension) {
        this.fileExtension = fileExtension;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public byte[] getFile() {
        return file;
    }

    public void setFile(byte[] file) {
        this.file = file;
    }

    public String getFileContentType() {
        return fileContentType;
    }

    public void setFileContentType(String fileContentType) {
        this.fileContentType = fileContentType;
    }

    public Boolean getApproved() {
        return approved;
    }

    public void setApproved(Boolean approved) {
        this.approved = approved;
    }

    public ProductDTO getProduct() {
        return product;
    }

    public void setProduct(ProductDTO product) {
        this.product = product;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ReportDTO)) {
            return false;
        }

        ReportDTO reportDTO = (ReportDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, reportDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ReportDTO{" +
            "id='" + getId() + "'" +
            ", fileName='" + getFileName() + "'" +
            ", fileExtension='" + getFileExtension() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", file='" + getFile() + "'" +
            ", approved='" + getApproved() + "'" +
            ", product=" + getProduct() +
            "}";
    }
}
