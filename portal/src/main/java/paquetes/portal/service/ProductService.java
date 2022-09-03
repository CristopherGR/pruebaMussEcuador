package paquetes.portal.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import paquetes.portal.entity.Product;
import paquetes.portal.repository.IProduct;

@Service
public class ProductService {

	@Autowired
	IProduct repository;
	
	public List<Product> getAll(){
		List<Product> productList = repository.findAll();
		
		if(productList.size() > 0)
			return productList;
		else
			return null;
	}
	
	public Product finById(Long id) {
		Optional<Product> product = repository.findById(id);
		
		if(product.isPresent())
			return product.get();
		else
			return null;
	}
	
	public Product createProduct(Product product) {
		return repository.save(product);
	}
	
	public Product updateProduct(Product newProduct) {
		Optional<Product> product = repository.findById(newProduct.getProductId());

		if(product.isPresent())
			return repository.save(newProduct);
		else
			return null;
	}
	
	public void deleteProduct(Long id) {
		Optional<Product> product = repository.findById(id);

		if(product.isPresent())
			repository.deleteById(id);
	}
	
}
