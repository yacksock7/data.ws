package choi.toi.data.ws.util;


import choi.toi.data.ws.configuration.support.MailProperties;
import choi.toi.data.ws.configuration.support.SmtpProperties;
import choi.toi.data.ws.model.support.MailType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Map;
import java.util.Properties;


@Slf4j
@Service
public class MailSenderUsingOCI {

    private MailProperties mailProperties;
    private SmtpProperties smtpProperties;
    private SpringTemplateEngine templateEngine;

    @Autowired
    public MailSenderUsingOCI(MailProperties mailProperties,
                              SmtpProperties smtpProperties,
                              SpringTemplateEngine templateEngine) {
        this.mailProperties = mailProperties;
        this.smtpProperties = smtpProperties;
        this.templateEngine = templateEngine;
    }

    public boolean sendMessage(String sendTo, MailType mailType, Map<String, String> map) throws Exception {
        final String subject = "Data Service";
        final String contents = getContentsForMail(mailType, map);
        final Properties props = getPropsForSendMessage();
        final Session session = Session.getDefaultInstance(props);
        final MimeMessage msg = readyMessageForSendMessage(sendTo, subject, contents, session);

        return send(msg);
    }

    private String getContentsForMail(MailType mailType, Map<String, String> map) {
        // 메일 내용 설정 : 템플릿 프로세스
        Context context = new Context();
        map.forEach((key, value)->{
            context.setVariable(key, value);
        });
        String html = templateEngine.process(mailType.toString(), context);

        return html;
    }
    
    private Properties getPropsForSendMessage() {
        // Create a Properties object to contain connection configuration information.
        Properties props = System.getProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.port", smtpProperties.getPort());

        //props.put("mail.smtp.ssl.enable", "true"); //the default value is false if not set
        props.put("mail.smtp.ssl.protocols", "TLSv1.2"); //the default value is false if not set

        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.auth.login.disable", "true");  //the default authorization order is "LOGIN PLAIN DIGEST-MD5 NTLM". 'LOGIN' must be disabled since Email Delivery authorizes as 'PLAIN'
        props.put("mail.smtp.starttls.enable", "true");   //TLSv1.2 is required
        props.put("mail.smtp.starttls.required", "true");  //Oracle Cloud Infrastructure required

        return props;
    }

    private MimeMessage readyMessageForSendMessage(String sendTo, String subject, String contents, Session session) throws Exception {
        // Create a message with the specified information.
        MimeMessage msg = new MimeMessage(session);
        msg.setFrom(
                new InternetAddress(mailProperties.getFrom(), mailProperties.getFromName())
        );
        msg.setRecipient(Message.RecipientType.TO, new InternetAddress(sendTo));
        msg.setSubject(subject);
        msg.setContent(contents,"text/html; charset=utf-8");

        return  msg;
    }

    private boolean send(MimeMessage msg) throws MessagingException {
        boolean result = false;
        // Create a transport.
        Transport transport = msg.getSession().getTransport();

        // Send the message.
        try {
            log.trace("Sending Email now...standby...");

            // Connect to OCI Email Delivery using the SMTP credentials specified.
            transport.connect(smtpProperties.getHost(), smtpProperties.getUserName(), smtpProperties.getPassword());

            // Send email.
            transport.sendMessage(msg, msg.getAllRecipients());
            log.trace("Email sent!");

            result = true;

        } catch (Exception ex) {
            log.warn("The email was not sent.");
            log.warn("Error message: " + ex.getMessage());

            result = false;

        } finally {
            transport.close();
            return result;
        }
    }
}