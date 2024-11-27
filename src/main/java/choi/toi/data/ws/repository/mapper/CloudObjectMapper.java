package choi.toi.data.ws.repository.mapper;


import choi.toi.data.ws.model.CloudObject;

public interface CloudObjectMapper {
    void insertCloudObject(CloudObject cloudObject);
    CloudObject selectCloudObject(Long id);
}
