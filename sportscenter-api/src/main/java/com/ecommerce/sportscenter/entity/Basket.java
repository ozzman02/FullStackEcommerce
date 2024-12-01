package com.ecommerce.sportscenter.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@RedisHash("Basket")
public class Basket {

    private String id;

    private List<BasketItem> items = new ArrayList<>();

    public Basket(String id) { this.id = id; }

}
