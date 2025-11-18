package com.auth.backend.services;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender mailSender;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendResetPasswordEmail(String toEmail, String resetToken) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Password Reset Request");
        message.setText(
                "You have requested to reset your password.\n\n" +
                        "Please click the following link to reset your password:\n" +
                        "http://localhost:4200/reset-password?token=" + resetToken + "\n\n" +
                        "This link will expire in 24 hours.\n\n" +
                        "If you didn't request this, please ignore this email.");

        mailSender.send(message);
    }
}
