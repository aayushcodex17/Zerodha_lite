package com.zerodhalite.auth;

import com.zerodhalite.common.AppException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
    private final SecretKey secretKey;
    private final long ttlSeconds;

    public JwtService(@Value("${security.jwt.secret}") String secret,
                      @Value("${security.jwt.ttl-seconds}") long ttlSeconds) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.ttlSeconds = ttlSeconds;
    }

    public TokenDetails issueToken(String subject, String role) {
        Instant now = Instant.now();
        Instant expiry = now.plusSeconds(ttlSeconds);
        String token = Jwts.builder()
                .setSubject(subject)
                .claim("role", role)
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(expiry))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
        return new TokenDetails(token, expiry);
    }

    public Claims parseToken(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception ex) {
            throw new AppException("INVALID_TOKEN", "Token is invalid or expired", HttpStatus.UNAUTHORIZED);
        }
    }

    public record TokenDetails(String token, Instant expiresAt) {
    }
}
