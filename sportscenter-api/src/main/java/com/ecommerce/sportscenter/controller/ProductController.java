package com.ecommerce.sportscenter.controller;

import com.ecommerce.sportscenter.service.BrandService;
import com.ecommerce.sportscenter.service.ProductService;
import com.ecommerce.sportscenter.service.TypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    private final BrandService brandService;

    private final TypeService typeService;

    @GetMapping("{id}")
    public ResponseEntity<?> getProductById(@PathVariable("id") Integer productId) {
        return new ResponseEntity<>(productService.getProductById(productId), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getProducts(@RequestParam(name = "page", defaultValue = "0") int page,
                                         @RequestParam(name = "size", defaultValue = "10") int size,
                                         @RequestParam(name = "brandId", required = false) Integer brandId,
                                         @RequestParam(name = "typeId", required = false) Integer typeId,
                                         @RequestParam(name = "keyword", required = false) String keyword,
                                         @RequestParam(name = "sort", defaultValue = "name") String sort,
                                         @RequestParam(name = "order", defaultValue = "asc") String order) {
        return new ResponseEntity<>(
                productService.getProducts(
                        createPageableCriteria(page, size, sort, order),
                        brandId,
                        typeId,
                        keyword
                ), HttpStatus.OK);
    }

    @GetMapping("brands")
    public ResponseEntity<?> getAllBrands() {
        return new ResponseEntity<>(brandService.getAllBrands(), HttpStatus.OK);
    }

    @GetMapping("types")
    public ResponseEntity<?> getAllTypes() {
        return new ResponseEntity<>(typeService.getAllTypes(), HttpStatus.OK);
    }

    private Pageable createPageableCriteria(int page, int size, String sort, String order) {
        Sort.Direction direction = order.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sorting = Sort.by(direction, sort);
        return PageRequest.of(page, size, sorting);
    }

}
