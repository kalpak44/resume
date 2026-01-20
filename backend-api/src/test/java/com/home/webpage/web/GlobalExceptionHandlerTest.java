package com.home.webpage.web;

import static org.assertj.core.api.Assertions.assertThat;

import com.home.webpage.exception.ResourceNotFoundException;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

class GlobalExceptionHandlerTest {

  private final GlobalExceptionHandler handler = new GlobalExceptionHandler();

  @Test
  void handleResourceNotFoundExceptionShouldReturnProblemDetailWithNotFound() {
    var message = "Not found";
    var exception = new ResourceNotFoundException(message);

    var problemDetail = handler.handleResourceNotFoundException(exception);

    assertThat(problemDetail.getStatus()).isEqualTo(HttpStatus.NOT_FOUND.value());
    assertThat(problemDetail.getDetail()).isEqualTo(message);
  }

  @Test
  void handleGeneralExceptionShouldReturnProblemDetailWithInternalServerError() {
    var exception = new RuntimeException("Something went wrong");

    var problemDetail = handler.handleGeneralException(exception);

    assertThat(problemDetail.getStatus()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR.value());
    assertThat(problemDetail.getDetail()).isEqualTo("An unexpected error occurred");
  }
}
