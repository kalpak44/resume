package com.home.blog.config;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyBoolean;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.home.blog.config.props.AppCorsProperties;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.servlet.config.annotation.CorsRegistration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@ExtendWith(MockitoExtension.class)
class CorsConfigTest {

  @Mock private AppCorsProperties props;
  @Mock private CorsRegistry registry;
  @Mock private CorsRegistration registration;

  @Test
  void shouldRegisterCorsMappingsForEveryPath() {
    var paths = List.of("/**", "/api/**");
    var origins = List.of("https://a.example", "https://b.example");
    var methods = List.of("GET", "POST");
    var headers = List.of("Authorization", "Content-Type");
    var allowCredentials = true;
    var maxAge = 3600L;

    when(props.getPaths()).thenReturn(paths);
    when(props.getAllowedOrigins()).thenReturn(origins);
    when(props.getAllowedMethods()).thenReturn(methods);
    when(props.getAllowedHeaders()).thenReturn(headers);
    when(props.isAllowCredentials()).thenReturn(allowCredentials);
    when(props.getMaxAge()).thenReturn(maxAge);

    when(registry.addMapping(anyString())).thenReturn(registration);
    when(registration.allowedOrigins(any(String[].class))).thenReturn(registration);
    when(registration.allowedMethods(any(String[].class))).thenReturn(registration);
    when(registration.allowedHeaders(any(String[].class))).thenReturn(registration);
    when(registration.allowCredentials(anyBoolean())).thenReturn(registration);
    when(registration.maxAge(anyLong())).thenReturn(registration);

    var config = new CorsConfig(props);

    config.addCorsMappings(registry);

    var pathCaptor = ArgumentCaptor.forClass(String.class);
    verify(registry, times(paths.size())).addMapping(pathCaptor.capture());
    assertThat(pathCaptor.getAllValues()).containsExactlyElementsOf(paths);

    var originsCaptor = ArgumentCaptor.forClass(String[].class);
    var methodsCaptor = ArgumentCaptor.forClass(String[].class);
    var headersCaptor = ArgumentCaptor.forClass(String[].class);

    verify(registration, times(paths.size())).allowedOrigins(originsCaptor.capture());
    verify(registration, times(paths.size())).allowedMethods(methodsCaptor.capture());
    verify(registration, times(paths.size())).allowedHeaders(headersCaptor.capture());
    verify(registration, times(paths.size())).allowCredentials(allowCredentials);
    verify(registration, times(paths.size())).maxAge(maxAge);

    assertThat(originsCaptor.getAllValues())
        .allSatisfy(v -> assertThat(v).containsExactlyElementsOf(origins));
    assertThat(methodsCaptor.getAllValues())
        .allSatisfy(v -> assertThat(v).containsExactlyElementsOf(methods));
    assertThat(headersCaptor.getAllValues())
        .allSatisfy(v -> assertThat(v).containsExactlyElementsOf(headers));
  }
}
