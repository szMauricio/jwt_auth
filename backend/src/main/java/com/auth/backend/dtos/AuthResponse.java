package com.auth.backend.dtos;

public record AuthResponse(
        String token, String type, String email, String role) {

    public AuthResponse(String token, String email, String role) {
        this(token, "Bearer", email, role);
    }

    public AuthResponse {
        if (type == null || type.isBlank()) {
            type = "Bearer";
        }
    }
}
