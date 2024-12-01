package com.ecommerce.sportscenter.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BasketDto {

    private String id;

    private List<BasketItemDto> items = new ArrayList<>();

}
