package com.zerodhalite.orders;

import java.math.BigDecimal;
import java.time.Instant;

public record OrderResponse(
        Long id,
        String userEmail,
        String symbol,
        OrderSide side,
        OrderType type,
        ProductType product,
        Validity validity,
        OrderStatus status,
        int quantity,
        int filledQuantity,
        BigDecimal limitPrice,
        BigDecimal averagePrice,
        Instant createdAt) {
}
