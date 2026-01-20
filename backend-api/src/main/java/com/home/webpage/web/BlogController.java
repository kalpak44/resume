package com.home.webpage.web;

import com.home.webpage.domain.BlogDetails;
import com.home.webpage.domain.BlogSummary;
import com.home.webpage.service.BlogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Blogs")
@RestController
@RequestMapping("/blogs")
public class BlogController {

  private final BlogService blogService;

  public BlogController(BlogService blogService) {
    this.blogService = blogService;
  }

  @Operation(
      summary = "List blogs (paginated)",
      description = "Returns blog summaries ordered by creation date (newest first).")
  @GetMapping
  public Page<BlogSummary> list(
      @ParameterObject
          @Parameter(description = "Pagination parameters: page, size, sort")
          @PageableDefault(size = 20)
          Pageable pageable) {
    return blogService.list(pageable);
  }

  @Operation(summary = "Get blog details", description = "Returns a single blog by id.")
  @GetMapping("/{id}")
  public BlogDetails details(
      @Parameter(description = "Blog id", required = true) @PathVariable Long id) {
    return blogService.details(id);
  }
}
