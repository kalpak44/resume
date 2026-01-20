package com.home.webpage.domain;

import java.time.Instant;

public record BlogSummary(Long id, String title, String shortDescription, Instant createdAt) {}
