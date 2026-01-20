package com.home.webpage.web;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.home.webpage.domain.BlogDetails;
import com.home.webpage.domain.BlogSummary;
import com.home.webpage.service.BlogService;
import java.time.Instant;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@ExtendWith(MockitoExtension.class)
class BlogControllerTest {

  @Mock private BlogService blogService;

  @Test
  void listShouldDelegateToService() {
    Pageable pageable = PageRequest.of(1, 20);
    var content =
        List.of(
            new BlogSummary(1L, "Title 1", "Short 1", Instant.parse("2026-01-20T10:15:30Z")),
            new BlogSummary(2L, "Title 2", "Short 2", Instant.parse("2026-01-20T10:20:30Z")));
    var page = new PageImpl<>(content, pageable, content.size());

    when(blogService.list(pageable)).thenReturn(page);

    var controller = new BlogController(blogService);

    var result = controller.list(pageable);

    assertThat(result).isSameAs(page);
    verify(blogService).list(pageable);
  }

  @Test
  void detailsShouldDelegateToService() {
    var id = 42L;
    var details =
        new BlogDetails(
            id,
            "Some title",
            "Short description",
            "# Long description",
            Instant.parse("2026-01-20T10:15:30Z"));

    when(blogService.details(id)).thenReturn(details);

    var controller = new BlogController(blogService);

    var result = controller.details(id);

    assertThat(result).isSameAs(details);
    verify(blogService).details(id);
  }
}
