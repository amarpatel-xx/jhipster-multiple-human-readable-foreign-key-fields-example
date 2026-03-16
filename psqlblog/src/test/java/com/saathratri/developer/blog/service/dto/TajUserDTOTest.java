package com.saathratri.developer.blog.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.saathratri.developer.blog.web.rest.TestUtil;
import java.util.UUID;
import org.junit.jupiter.api.Test;

class TajUserDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TajUserDTO.class);
        TajUserDTO tajUserDTO1 = new TajUserDTO();
        tajUserDTO1.setId(UUID.randomUUID());
        TajUserDTO tajUserDTO2 = new TajUserDTO();
        assertThat(tajUserDTO1).isNotEqualTo(tajUserDTO2);
        tajUserDTO2.setId(tajUserDTO1.getId());
        assertThat(tajUserDTO1).isEqualTo(tajUserDTO2);
        tajUserDTO2.setId(UUID.randomUUID());
        assertThat(tajUserDTO1).isNotEqualTo(tajUserDTO2);
        tajUserDTO1.setId(null);
        assertThat(tajUserDTO1).isNotEqualTo(tajUserDTO2);
    }
}
