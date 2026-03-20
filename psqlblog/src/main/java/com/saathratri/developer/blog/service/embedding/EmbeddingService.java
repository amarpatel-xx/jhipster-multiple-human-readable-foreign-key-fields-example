package com.saathratri.developer.blog.service.embedding;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.embedding.EmbeddingResponse;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

/**
 * Service for generating and managing vector embeddings.
 * Uses Spring AI's EmbeddingModel to generate embeddings from text.
 */
@Service
public class EmbeddingService {

    private static final Logger LOG = LoggerFactory.getLogger(EmbeddingService.class);

    private final EmbeddingModel embeddingModel;

    public EmbeddingService(@Nullable EmbeddingModel embeddingModel) {
        this.embeddingModel = embeddingModel;
        if (embeddingModel == null) {
            LOG.warn(
                "EmbeddingModel is null. Embedding generation will be disabled. " +
                    "Configure openai.api-key or set OPENAI_API_KEY environment variable to enable embeddings."
            );
        }
    }

    /**
     * Check if embedding generation is available.
     *
     * @return true if embedding model is configured and ready
     */
    public boolean isAvailable() {
        return embeddingModel != null;
    }

    /**
     * Generate an embedding vector from text.
     *
     * @param text the text to embed
     * @return the embedding as a float array, or null if embedding model is not available
     */
    @Nullable
    public float[] generateEmbedding(String text) {
        if (embeddingModel == null) {
            LOG.debug("Embedding model not available, skipping embedding generation");
            return null;
        }
        if (text == null || text.isBlank()) {
            LOG.debug("Text is null or blank, skipping embedding generation");
            return null;
        }
        try {
            EmbeddingResponse response = embeddingModel.embedForResponse(List.of(text));
            float[] embedding = response.getResult().getOutput();
            LOG.debug("Generated embedding with {} dimensions for text of length {}", embedding.length, text.length());
            return embedding;
        } catch (Exception e) {
            LOG.error("Failed to generate embedding for text: {}", e.getMessage(), e);
            return null;
        }
    }

    /**
     * Generate an embedding and convert to byte array for database storage.
     *
     * @param text the text to embed
     * @return the embedding as bytes, or null if generation fails
     */
    @Nullable
    public float[] generateEmbeddingAsFloats(String text) {
        float[] embedding = generateEmbedding(text);
        return embedding;
    }

    /**
     * Generate an embedding and format as a PostgreSQL vector string.
     * Format: "[0.1, 0.2, 0.3, ...]"
     *
     * @param text the text to embed
     * @return the embedding as a vector string, or null if generation fails
     */
    @Nullable
    public String generateEmbeddingAsVectorString(String text) {
        float[] embedding = generateEmbedding(text);
        return embedding != null ? floatArrayToVectorString(embedding) : null;
    }

    /**
     * Convert a float array to bytes for database storage.
     *
     * @param floats the float array
     * @return byte array representation
     */
    public byte[] floatArrayToBytes(float[] floats) {
        ByteBuffer buffer = ByteBuffer.allocate(floats.length * 4);
        buffer.order(ByteOrder.LITTLE_ENDIAN);
        for (float f : floats) {
            buffer.putFloat(f);
        }
        return buffer.array();
    }

    /**
     * Convert bytes back to a float array.
     *
     * @param bytes the byte array
     * @return float array representation
     */
    public float[] bytesToFloatArray(byte[] bytes) {
        ByteBuffer buffer = ByteBuffer.wrap(bytes);
        buffer.order(ByteOrder.LITTLE_ENDIAN);
        float[] floats = new float[bytes.length / 4];
        for (int i = 0; i < floats.length; i++) {
            floats[i] = buffer.getFloat();
        }
        return floats;
    }

    /**
     * Convert a float array to PostgreSQL vector string format.
     * Format: "[0.1, 0.2, 0.3, ...]"
     *
     * @param floats the float array
     * @return vector string for PostgreSQL
     */
    public String floatArrayToVectorString(float[] floats) {
        return (
            "[" +
            Arrays.stream(toFloatObjectArray(floats))
                .map(f -> String.format("%.8f", f))
                .collect(Collectors.joining(", ")) +
            "]"
        );
    }

    /**
     * Parse a PostgreSQL vector string to float array.
     *
     * @param vectorString the vector string "[0.1, 0.2, ...]"
     * @return float array
     */
    public float[] vectorStringToFloatArray(String vectorString) {
        String cleaned = vectorString.replaceAll("[\\[\\]]", "").trim();
        String[] parts = cleaned.split(",");
        float[] floats = new float[parts.length];
        for (int i = 0; i < parts.length; i++) {
            floats[i] = Float.parseFloat(parts[i].trim());
        }
        return floats;
    }

    private Float[] toFloatObjectArray(float[] floats) {
        Float[] result = new Float[floats.length];
        for (int i = 0; i < floats.length; i++) {
            result[i] = floats[i];
        }
        return result;
    }
}
