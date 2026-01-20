package com.home.webpage;

import static java.time.ZoneOffset.UTC;

import java.util.TimeZone;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MainApplication {
  static void main(String[] args) {
    // Set the default time zone to UTC.
    TimeZone.setDefault(TimeZone.getTimeZone(UTC));

    // Start the Spring Boot application.
    SpringApplication.run(MainApplication.class, args);
  }
}
