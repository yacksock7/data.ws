package choi.toi.data.ws.service.tranlation;

import choi.toi.data.ws.exception.ErrorCode;
import choi.toi.data.ws.exception.ServiceException;
import choi.toi.data.ws.model.support.LangType;
import com.google.api.gax.core.CredentialsProvider;
import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.translate.v3.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;

@Slf4j
@Service
public class GcpTranslateService {

    @Value("${gcp.projectId}")
    private String projectId;
    @Value("${google.translation.key}")
    private String credentialsKey;

    public String execute(LangType targetLang, String sourceText) throws IOException {
        log.trace("[GCPTranslateService] executeTranslation Start... targetLang={}, sourceText={}", targetLang, sourceText);

        CredentialsProvider credentialsProvider = null;
        TranslationServiceSettings settings = null;
        try {
            credentialsProvider = FixedCredentialsProvider.create(ServiceAccountCredentials.fromStream(new FileInputStream(credentialsKey)));
            settings = TranslationServiceSettings.newBuilder().setCredentialsProvider(credentialsProvider).build();
        } catch (IOException e) {
            e.printStackTrace();
        }

        StringBuffer result = new StringBuffer();
        try(TranslationServiceClient client = TranslationServiceClient.create(settings)){
            LocationName parent = LocationName.of(projectId, "global");

            String targetLanguageCode = convertLang(targetLang);

            TranslateTextRequest request =
                    TranslateTextRequest.newBuilder()
                            .setParent(parent.toString())
                            .setMimeType("text/plain")
                            .setTargetLanguageCode(targetLanguageCode)
                            .addContents(sourceText)
                            .build();

            TranslateTextResponse response = client.translateText(request);
            for(Translation translation : response.getTranslationsList()) {
                result.append(translation.getTranslatedText());
            }

            return result.toString();
        }
    }

    private String convertLang(LangType language){
        switch (language) {
            case kr : return "ko";
            case en : return "en";
            case zh : return "zh-CN";
            case jp : return "ja";
            case de : return "de";
            case es : return "es";
            case ru : return "ru";
            case fr : return "fr";
            default :
                log.warn("Can not convert lang type for gcp translation by unknown lang type. language={}", language);
                throw new ServiceException(ErrorCode.Unknown, "Can not convert lang type for gcp translation by unknown lang type");
        }
    }

}