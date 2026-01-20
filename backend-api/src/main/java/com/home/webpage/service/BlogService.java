package com.home.webpage.service;

import com.home.webpage.domain.BlogDetails;
import com.home.webpage.domain.BlogRepository;
import com.home.webpage.domain.BlogSummary;
import com.home.webpage.exception.ResourceNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class BlogService {

  private final BlogRepository blogRepository;

  public BlogService(BlogRepository blogRepository) {
    this.blogRepository = blogRepository;
  }

  public Page<BlogSummary> list(Pageable pageable) {
    return blogRepository.findSummaries(pageable);
  }

  public BlogDetails details(Long id) {
    return blogRepository
        .findDetailsById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Blog not found with id: " + id));
  }
}
