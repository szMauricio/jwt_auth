package com.auth.backend.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.auth.backend.dtos.AuthResponse;
import com.auth.backend.dtos.LoginRequest;
import com.auth.backend.dtos.RegisterRequest;
import com.auth.backend.exceptions.EmailAlreadyExistsException;
import com.auth.backend.exceptions.InvalidCredentialsException;
import com.auth.backend.models.User;
import com.auth.backend.repositories.UserRepository;
import com.auth.backend.utils.JwtUtil;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;

    public AuthServiceImpl(UserRepository repository, PasswordEncoder passwordEncoder,
            AuthenticationManager authManager, JwtUtil jwtUtil) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public AuthResponse register(RegisterRequest request) {
        if (repository.existsByEmail(request.email())) {
            throw new EmailAlreadyExistsException("Email is already registered: " + request.email());
        }

        User user = new User();
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(request.role());
        user.setEnabled(true);

        User savedUser = repository.save(user);

        // Generate token
        UserDetailsImpl userDetails = new UserDetailsImpl(savedUser);
        String jwt = jwtUtil.generateToken(userDetails);

        return new AuthResponse(jwt, savedUser.getEmail(), savedUser.getRole().name());
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        try {
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.email(), request.password()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            String jwt = jwtUtil.generateToken(userDetails);

            String role = userDetails.getAuthorities().iterator().next().getAuthority();

            return new AuthResponse(jwt, userDetails.getUsername(), role);

        } catch (BadCredentialsException e) {
            throw new InvalidCredentialsException("Invalid email or password");

        } catch (Exception e) {
            throw new InvalidCredentialsException("Authentication failed: " + e.getMessage());
        }
    }

    @Override
    public boolean userExists(String email) {
        return repository.existsByEmail(email);
    }
}
