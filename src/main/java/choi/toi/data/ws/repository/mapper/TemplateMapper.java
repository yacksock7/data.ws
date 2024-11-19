package choi.toi.data.ws.repository.mapper;

import choi.toi.data.ws.model.Template;
import choi.toi.data.ws.model.support.TemplateType;
import choi.toi.data.ws.model.transfer.TemplateStepTransfer;
import choi.toi.data.ws.model.transfer.TemplateTableTransfer;
import choi.toi.data.ws.model.transfer.TemplateTransfer;

import java.util.List;

public interface TemplateMapper {

    void insertTemplate(Template template);
    Template selectTemplateById(Long templateId);
    TemplateTransfer selectTemplateTransfer(Long templateId);
    List<Template> selectTemplateByUserId(Long userId);
    List<Template> selectTemplateByTemplateType(TemplateType type);
    List<TemplateTableTransfer> selectTableTransfers(Long userId);
    void updateTemplate(Template template);
    void deleteTemplate(Long templateId);
}
