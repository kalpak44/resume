package com.home.blog.domain;

import java.time.Instant;

public record BlogDetails(
    Long id, String title, String shortDescription, String longDescriptionMd, Instant createdAt) {}
