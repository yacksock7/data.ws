package choi.toi.data.ws.configuration.support;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix="storage.credentials")
@Data
public class StorageCredentials {

    private String google;
    private String oracle;
//    private String ;
}
