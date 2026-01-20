package com.home.webpage.config.props;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import org.junit.jupiter.api.Test;

class AppOpenApiPropertiesTest {

  @Test
  void shouldStoreAndReturnValues() {
    var title = "Test Title";
    var description = "Test Description";
    var version = "1.2.3";

    var contactName = "Tester";
    var contactUrl = "http://test.com";
    var contact = new AppOpenApiProperties.Contact();
    contact.setName(contactName);
    contact.setUrl(contactUrl);

    var serverUrl = "http://api.test.com";
    var serverDescription = "Test Server";
    var server = new AppOpenApiProperties.Server();
    server.setUrl(serverUrl);
    server.setDescription(serverDescription);
    var servers = List.of(server);

    var props = new AppOpenApiProperties();
    props.setTitle(title);
    props.setDescription(description);
    props.setVersion(version);
    props.setContact(contact);
    props.setServers(servers);

    assertThat(props.getTitle()).isEqualTo(title);
    assertThat(props.getDescription()).isEqualTo(description);
    assertThat(props.getVersion()).isEqualTo(version);
    assertThat(props.getContact().getName()).isEqualTo(contactName);
    assertThat(props.getContact().getUrl()).isEqualTo(contactUrl);
    assertThat(props.getServers()).hasSize(1);
    assertThat(props.getServers().get(0).getUrl()).isEqualTo(serverUrl);
    assertThat(props.getServers().get(0).getDescription()).isEqualTo(serverDescription);
  }
}
