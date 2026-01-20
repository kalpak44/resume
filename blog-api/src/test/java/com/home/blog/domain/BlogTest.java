package com.home.blog.domain;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.Instant;
import org.junit.jupiter.api.Test;

class BlogTest {

  @Test
  void shouldStoreAndReturnValues() {
    var title = "Some title";
    var shortDescription = "Short description";
    var longDescriptionMd = "# Long description";
    var createdAt = Instant.parse("2026-01-20T10:15:30Z");

    var blog = new Blog();

    blog.setTitle(title);
    blog.setShortDescription(shortDescription);
    blog.setLongDescriptionMd(longDescriptionMd);
    blog.setCreatedAt(createdAt);

    assertThat(blog)
        .extracting(
            Blog::getId,
            Blog::getTitle,
            Blog::getShortDescription,
            Blog::getLongDescriptionMd,
            Blog::getCreatedAt)
        .containsExactly(null, title, shortDescription, longDescriptionMd, createdAt);
  }
}
