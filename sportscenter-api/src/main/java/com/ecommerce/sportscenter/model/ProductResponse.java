package com.ecommerce.sportscenter.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {

    private Integer id;

    private String name;

    private String description;

    private Long price;

    private String pictureUrl;

    private String brand;

    private String type;

}
