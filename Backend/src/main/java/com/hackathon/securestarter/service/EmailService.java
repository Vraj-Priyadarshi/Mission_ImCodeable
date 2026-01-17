package com.hackathon.securestarter.service;

import com.hackathon.securestarter.util.Constants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.email.from:noreply@securestarter.com}")
    private String fromEmail;

    @Value("${app.frontend.url:http://localhost:3000}")
    private String frontendUrl;

    /**
     * Send verification email to new user (BLOCKING)
     */
    public void sendVerificationEmail(String toEmail, String token) {
        try {
            String verificationUrl = frontendUrl + "/verify?token=" + token;

            String subject = Constants.VERIFICATION_EMAIL_SUBJECT;
            String body = buildVerificationEmailBody(verificationUrl);

            sendEmail(toEmail, subject, body);
            log.info("Verification email sent to: {}", toEmail);
        } catch (Exception e) {
            log.error("Failed to send verification email to: {}", toEmail, e);
            // Don't throw exception - email failure shouldn't stop signup
        }
    }

    /**
     * Send password reset email (BLOCKING)
     */
    public void sendPasswordResetEmail(String toEmail, String token) {
        try {
            String resetUrl = frontendUrl + "/reset-password?token=" + token;

            String subject = Constants.PASSWORD_RESET_EMAIL_SUBJECT;
            String body = buildPasswordResetEmailBody(resetUrl);

            sendEmail(toEmail, subject, body);
            log.info("Password reset email sent to: {}", toEmail);
        } catch (Exception e) {
            log.error("Failed to send password reset email to: {}", toEmail, e);
        }
    }

    /**
     * Send welcome email after successful verification (BLOCKING)
     */
    public void sendWelcomeEmail(String toEmail, String firstName) {
        try {
            String subject = "Welcome to Secure Starter!";
            String body = buildWelcomeEmailBody(firstName);

            sendEmail(toEmail, subject, body);
            log.info("Welcome email sent to: {}", toEmail);
        } catch (Exception e) {
            log.error("Failed to send welcome email to: {}", toEmail, e);
        }
    }

    /**
     * Generic email sending method
     */
    private void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }

    /**
     * Build verification email body
     */
    private String buildVerificationEmailBody(String verificationUrl) {
        return """
                Hello,
                
                Thank you for registering with Secure Starter!
                
                Please verify your email address by clicking the link below:
                
                %s
                
                This link will expire in 24 hours.
                
                If you didn't create an account, please ignore this email.
                
                Best regards,
                Secure Starter Team
                """.formatted(verificationUrl);
    }

    /**
     * Build password reset email body
     */
    private String buildPasswordResetEmailBody(String resetUrl) {
        return """
                Hello,
                
                We received a request to reset your password for your Secure Starter account.
                
                Click the link below to reset your password:
                
                %s
                
                This link will expire in 1 hour.
                
                If you didn't request a password reset, please ignore this email and your password will remain unchanged.
                
                Best regards,
                Secure Starter Team
                """.formatted(resetUrl);
    }

    /**
     * Build welcome email body
     */
    private String buildWelcomeEmailBody(String firstName) {
        return """
                Hello %s,
                
                Welcome to Secure Starter! 🎉
                
                Your email has been successfully verified and your account is now active.
                
                You can now log in and start using our platform.
                
                If you have any questions, feel free to reach out to our support team.
                
                Best regards,
                Secure Starter Team
                """.formatted(firstName != null ? firstName : "");
    }
}