import './App.css';
import React, { useEffect, useState } from "react";
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%'
  }
}))

//////////////////////////////////////////////////////////

function App() {

  const styles = useStyles()
  const [newModal, setNewModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [products, setProducts] = useState([])
  const [newProduct, setNewProduct] = useState({
    productId: '',
    productName: '',
    productCategory: '',
    productProvince: '',
    productCity: '',
    productPrice: '',
    haveIva: '',
    totalPrice: '',
    productDiscount: '',
    discountRare: '',
    productStock: '',
    productState: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const selectCaseEditDelete = (product, caseSelected) => {
    setNewProduct(product);
    (caseSelected === 'Editar') ? openCloseEditModal() : openCloseDeleteModal()
  }

  const openCloseNewModal = () => {
    setNewModal(!newModal);
  }

  const openCloseEditModal = () => {
    setEditModal(!editModal);
  }

  const openCloseDeleteModal = () => {
    setDeleteModal(!deleteModal);
  }

  const getRequest = async () => {
    await axios.get('http://localhost:9000/product/all')
      .then(response => {
        setProducts(response.data)
      })
  }

  const postRequest = async () => {
    await axios.post('http://localhost:9000/product/newProduct', newProduct)
      .then(response => {
        setProducts(products.concat(response.data))
        openCloseNewModal();
      })
  }

  const putRequest = async () => {
    await axios.put('http://localhost:9000/product/updateProduct', newProduct)
      .then(response => {
        var newData = products;
        newData.map(product => {
          if (newProduct.productId === product.productId) {
            product.nombre = newProduct.nombre;
            product.productName = newProduct.productName;
            product.productCategory = newProduct.productCategory;
            product.productProvince = newProduct.productProvince;
            product.productCity = newProduct.productCity;
            product.productPrice = newProduct.productPrice;
            product.haveIva = newProduct.haveIva;
            product.totalPrice = newProduct.totalPrice;
            product.productDiscount = newProduct.productDiscount;
            product.discountRare = newProduct.discountRare;
            product.productStock = newProduct.productStock;
            product.productState = newProduct.productState;
          }
        })
        setNewProduct(newData);
        openCloseEditModal();
      })
  }

  const deleteRequest = async () => {
    await axios.delete(`http://localhost:9000/product/deleteProduct/${newProduct.productId}`)
      .then(response => {
        setNewProduct(products.filter(product => product.id !== newProduct.id));
        openCloseDeleteModal();
        window.location.reload()
      })
  }

  useEffect(() => {
    getRequest()
  }, [])

  const newProductBody = (
    <div className={styles.modal}>

      <h3>Nuevo Producto</h3>
      <TextField name="productId" onChange={handleChange} type='hidden'></TextField>
      <TextField className={styles.inputMaterial} label="Nombre" name="productName" onChange={handleChange}></TextField>
      <TextField className={styles.inputMaterial} label="Categoria" name="productCategory" onChange={handleChange}></TextField>
      <br /><br />
      Provincia:
      <select className={styles.inputMaterial} name="productProvince" onChange={handleChange}>
        <option value="Azuay" >Azuay</option>
        <option value="Bolívar" >Bolívar</option>
        <option value="Cañar" >Cañar</option>
        <option value="Carchi" >Carchi</option>
        <option value="Chimborazo" >Chimborazo</option>
        <option value="Cotopaxi" >Cotopaxi</option>
        <option value="El Oro" >El Oro</option>
        <option value="Esmeraldas" >Esmeraldas</option>
        <option value="Galápagos" >Galápagos</option>
        <option value="Guayas" >Guayas</option>
        <option value="Imbabura" >Imbabura</option>
        <option value="Loja" >Loja</option>
        <option value="Los Ríos" >Los Ríos</option>
        <option value="Manabí" >Manabí</option>
        <option value="Morona-Santiago" >Morona-Santiago</option>
        <option value="Napo" >Napo</option>
        <option value="Orellana" >Orellana</option>
        <option value="Pastaza" >Pastaza</option>
        <option value="Pichincha" >Pichincha</option>
        <option value="Santa Elena" >Santa Elena</option>
        <option value="Santo Domingo de los Tsáchilas" >Santo Domingo de los Tsáchilas</option>
        <option value="Sucumbíos" >Sucumbíos</option>
        <option value="Tungurahua" >Tungurahua</option>
        <option value="Zamora-Chinchipe">Zamora-Chinchipe</option>
      </select>
      <TextField className={styles.inputMaterial} label="Ciudad" name="productCity" onChange={handleChange}></TextField>
      <TextField className={styles.inputMaterial} label="Precio" name="productPrice" onChange={handleChange}></TextField>
      <br /><br />
      IVA:
      <select className={styles.inputMaterial} name="haveIva" onChange={handleChange}>
        <option value={true} >Si</option>
        <option value={false} >No</option>
      </select>
      <TextField className={styles.inputMaterial} label="Precio Total" name="totalPrice" onChange={handleChange}></TextField>
      <br /><br />
      Descuento:
      <select className={styles.inputMaterial} name="productDiscount" onChange={handleChange}>
        <option value={true} >Si</option>
        <option value={false} >No</option>
      </select>
      <TextField className={styles.inputMaterial} label="Porcentaje Descuento" name="discountRare" onChange={handleChange}></TextField>
      <TextField className={styles.inputMaterial} label="Cantidad Inicial" name="productStock" onChange={handleChange}></TextField>
      <br /><br />
      Estado:
      <select className={styles.inputMaterial} name="productState" onChange={handleChange}>
        <option value='Disponible' >Disponible</option>
        <option value='No Disponible' >No Disponible</option>
      </select>

      <div align="right">
        <br />
        <Button color='primary' onClick={() => postRequest()}>Crear</Button>
        <Button color='secondary' onClick={() => openCloseNewModal()}>Cancelar</Button>
      </div>
    </div>
  );

  const editProductBody = (
    <div className={styles.modal}>
      <h3>Nuevo Producto</h3>
      <TextField name="productId" onChange={handleChange} type='hidden' value={newProduct && newProduct.productId}></TextField>
      <TextField className={styles.inputMaterial} label="Nombre" name="productName" onChange={handleChange} value={newProduct && newProduct.productName} disabled></TextField>
      <TextField className={styles.inputMaterial} label="Categoria" name="productCategory" onChange={handleChange} value={newProduct && newProduct.productCategory}></TextField>
      <br /><br />
      Provincia:
      <select className={styles.inputMaterial} name="productProvince" onChange={handleChange} value={newProduct && newProduct.productProvince} >
        <option value="Azuay" >Azuay</option>
        <option value="Bolívar" >Bolívar</option>
        <option value="Cañar" >Cañar</option>
        <option value="Carchi" >Carchi</option>
        <option value="Chimborazo" >Chimborazo</option>
        <option value="Cotopaxi" >Cotopaxi</option>
        <option value="El Oro" >El Oro</option>
        <option value="Esmeraldas" >Esmeraldas</option>
        <option value="Galápagos" >Galápagos</option>
        <option value="Guayas" >Guayas</option>
        <option value="Imbabura" >Imbabura</option>
        <option value="Loja" >Loja</option>
        <option value="Los Ríos" >Los Ríos</option>
        <option value="Manabí" >Manabí</option>
        <option value="Morona-Santiago" >Morona-Santiago</option>
        <option value="Napo" >Napo</option>
        <option value="Orellana" >Orellana</option>
        <option value="Pastaza" >Pastaza</option>
        <option value="Pichincha" >Pichincha</option>
        <option value="Santa Elena" >Santa Elena</option>
        <option value="Santo Domingo de los Tsáchilas" >Santo Domingo de los Tsáchilas</option>
        <option value="Sucumbíos" >Sucumbíos</option>
        <option value="Tungurahua" >Tungurahua</option>
        <option value="Zamora-Chinchipe">Zamora-Chinchipe</option>
      </select>
      <TextField className={styles.inputMaterial} label="Ciudad" name="productCity" onChange={handleChange} value={newProduct && newProduct.productCity} ></TextField>
      <TextField className={styles.inputMaterial} label="Precio" name="productPrice" onChange={handleChange} value={newProduct && newProduct.productPrice}></TextField>
      <br /><br />
      IVA:
      <select className={styles.inputMaterial} name="haveIva" onChange={handleChange} value={newProduct && newProduct.haveIva}>
        <option value={true} >Si</option>
        <option value={false} >No</option>
      </select>
      <TextField className={styles.inputMaterial} label="Precio Total" name="totalPrice" onChange={handleChange} value={newProduct && newProduct.totalPrice}></TextField>
      <br /><br />
      Descuento:
      <select className={styles.inputMaterial} name="productDiscount" onChange={handleChange} value={newProduct && newProduct.productDiscount}>
        <option value={true} >Si</option>
        <option value={false} >No</option>
      </select>
      <TextField className={styles.inputMaterial} label="Porcentaje Descuento" name="discountRare" onChange={handleChange} value={newProduct && newProduct.discountRare}></TextField>
      <TextField className={styles.inputMaterial} label="Cantidad Inicial" name="productStock" onChange={handleChange} value={newProduct && newProduct.productStock}></TextField>
      <br /><br />
      Estado:
      <select className={styles.inputMaterial} name="productState" onChange={handleChange} value={newProduct && newProduct.productState}>
        <option value='Disponible' >Disponible</option>
        <option value='No Disponible' >No Disponible</option>
      </select>

      <div align="right">
        <br />
        <Button color='primary' onClick={() => putRequest()}>Editar</Button>
        <Button color='secondary' onClick={() => openCloseEditModal()}>Cancelar</Button>
      </div>
    </div>
  );

  const deleteProductBody = (
    <div className={styles.modal}>
      <h3>¿Seguro desea eliminar el prodcuto:   {newProduct && newProduct.productName}?</h3>

      <div align="right">
        <br />
        <Button color='primary' onClick={() => deleteRequest()}>SI</Button>
        <Button color='secondary' onClick={() => openCloseDeleteModal()}>Cancelar</Button>
      </div>
    </div>
  );

  return (
    <div className="App">

      <h3>PRODUCTOS</h3>
      <br /><br />
      <Button color="primary" onClick={() => openCloseNewModal()}>Nuevo Producto</Button>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>PRODUCTO</b></TableCell>
              <TableCell><b>CATEGORIA</b></TableCell>
              <TableCell><b>PROVINCIA</b></TableCell>
              <TableCell><b>CIUDAD</b></TableCell>
              <TableCell><b>PRECIO</b></TableCell>
              <TableCell><b>IVA</b></TableCell>
              <TableCell><b>PRECIO TOTAL</b></TableCell>
              <TableCell><b>DESCUENTO</b></TableCell>
              <TableCell><b>% DE DESCUENTO</b></TableCell>
              <TableCell><b>CANTIDAD</b></TableCell>
              <TableCell><b>ESTADO</b></TableCell>
              <TableCell><b>ACCIONES</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map(product => (
              <TableRow key={product.productId}>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.productCategory}</TableCell>
                <TableCell>{product.productProvince}</TableCell>
                <TableCell>{product.productCity}</TableCell>
                <TableCell>$ {product.productPrice}</TableCell>
                <TableCell>{product.haveIva ? ("Si") : ("No")}</TableCell>
                <TableCell>$ {product.totalPrice}</TableCell>
                <TableCell>{product.productDiscount ? ("Si") : ("No")}</TableCell>
                <TableCell>% {product.discountRare}</TableCell>
                <TableCell>{product.productStock}</TableCell>
                <TableCell>{product.productState}</TableCell>
                <TableCell>
                  <Edit className={styles.iconos} onClick={() => selectCaseEditDelete(product, 'Editar')}></Edit>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Delete className={styles.iconos} onClick={() => selectCaseEditDelete(product, 'Eliminar')}></Delete>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={newModal} onClose={openCloseNewModal}>
        {newProductBody}
      </Modal>

      <Modal open={editModal} onClose={openCloseEditModal}>
        {editProductBody}
      </Modal>

      <Modal open={deleteModal} onClose={openCloseDeleteModal}>
        {deleteProductBody}
      </Modal>

    </div>
  );
}

export default App;
