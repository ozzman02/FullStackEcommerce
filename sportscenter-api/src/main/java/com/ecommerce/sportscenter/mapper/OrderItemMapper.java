package com.ecommerce.sportscenter.mapper;

import com.ecommerce.sportscenter.entity.order.aggregate.OrderItem;
import com.ecommerce.sportscenter.model.BasketItemDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;


@Mapper(uses = ProductItemOrderedMapper.class)
public interface OrderItemMapper {

    OrderItemMapper INSTANCE = Mappers.getMapper(OrderItemMapper.class);

    OrderItem basketItemDtoToOrderItem(BasketItemDto basketItemDto);

}
