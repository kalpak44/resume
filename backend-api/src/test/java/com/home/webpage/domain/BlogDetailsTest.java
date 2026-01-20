package com.home.webpage.domain;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.Instant;
import org.junit.jupiter.api.Test;

class BlogDetailsTest {

  @Test
  void shouldHoldAllValues() {
    var id = 1L;
    var title = "Some title";
    var shortDescription = "Short description";
    var longDescriptionMd = "# Long description";
    var createdAt = Instant.parse("2026-01-20T10:15:30Z");

    var details = new BlogDetails(id, title, shortDescription, longDescriptionMd, createdAt);

    assertThat(details)
        .extracting(
            BlogDetails::id,
            BlogDetails::title,
            BlogDetails::shortDescription,
            BlogDetails::longDescriptionMd,
            BlogDetails::createdAt)
        .containsExactly(id, title, shortDescription, longDescriptionMd, createdAt);
  }
}
