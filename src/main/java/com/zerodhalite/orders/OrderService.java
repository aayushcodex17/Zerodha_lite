package com.zerodhalite.orders;

import com.zerodhalite.common.AppException;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {
    private static final Logger logger = LoggerFactory.getLogger(OrderService.class);

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Transactional
    public OrderResponse placeOrder(String userEmail, OrderRequest request) {
        validateRequest(request);

        Order order = new Order(
                userEmail,
                request.symbol().toUpperCase(),
                request.side(),
                request.type(),
                request.product(),
                request.validity(),
                OrderStatus.VALIDATED,
                request.quantity(),
                0,
                request.limitPrice(),
                null,
                Instant.now());

        Order prepared = simulateExecution(order);
        Order saved = orderRepository.save(prepared);
        logger.info("Order stored: {} {} {}", saved.getSide(), saved.getQuantity(), saved.getSymbol());
        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> listOrders(String userEmail) {
        return orderRepository.findAllByUserEmailOrderByCreatedAtDesc(userEmail).stream()
                .map(this::toResponse)
                .toList();
    }

    private void validateRequest(OrderRequest request) {
        if (request.type() == OrderType.LIMIT) {
            if (request.limitPrice() == null || request.limitPrice().compareTo(BigDecimal.ZERO) <= 0) {
                throw new AppException("LIMIT_PRICE_REQUIRED", "Limit price must be provided", HttpStatus.BAD_REQUEST);
            }
        }
        if (request.type() == OrderType.MARKET && request.limitPrice() != null) {
            throw new AppException("MARKET_PRICE_NOT_ALLOWED", "Market orders should not include limit price",
                    HttpStatus.BAD_REQUEST);
        }
    }

    private Order simulateExecution(Order order) {
        order.setStatus(OrderStatus.OPEN);
        if (order.getType() == OrderType.MARKET) {
            order.markFilled(BigDecimal.valueOf(100.0));
        }
        return order;
    }

    private OrderResponse toResponse(Order order) {
        return new OrderResponse(
                order.getId(),
                order.getUserEmail(),
                order.getSymbol(),
                order.getSide(),
                order.getType(),
                order.getProduct(),
                order.getValidity(),
                order.getStatus(),
                order.getQuantity(),
                order.getFilledQuantity(),
                order.getLimitPrice(),
                order.getAveragePrice(),
                order.getCreatedAt());
    }
}
