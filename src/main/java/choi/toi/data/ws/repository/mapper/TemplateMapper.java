package choi.toi.data.ws.repository.mapper;

import choi.toi.data.ws.model.Template;
import choi.toi.data.ws.model.transfer.TemplateTableTransfer;
import choi.toi.data.ws.model.transfer.TemplateTransfer;

import java.util.List;

public interface TemplateMapper {

    void insertTemplate(Template template);
    List<TemplateTableTransfer> selectTableTransfers(Long userId);
    TemplateTransfer selectTransfer(Long templateId);
    List<TemplateTransfer> selectTransfers(Long templateId);
    void deleteTemplate(Long templateId);
}
