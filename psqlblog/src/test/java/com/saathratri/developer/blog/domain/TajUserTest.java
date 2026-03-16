package com.saathratri.developer.blog.domain;

import static com.saathratri.developer.blog.domain.TajUserTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.saathratri.developer.blog.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TajUserTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TajUser.class);
        TajUser tajUser1 = getTajUserSample1();
        TajUser tajUser2 = new TajUser();
        assertThat(tajUser1).isNotEqualTo(tajUser2);

        tajUser2.setId(tajUser1.getId());
        assertThat(tajUser1).isEqualTo(tajUser2);

        tajUser2 = getTajUserSample2();
        assertThat(tajUser1).isNotEqualTo(tajUser2);
    }
}
