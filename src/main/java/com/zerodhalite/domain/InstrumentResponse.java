package com.zerodhalite.domain;

import java.math.BigDecimal;

public record InstrumentResponse(String symbol, String name, BigDecimal lastTradedPrice, BigDecimal changePercent) {
}
