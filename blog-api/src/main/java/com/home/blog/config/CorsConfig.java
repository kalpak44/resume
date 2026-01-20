package com.home.blog.config;

import com.home.blog.config.props.AppCorsProperties;
import org.jspecify.annotations.NonNull;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableConfigurationProperties(AppCorsProperties.class)
public class CorsConfig implements WebMvcConfigurer {

  private final AppCorsProperties props;

  public CorsConfig(AppCorsProperties props) {
    this.props = props;
  }

  @Override
  public void addCorsMappings(@NonNull CorsRegistry registry) {
    for (String path : props.getPaths()) {
      registry
          .addMapping(path)
          .allowedOrigins(props.getAllowedOrigins().toArray(new String[0]))
          .allowedMethods(props.getAllowedMethods().toArray(new String[0]))
          .allowedHeaders(props.getAllowedHeaders().toArray(new String[0]))
          .allowCredentials(props.isAllowCredentials())
          .maxAge(props.getMaxAge());
    }
  }
}
