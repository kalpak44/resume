package com.home.webpage.config;

import com.home.webpage.config.props.AppOpenApiProperties;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(AppOpenApiProperties.class)
public class OpenApiConfig {

  private final AppOpenApiProperties properties;

  public OpenApiConfig(AppOpenApiProperties properties) {
    this.properties = properties;
  }

  @Bean
  public OpenAPI openAPI() {
    var info =
        new Info()
            .title(properties.getTitle())
            .description(properties.getDescription())
            .version(properties.getVersion());

    if (properties.getContact() != null) {
      info.contact(
          new Contact()
              .name(properties.getContact().getName())
              .url(properties.getContact().getUrl()));
    }

    var openAPI = new OpenAPI().info(info);

    if (properties.getServers() != null) {
      openAPI.servers(
          properties.getServers().stream()
              .map(s -> new Server().url(s.getUrl()).description(s.getDescription()))
              .toList());
    }

    return openAPI;
  }
}
