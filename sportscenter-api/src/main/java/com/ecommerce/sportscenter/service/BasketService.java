package com.ecommerce.sportscenter.service;

import com.ecommerce.sportscenter.model.BasketDto;

import java.util.List;

public interface BasketService {

    List<BasketDto> getAllBaskets();

    BasketDto getBasketById(String basketId);

    void deleteBasketById(String basketId);

    BasketDto createBasket(BasketDto basketDto);

}
