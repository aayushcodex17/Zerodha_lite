package com.zerodhalite.orders;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userEmail;

    @Column(nullable = false)
    private String symbol;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderSide side;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProductType product;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Validity validity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private int filledQuantity;

    private BigDecimal limitPrice;

    private BigDecimal averagePrice;

    @Column(nullable = false)
    private Instant createdAt;

    protected Order() {
    }

    public Order(String userEmail,
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
        this.userEmail = userEmail;
        this.symbol = symbol;
        this.side = side;
        this.type = type;
        this.product = product;
        this.validity = validity;
        this.status = status;
        this.quantity = quantity;
        this.filledQuantity = filledQuantity;
        this.limitPrice = limitPrice;
        this.averagePrice = averagePrice;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public String getSymbol() {
        return symbol;
    }

    public OrderSide getSide() {
        return side;
    }

    public OrderType getType() {
        return type;
    }

    public ProductType getProduct() {
        return product;
    }

    public Validity getValidity() {
        return validity;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public int getQuantity() {
        return quantity;
    }

    public int getFilledQuantity() {
        return filledQuantity;
    }

    public BigDecimal getLimitPrice() {
        return limitPrice;
    }

    public BigDecimal getAveragePrice() {
        return averagePrice;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public void markFilled(BigDecimal executionPrice) {
        this.status = OrderStatus.FILLED;
        this.filledQuantity = this.quantity;
        this.averagePrice = executionPrice;
    }
}
