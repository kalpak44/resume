package com.home.webpage.domain;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.Instant;
import org.junit.jupiter.api.Test;

class BlogSummaryTest {

  @Test
  void shouldHoldAllValues() {
    var id = 1L;
    var title = "Some title";
    var shortDescription = "Short description";
    var createdAt = Instant.parse("2026-01-20T10:15:30Z");

    var summary = new BlogSummary(id, title, shortDescription, createdAt);

    assertThat(summary)
        .extracting(
            BlogSummary::id,
            BlogSummary::title,
            BlogSummary::shortDescription,
            BlogSummary::createdAt)
        .containsExactly(id, title, shortDescription, createdAt);
  }
}
