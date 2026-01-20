package com.home.webpage.config.props;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import org.junit.jupiter.api.Test;

class AppCorsPropertiesTest {

  @Test
  void shouldStoreAndReturnValues() {
    var paths = List.of("/**", "/api/**");
    var allowedOrigins = List.of("https://a.example", "https://b.example");
    var allowedMethods = List.of("GET", "POST");
    var allowedHeaders = List.of("Authorization", "Content-Type");
    var allowCredentials = true;
    var maxAge = 3600L;

    var props = new AppCorsProperties();

    props.setPaths(paths);
    props.setAllowedOrigins(allowedOrigins);
    props.setAllowedMethods(allowedMethods);
    props.setAllowedHeaders(allowedHeaders);
    props.setAllowCredentials(allowCredentials);
    props.setMaxAge(maxAge);

    assertThat(props)
        .extracting(
            AppCorsProperties::getPaths,
            AppCorsProperties::getAllowedOrigins,
            AppCorsProperties::getAllowedMethods,
            AppCorsProperties::getAllowedHeaders,
            AppCorsProperties::isAllowCredentials,
            AppCorsProperties::getMaxAge)
        .containsExactly(
            paths, allowedOrigins, allowedMethods, allowedHeaders, allowCredentials, maxAge);
  }
}
