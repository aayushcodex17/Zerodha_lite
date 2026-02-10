package com.zerodhalite.orders;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public record OrderRequest(
        @NotBlank String symbol,
        @NotNull OrderSide side,
        @NotNull OrderType type,
        @NotNull ProductType product,
        @NotNull Validity validity,
        @Min(1) int quantity,
        BigDecimal limitPrice,
        @Size(max = 64) String clientOrderId) {
}
