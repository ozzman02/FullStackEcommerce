package com.ecommerce.sportscenter.controller;

import com.ecommerce.sportscenter.model.BasketDto;
import com.ecommerce.sportscenter.service.BasketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/baskets")
public class BasketController {

    private final BasketService basketService;

    @GetMapping
    public ResponseEntity<?> getAllBaskets() {
        return new ResponseEntity<>(basketService.getAllBaskets(), HttpStatus.OK);
    }

    @GetMapping("{basketId}")
    public ResponseEntity<?> getBasketById(@PathVariable String basketId) {
        return new ResponseEntity<>(basketService.getBasketById(basketId), HttpStatus.OK);
    }

    @DeleteMapping("{basketId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBasketById(@PathVariable String basketId) {
        basketService.deleteBasketById(basketId);
    }

    @PostMapping
    public ResponseEntity<?> createBasket(@RequestBody BasketDto basketDto) {
        return new ResponseEntity<>(basketService.createBasket(basketDto), HttpStatus.OK);
    }

}
