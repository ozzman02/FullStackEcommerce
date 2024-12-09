package com.ecommerce.sportscenter.service;

import com.ecommerce.sportscenter.entity.order.aggregate.Order;
import com.ecommerce.sportscenter.entity.order.aggregate.OrderItem;
import com.ecommerce.sportscenter.exceptions.OrderNotFoundException;
import com.ecommerce.sportscenter.mapper.OrderItemMapper;
import com.ecommerce.sportscenter.mapper.OrderMapper;
import com.ecommerce.sportscenter.model.BasketDto;
import com.ecommerce.sportscenter.model.OrderDto;
import com.ecommerce.sportscenter.model.OrderResponse;
import com.ecommerce.sportscenter.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    private final BasketService basketService;

    private final OrderMapper orderMapper;

    private final OrderItemMapper orderItemMapper;

    @Override
    public OrderResponse getOrderById(Integer orderId) {
        return orderRepository.findById(orderId)
                .map(orderMapper::orderToOrderResponse)
                .orElseThrow(() -> new OrderNotFoundException(String.format("Order with given id: %s does not exist", orderId)));
    }

    @Override
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(orderMapper::orderToOrderResponse)
                .collect(Collectors.toList());
    }

    @Override
    public Page<OrderResponse> getAllOrders(Pageable pageable) {
        return orderRepository.findAll(pageable)
                .map(orderMapper::orderToOrderResponse);
    }

    @Override
    public Integer createOrder(OrderDto orderDto) {

        /* Fetch Basket Details */
        BasketDto basketDto = basketService.getBasketById(orderDto.getBasketId());

        if (basketDto == null) {
            log.error("Basket with ID {} not found", orderDto.getBasketId());
            return null;
        }

        /* Map basket items to order items */
        List<OrderItem> orderItems = basketDto.getItems().stream()
                .map(orderItemMapper::basketItemDtoToOrderItem)
                .toList();

        /* Calculate subtotal */
        double subTotal = basketDto.getItems().stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();

        Order order = orderMapper.orderResponseToOrder(orderDto);
        order.setOrderItems(orderItems);
        order.setSubTotal(subTotal);

        Order savedOrder = orderRepository.save(order);
        basketService.deleteBasketById(orderDto.getBasketId());

        return savedOrder.getId();
    }

    @Override
    public void deleteOrder(Integer orderId) {
        orderRepository.deleteById(orderId);
    }

}
