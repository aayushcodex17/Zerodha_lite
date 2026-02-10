package com.zerodhalite.auth;

import java.time.Instant;

public record AuthResponse(String accessToken, String tokenType, String role, Instant expiresAt) {
}
