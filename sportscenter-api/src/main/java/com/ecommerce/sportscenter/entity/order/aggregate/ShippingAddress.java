package com.ecommerce.sportscenter.entity.order.aggregate;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Embeddable
public class ShippingAddress {

    private String name;

    private String address1;

    private String address2;

    private String city;

    private String state;

    private String zipcode;

    private String country;

}
