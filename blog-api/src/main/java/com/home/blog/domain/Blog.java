package com.home.blog.domain;

import java.time.Instant;

import jakarta.persistence.*;

@Entity
@Table(name = "blog")
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(name = "short_description", nullable = false, length = 500)
    private String shortDescription;

    @Column(name = "long_description_md", nullable = false, columnDefinition = "text")
    private String longDescriptionMd;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    public Blog() {}

    public Long getId() { return id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }

    public String getLongDescriptionMd() { return longDescriptionMd; }
    public void setLongDescriptionMd(String longDescriptionMd) { this.longDescriptionMd = longDescriptionMd; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}