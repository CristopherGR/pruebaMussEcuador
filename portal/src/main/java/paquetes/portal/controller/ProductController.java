package paquetes.portal.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import paquetes.portal.entity.Product;
import paquetes.portal.service.ProductService;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/product")
public class ProductController {

	@Autowired
	ProductService service;
	
	@GetMapping("/all")
	public ResponseEntity<List<Product>> getAll(){
		List<Product> products = service.getAll();
		return new ResponseEntity<List<Product>>(products, new HttpHeaders(), HttpStatus.OK);

	}
	
	@GetMapping("productById/{id}")
	public ResponseEntity<Product> finById(@PathVariable("id") Long id){
		Product product = service.finById(id);
		return new ResponseEntity<Product>(product, new HttpHeaders(), HttpStatus.OK);
	}
	
	@PostMapping("/newProduct")
	public ResponseEntity<Product> newProduct(@RequestBody Product newProduct){
		service.createProduct(newProduct);
		return new ResponseEntity<Product>(newProduct, new HttpHeaders(), HttpStatus.OK);
	}
	
	@PutMapping("/updateProduct")
	public ResponseEntity<Product> updateProduct(@RequestBody Product newProduct){
		service.updateProduct(newProduct);
		return new ResponseEntity<Product>(newProduct, new HttpHeaders(), HttpStatus.OK);
	}
	
	@DeleteMapping("/deleteProduct/{id}")
	@Transactional
	public HttpStatus deleteProduct(@PathVariable("id")Long id) {
		service.deleteProduct(id);
		return HttpStatus.OK;
	}
}
