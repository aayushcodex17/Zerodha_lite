package com.zerodhalite.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AuthRequest(
        @Email @NotBlank String email,
        @NotBlank @Size(min = 8, max = 72) String password,
        @NotBlank @Size(max = 64) String deviceId) {
}
