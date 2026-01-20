package com.home.blog.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.home.blog.domain.BlogDetails;
import com.home.blog.domain.BlogRepository;
import com.home.blog.domain.BlogSummary;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@ExtendWith(MockitoExtension.class)
class BlogServiceTest {

  @Mock private BlogRepository blogRepository;

  @Test
  void listShouldReturnSummariesFromRepository() {
    var pageable = PageRequest.of(0, 10);
    var content =
        List.of(
            new BlogSummary(1L, "Title 1", "Short 1", Instant.parse("2026-01-20T10:15:30Z")),
            new BlogSummary(2L, "Title 2", "Short 2", Instant.parse("2026-01-20T10:20:30Z")));
    var page = new PageImpl<>(content, pageable, content.size());

    when(blogRepository.findSummaries(pageable)).thenReturn(page);

    var service = new BlogService(blogRepository);

    var result = service.list(pageable);

    assertThat(result).isSameAs(page);
    verify(blogRepository).findSummaries(pageable);
  }

  @Test
  void detailsShouldReturnDetailsWhenFound() {
    var id = 42L;
    var details =
        new BlogDetails(
            id,
            "Some title",
            "Short description",
            "# Long description",
            Instant.parse("2026-01-20T10:15:30Z"));

    when(blogRepository.findDetailsById(id)).thenReturn(Optional.of(details));

    var service = new BlogService(blogRepository);

    var result = service.details(id);

    assertThat(result).isSameAs(details);
    verify(blogRepository).findDetailsById(id);
  }

  @Test
  void detailsShouldThrowNotFoundWhenMissing() {
    var id = 404L;

    when(blogRepository.findDetailsById(id)).thenReturn(Optional.empty());

    var service = new BlogService(blogRepository);

    assertThatThrownBy(() -> service.details(id))
        .isInstanceOf(ResponseStatusException.class)
        .extracting(ex -> ((ResponseStatusException) ex).getStatusCode())
        .isEqualTo(HttpStatus.NOT_FOUND);

    verify(blogRepository).findDetailsById(id);
  }
}
