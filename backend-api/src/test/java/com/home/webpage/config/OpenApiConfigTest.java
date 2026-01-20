package com.home.webpage.config;

import static org.assertj.core.api.Assertions.assertThat;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.junit.jupiter.api.Test;

class OpenApiConfigTest {

  @Test
  void shouldBuildExpectedOpenApiDefinition() {
    var config = new OpenApiConfig();

    OpenAPI api = config.openAPI();

    assertThat(api.getInfo())
        .usingRecursiveComparison()
        .isEqualTo(
            new Info()
                .title("Blog API")
                .description("Simple blog API")
                .version("0.0.1")
                .contact(
                    new Contact().name("Pavel Usanli").url("https://blog.pavel-usanli.online/")));

    assertThat(api.getServers())
        .usingRecursiveFieldByFieldElementComparator()
        .containsExactly(
            new Server().url("https://blog.pavel-usanli.online/"),
            new Server().url("http://localhost:8080"));
  }
}
