package com.ecommerce.sportscenter.service;

import com.ecommerce.sportscenter.entity.Basket;
import com.ecommerce.sportscenter.entity.BasketItem;
import com.ecommerce.sportscenter.exceptions.BasketNotFoundException;
import com.ecommerce.sportscenter.model.BasketItemDto;
import com.ecommerce.sportscenter.model.BasketDto;
import com.ecommerce.sportscenter.repository.BasketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BasketServiceImpl implements BasketService {

    private final BasketRepository basketRepository;

    @Override
    public List<BasketDto> getAllBaskets() {
        return ((List<Basket>) basketRepository.findAll()).stream()
                .map(this::convertToBasketDto)
                .toList();
    }

    @Override
    public BasketDto getBasketById(String basketId) {
        return basketRepository.findById(basketId)
                .map(this::convertToBasketDto)
                .orElseThrow(() -> new BasketNotFoundException(String.format("Basket with given id: %s does not exist", basketId)));
    }

    @Override
    public void deleteBasketById(String basketId) {
        basketRepository.deleteById(basketId);
    }

    @Override
    public BasketDto createBasket(BasketDto basketDto) {
        return convertToBasketDto(basketRepository.save(convertToBasket(basketDto)));
    }

    private BasketDto convertToBasketDto(Basket basket) {
        return BasketDto.builder()
                .id(basket.getId())
                .items(convertToBasketItemDtoList(basket.getItems()))
                .build();
    }

    private List<BasketItemDto> convertToBasketItemDtoList(List<BasketItem> basketItems) {
        return basketItems.stream()
                .map(this::convertToBasketItemDto)
                .toList();
    }

    private BasketItemDto convertToBasketItemDto(BasketItem basketItem) {
        return BasketItemDto.builder()
                .id(basketItem.getId())
                .name(basketItem.getName())
                .description(basketItem.getDescription())
                .pictureUrl(basketItem.getPictureUrl())
                .brand(basketItem.getBrand())
                .type(basketItem.getType())
                .price(basketItem.getPrice())
                .quantity(basketItem.getQuantity())
                .build();
    }

    private Basket convertToBasket(BasketDto basketDto) {
        return new Basket(basketDto.getId(), convertToBasketItemList(basketDto.getItems()));
    }

    private List<BasketItem> convertToBasketItemList(List<BasketItemDto> basketItemDtoList) {
        return basketItemDtoList.stream()
                .map(this::convertToBasketItem)
                .toList();
    }

    private BasketItem convertToBasketItem(BasketItemDto basketItemDto) {
        return new BasketItem(basketItemDto.getId(), basketItemDto.getName(),
                basketItemDto.getDescription(), basketItemDto.getPrice(), basketItemDto.getPictureUrl(),
                basketItemDto.getBrand(), basketItemDto.getType(), basketItemDto.getQuantity());
    }

}
