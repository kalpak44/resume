package com.home.blog.service;

import com.home.blog.domain.BlogDetails;
import com.home.blog.domain.BlogRepository;
import com.home.blog.domain.BlogSummary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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
        return blogRepository.findDetailsById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}