package com.ecommerce.sportscenter.controller;

import com.ecommerce.sportscenter.model.OrderDto;
import com.ecommerce.sportscenter.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    @GetMapping("{orderId}")
    public ResponseEntity<?> getOrderById(@PathVariable Integer orderId) {
        return new ResponseEntity<>(orderService.getOrderById(orderId), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getAllOrders() {
        return new ResponseEntity<>(orderService.getAllOrders(), HttpStatus.OK);
    }

    @GetMapping("/paged")
    public ResponseEntity<?> getAllOrdersPaged(Pageable pageable) {
        return new ResponseEntity<>(orderService.getAllOrders(pageable), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@Valid @RequestBody OrderDto orderDto) {
        Integer newOrderId = orderService.createOrder(orderDto);
        if (newOrderId != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(newOrderId);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Integer orderId){
        orderService.deleteOrder(orderId);
        return ResponseEntity.noContent().build();
    }

}
