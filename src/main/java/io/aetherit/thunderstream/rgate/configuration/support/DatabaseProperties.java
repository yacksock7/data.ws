package io.aetherit.thunderstream.rgate.configuration.support;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix="thunderstream.mybatis")
@Data
public class DatabaseProperties {
    private String driverClassName;
    private String url;
    private String username;
    private String password;
    private int minIdle;
    private int maxPoolSize;
    private String configLocation;
}

