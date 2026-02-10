package com.zerodhalite.auth;

import com.zerodhalite.common.AppException;
import com.zerodhalite.users.Role;
import com.zerodhalite.users.User;
import com.zerodhalite.users.UserRepository;
import java.time.Instant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Transactional
    public AuthResponse register(RegistrationRequest request) {
        String normalizedEmail = request.email().toLowerCase();
        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new AppException("EMAIL_IN_USE", "Email already registered", HttpStatus.CONFLICT);
        }
        User user = new User(
                normalizedEmail,
                request.fullName().trim(),
                passwordEncoder.encode(request.password()),
                Role.TRADER,
                Instant.now(),
                Instant.now());
        userRepository.save(user);
        logger.info("Registered new user: {}", user.getEmail());
        return issueToken(user);
    }

    public AuthResponse login(AuthRequest request) {
        String normalizedEmail = request.email().toLowerCase();
        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new AppException("INVALID_CREDENTIALS", "Invalid credentials", HttpStatus.UNAUTHORIZED));
        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new AppException("INVALID_CREDENTIALS", "Invalid credentials", HttpStatus.UNAUTHORIZED);
        }
        logger.info("User logged in: {} from device {}", user.getEmail(), request.deviceId());
        return issueToken(user);
    }

    private AuthResponse issueToken(User user) {
        JwtService.TokenDetails tokenDetails = jwtService.issueToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(tokenDetails.token(), "Bearer", user.getRole().name(), tokenDetails.expiresAt());
    }
}
