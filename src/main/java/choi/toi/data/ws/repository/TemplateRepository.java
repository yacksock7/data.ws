package choi.toi.data.ws.repository;

import choi.toi.data.ws.model.Template;
import choi.toi.data.ws.model.support.TemplateType;
import choi.toi.data.ws.model.transfer.TemplateStepTransfer;
import choi.toi.data.ws.model.transfer.TemplateTableTransfer;
import choi.toi.data.ws.model.transfer.TemplateTransfer;
import choi.toi.data.ws.repository.mapper.TemplateMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TemplateRepository {

    private TemplateMapper templateMapper;

    @Autowired
    public TemplateRepository(TemplateMapper templateMapper) {
        this.templateMapper = templateMapper;
    }

    public void insertTemplate(Template template) {
        templateMapper.insertTemplate(template);
    }

    public List<TemplateTableTransfer> selectTableTransfers(Long userId) {
        return templateMapper.selectTableTransfers(userId);
    }
    public TemplateTransfer selectTransfer(Long templateId) {
        return templateMapper.selectTransfer(templateId);
    }
    public List<TemplateTransfer> selectTransfers(Long userId) {
        return templateMapper.selectTransfers(userId);
    }

    public void delete(Long templateId) {
        templateMapper.deleteTemplate(templateId);
    }
}
