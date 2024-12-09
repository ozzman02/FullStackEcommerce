package com.ecommerce.sportscenter.entity.order.aggregate;

import jakarta.persistence.Embeddable;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Embeddable
public class ProductItemOrdered {

    private Integer productId;

    private String name;

    private String pictureUrl;

}
