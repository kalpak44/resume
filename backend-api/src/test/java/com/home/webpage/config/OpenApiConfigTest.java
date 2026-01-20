package com.home.webpage.config;

import static org.assertj.core.api.Assertions.assertThat;

import com.home.webpage.config.props.AppOpenApiProperties;
import io.swagger.v3.oas.models.OpenAPI;
import java.util.List;
import org.junit.jupiter.api.Test;

class OpenApiConfigTest {

  @Test
  void shouldBuildExpectedOpenApiDefinition() {
    var props = new AppOpenApiProperties();
    props.setTitle("Test API");
    props.setDescription("Test Desc");
    props.setVersion("1.0.0");

    var contact = new AppOpenApiProperties.Contact();
    contact.setName("Tester");
    contact.setUrl("http://test.com");
    props.setContact(contact);

    var server = new AppOpenApiProperties.Server();
    server.setUrl("http://api.test.com");
    server.setDescription("Test Server");
    props.setServers(List.of(server));

    var config = new OpenApiConfig(props);

    OpenAPI api = config.openAPI();

    assertThat(api.getInfo().getTitle()).isEqualTo("Test API");
    assertThat(api.getInfo().getDescription()).isEqualTo("Test Desc");
    assertThat(api.getInfo().getVersion()).isEqualTo("1.0.0");
    assertThat(api.getInfo().getContact().getName()).isEqualTo("Tester");
    assertThat(api.getInfo().getContact().getUrl()).isEqualTo("http://test.com");

    assertThat(api.getServers()).hasSize(1);
    assertThat(api.getServers().get(0).getUrl()).isEqualTo("http://api.test.com");
    assertThat(api.getServers().get(0).getDescription()).isEqualTo("Test Server");
  }
}
