package paquetes.portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import paquetes.portal.entity.Product;

@Repository
public interface IProduct extends JpaRepository<Product, Long> {

	
}
