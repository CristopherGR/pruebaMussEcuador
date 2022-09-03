package paquetes.portal.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="product")
public class Product {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long productId;
	
	@Column
	private String productName;
	
	@Column
	private String productCategory;
	
	@Column
	private String productProvince;
	
	@Column
	private String productCity;
	
	@Column
	private double productPrice;
	
	@Column
	private boolean haveIva;
	
	@Column
	private double totalPrice;
	
	@Column
	private boolean productDiscount;
	
	@Column
	private int discountRare;
	
	@Column
	private int productStock;
	
	@Column
	private String productState;

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getProductCategory() {
		return productCategory;
	}

	public void setProductCategory(String productCategory) {
		this.productCategory = productCategory;
	}

	public String getProductProvince() {
		return productProvince;
	}

	public void setProductProvince(String productProvince) {
		this.productProvince = productProvince;
	}

	public String getProductCity() {
		return productCity;
	}

	public void setProductCity(String productCity) {
		this.productCity = productCity;
	}

	public double getProductPrice() {
		return productPrice;
	}

	public void setProductPrice(double productPrice) {
		this.productPrice = productPrice;
	}

	public boolean isHaveIva() {
		return haveIva;
	}

	public void setHaveIva(boolean haveIva) {
		this.haveIva = haveIva;
	}

	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public boolean isProductDiscount() {
		return productDiscount;
	}

	public void setProductDiscount(boolean productDiscount) {
		this.productDiscount = productDiscount;
	}

	public int getDiscountRare() {
		return discountRare;
	}

	public void setDiscountRare(int discountRare) {
		this.discountRare = discountRare;
	}

	public int getProductStock() {
		return productStock;
	}

	public void setProductStock(int productStock) {
		this.productStock = productStock;
	}

	public String getProductState() {
		return productState;
	}

	public void setProductState(String productState) {
		this.productState = productState;
	}
	
}
