package choi.toi.data.ws.model;


import choi.toi.data.ws.model.support.LangType;
import choi.toi.data.ws.model.support.MachineEngineType;
import choi.toi.data.ws.model.support.MachineType;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MachineOption {
    private MachineType machineType;
    private MachineEngineType engine;
    private LangType sourceLang;
    private LangType targetLang;

    public static MachineOption convertStringToMachineOption(String value) {
        final ObjectMapper objectMapper = new ObjectMapper();
        MachineOption options = null;
        try {
            options = objectMapper.readValue(value, MachineOption.class);
        } catch (JsonProcessingException e) {
            log.warn("convertStringToMachineOption Failed. value={}", value);
        } finally {
            return options;
        }
    }
}