package com.ecommerce.sportscenter.entity;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;

@Data
@NoArgsConstructor
@AllArgsConstructor
@RedisHash("BasketItem")
public class BasketItem {

    @Id
    private Integer id;

    private String name;

    private String description;

    private Long price;

    private String pictureUrl;

    private String brand;

    private String type;

    private Integer quantity;

}
