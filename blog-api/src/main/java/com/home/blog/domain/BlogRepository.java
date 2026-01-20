package com.home.blog.domain;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BlogRepository extends JpaRepository<Blog, Long> {

  @Query(
      """
        select new com.home.blog.domain.BlogSummary(b.id, b.title, b.shortDescription, b.createdAt)
        from Blog b
        order by b.createdAt desc
    """)
  Page<BlogSummary> findSummaries(Pageable pageable);

  @Query(
      """
        select new com.home.blog.domain.BlogDetails(b.id, b.title, b.shortDescription, b.longDescriptionMd, b.createdAt)
        from Blog b
        where b.id = :id
    """)
  Optional<BlogDetails> findDetailsById(Long id);
}
