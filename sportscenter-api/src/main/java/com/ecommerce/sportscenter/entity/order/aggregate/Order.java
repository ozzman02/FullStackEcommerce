package com.ecommerce.sportscenter.entity.order.aggregate;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "Orders")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;

    @Column(name = "Basket_Id")
    private String basketId;

    @Embedded
    private ShippingAddress shippingAddress;

    @Column(name = "Order_Date")
    private LocalDateTime orderDate = LocalDateTime.now();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "order")
    private List<OrderItem> orderItems;

    @Column(name = "Sub_Total")
    private Double subTotal;

    @Column(name = "Delivery_Fee")
    private Long deliveryFee;

    @Enumerated(EnumType.STRING)
    @Column(name = "Order_Status")
    private OrderStatus orderStatus = OrderStatus.PENDING;

    public Double getTotal() {
        return getSubTotal() + getDeliveryFee();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Order order = (Order) o;

        return Objects.equals(id, order.id) &&
                Objects.equals(basketId, order.basketId) &&
                Objects.equals(shippingAddress, order.shippingAddress) &&
                Objects.equals(orderDate, order.orderDate) && Objects.equals(orderItems, order.orderItems) &&
                Objects.equals(subTotal, order.subTotal) &&
                Objects.equals(deliveryFee, order.deliveryFee) &&
                orderStatus == order.orderStatus;
    }

    @Override
    public int hashCode() {
        int result = Objects.hashCode(id);
        result = 31 * result + Objects.hashCode(basketId);
        result = 31 * result + Objects.hashCode(shippingAddress);
        result = 31 * result + Objects.hashCode(orderDate);
        result = 31 * result + Objects.hashCode(orderItems);
        result = 31 * result + Objects.hashCode(subTotal);
        result = 31 * result + Objects.hashCode(deliveryFee);
        result = 31 * result + Objects.hashCode(orderStatus);
        return result;
    }
}
