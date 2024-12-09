package com.ecommerce.sportscenter.mapper;

import com.ecommerce.sportscenter.entity.order.aggregate.ProductItemOrdered;
import com.ecommerce.sportscenter.model.BasketItemDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ProductItemOrderedMapper {

    ProductItemOrderedMapper INSTANCE = Mappers.getMapper(ProductItemOrderedMapper.class);

    @Mapping(source = "id", target = "productId")
    @Mapping(source = "name", target = "name")
    @Mapping(source = "pictureUrl", target = "pictureUrl")
    ProductItemOrdered basketItemDtoToProductItemOrdered(BasketItemDto basketItemDto);

}
