package com.auth.backend.services;

import com.auth.backend.dtos.AuthResponse;
import com.auth.backend.dtos.LoginRequest;
import com.auth.backend.dtos.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    boolean userExists(String email);
}
