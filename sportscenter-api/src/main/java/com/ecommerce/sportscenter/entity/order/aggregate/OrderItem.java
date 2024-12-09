package com.ecommerce.sportscenter.entity.order.aggregate;

import jakarta.persistence.*;
import lombok.*;

import java.util.Objects;

@Entity
@Table(name = "OrderItem")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;

    @Embedded
    private ProductItemOrdered itemOrdered;

    @Column(name = "Price")
    private Long price;

    @Column(name = "Quantity")
    private Integer quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        OrderItem orderItem = (OrderItem) o;

        return Objects.equals(id, orderItem.id) &&
                Objects.equals(itemOrdered, orderItem.itemOrdered) &&
                Objects.equals(price, orderItem.price) &&
                Objects.equals(quantity, orderItem.quantity) &&
                Objects.equals(order, orderItem.order);
    }

    @Override
    public int hashCode() {
        int result = Objects.hashCode(id);
        result = 31 * result + Objects.hashCode(itemOrdered);
        result = 31 * result + Objects.hashCode(price);
        result = 31 * result + Objects.hashCode(quantity);
        result = 31 * result + Objects.hashCode(order);
        return result;
    }
}
