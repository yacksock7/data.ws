package choi.toi.data.ws.repository;

import choi.toi.data.ws.model.CloudObject;
import choi.toi.data.ws.repository.mapper.CloudObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CloudObjectRepository {

    private CloudObjectMapper cloudObjectMapper;

    @Autowired
    public CloudObjectRepository(CloudObjectMapper cloudObjectMapper) {
        this.cloudObjectMapper = cloudObjectMapper;
    }

    public void insertCloudObject(CloudObject cloudObject) {
        cloudObjectMapper.insertCloudObject(cloudObject);
    }

    public CloudObject selectCloudObject(Long id) {
        return cloudObjectMapper.selectCloudObject(id);
    }
}
