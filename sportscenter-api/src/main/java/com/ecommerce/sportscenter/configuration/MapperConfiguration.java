package com.ecommerce.sportscenter.configuration;

import com.ecommerce.sportscenter.mapper.OrderItemMapper;
import com.ecommerce.sportscenter.mapper.OrderMapper;
import com.ecommerce.sportscenter.mapper.ProductItemOrderedMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperConfiguration {

    @Bean
    public OrderMapper orderMapper() {
        return OrderMapper.INSTANCE;
    }

    @Bean
    public OrderItemMapper orderItemMapper() {
        return OrderItemMapper.INSTANCE;
    }

    @Bean
    public ProductItemOrderedMapper productItemOrderedMapper() {
        return ProductItemOrderedMapper.INSTANCE;
    }

    /*@Bean
    public OrderMapper orderMapperV2() {
        return Mappers.getMapper(OrderMapper.class);
    }*/

}
