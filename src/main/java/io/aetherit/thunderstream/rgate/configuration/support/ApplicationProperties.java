package io.aetherit.thunderstream.rgate.configuration.support;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "thunderstream.rgate")
@Data
public class ApplicationProperties {
    private int networkConnTimeout;
    private int networkReadTimeout;
}
