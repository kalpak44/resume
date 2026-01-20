package com.home.webpage.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

  @Bean
  public OpenAPI openAPI() {
    return new OpenAPI()
        .info(
            new Info()
                .title("Blog API")
                .description("Simple blog API")
                .version("0.0.1")
                .contact(
                    new Contact().name("Pavel Usanli").url("https://blog.pavel-usanli.online/")))
        .servers(
            List.of(
                new Server().url("https://blog.pavel-usanli.online/"),
                new Server().url("http://localhost:8080")));
  }
}
