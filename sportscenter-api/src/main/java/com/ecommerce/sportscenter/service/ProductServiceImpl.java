package com.ecommerce.sportscenter.service;

import com.ecommerce.sportscenter.entity.Product;
import com.ecommerce.sportscenter.exceptions.ProductNotFoundException;
import com.ecommerce.sportscenter.model.ProductResponse;
import com.ecommerce.sportscenter.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    @Transactional(readOnly = true)
    public ProductResponse getProductById(Integer productId) {
        return productRepository.findById(productId)
                .map(this::convertToProductResponse)
                .orElseThrow(() -> new ProductNotFoundException(String.format("Product with given id: %s does not exist", productId)));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProductResponse> getProducts(Pageable pageable, Integer brandId, Integer typeId, String keyword) {
        Specification<Product> specification = Specification.where(null);
        if (brandId != null) {
            specification = specification.and(((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("brand").get("id"), brandId)));
        }
        if (typeId != null) {
            specification = specification.and(((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("type").get("id"), typeId)));
        }
        if (keyword != null && !keyword.isEmpty()) {
            specification = specification.and(((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(root.get("name"), "%" + keyword + "%")));
        }
        return productRepository.findAll(specification, pageable)
                .map(this::convertToProductResponse);
    }

    private ProductResponse convertToProductResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .pictureUrl(product.getPictureUrl())
                .brand(product.getBrand().getName())
                .type(product.getType().getName())
                .build();
    }

}
