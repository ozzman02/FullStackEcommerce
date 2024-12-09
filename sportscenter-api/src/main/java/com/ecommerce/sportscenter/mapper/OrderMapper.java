package com.ecommerce.sportscenter.mapper;

import com.ecommerce.sportscenter.entity.order.aggregate.Order;
import com.ecommerce.sportscenter.model.OrderDto;
import com.ecommerce.sportscenter.model.OrderResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface OrderMapper {

    OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "basketId", target = "basketId")
    @Mapping(source = "shippingAddress", target = "shippingAddress")
    @Mapping(source = "subTotal", target = "subTotal")
    @Mapping(source = "deliveryFee", target = "deliveryFee")
    @Mapping(target = "total", expression = "java(order.getSubTotal() + order.getDeliveryFee())")
    @Mapping(target = "orderDate", expression = "java(java.time.LocalDateTime.now())")
    @Mapping(target = "orderStatus", constant = "PENDING")
    OrderResponse orderToOrderResponse(Order order);

    @Mapping(target = "orderDate", expression = "java(orderDto.getOrderDate())")
    @Mapping(target = "orderStatus", constant = "PENDING")
    Order orderResponseToOrder(OrderDto orderDto);

    List<OrderDto> ordersToOrderResponses(List<Order> orders);

    /*
        In some cases you need mappings which don’t create a new instance of the target
        type but instead update an existing instance of that type.
    */
    void updateOrderFromOrderResponse(OrderDto orderDto, @MappingTarget Order order);
}
