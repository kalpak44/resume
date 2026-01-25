package com.home.webpage.domain;

import java.time.Instant;

public record BlogDetails(
    Long id, String title, String description, Instant createdAt) {}
