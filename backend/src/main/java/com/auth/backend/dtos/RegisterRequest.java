package com.auth.backend.dtos;

import com.auth.backend.models.enums.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "Email is required") @Email(message = "Email format is invalid") String email,

        @NotBlank(message = "Password is required") @Size(min = 6, message = "Password must be at least 6 characters long") String password,

        Role role) {

    public RegisterRequest {
        if (role == null) {
            role = Role.ROLE_USER;
        }
    }

    public RegisterRequest(String email, String password) {
        this(email, password, Role.ROLE_USER);
    }
}
