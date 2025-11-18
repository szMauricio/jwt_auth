package com.auth.backend.services;

public interface EmailService {
    void sendResetPasswordEmail(String toEmail, String resetToken);
}
