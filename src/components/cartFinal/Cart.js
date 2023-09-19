import React, { useState, useEffect, useContext } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import AppContext from '../../context/AppContext';
import { db } from '../../services/firebaseConfig';
import Counter from '../redux/Counter';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import './Cart.css'
function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const {loading, setLoading } = useContext(AppContext);

  useEffect(() => {
    async function fetchCartProducts() {
      try {
        const cartCollectionRef = collection(db, 'carrinho');
        const querySnapshot = await getDocs(cartCollectionRef);

        const cartData = [];
        querySnapshot.forEach((doc) => {
          const product = doc.data();
          cartData.push({ ...product, docId: doc.id });
        });

        setCartProducts(cartData);
      } catch (error) {
        
        console.error('Erro ao buscar produtos no carrinho:', error);
      }
    }
    setLoading(false);
    fetchCartProducts();
  }, []);

  const handleRemoveProduct = async (docId) => {
    try {
      const productDocRef = doc(db, 'carrinho', docId);
      await deleteDoc(productDocRef);
      setCartProducts((prevProducts) => prevProducts.filter((product) => product.docId !== docId));
      console.log('Produto removido com sucesso do carrinho:', docId);
    } catch (error) {
      console.error('Erro ao remover produto do carrinho:', error);
    }
  };

  const handleUpdateQuantity = async (docId, newQuantity) => {
    try {
      const productDocRef = doc(db, 'carrinho', docId);
      await updateDoc(productDocRef, { quantidade: newQuantity });
      // Atualize a quantidade no estado local para refletir as alterações
      setCartProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.docId === docId ? { ...product, quantidade: newQuantity } : product
        )
      );
      console.log('Quantidade do produto atualizada com sucesso:', docId, newQuantity);
    } catch (error) {
      console.error('Erro ao atualizar a quantidade do produto:', error);
    }
  };

  return (
  (loading && <Loading /> ) || (
    <div>
        <Link to="/">Voltar</Link>
      <h1>Carrinho de Compras</h1>
      <ul>
        {cartProducts.map((product) => (
          <div key={product.docId}>
            <img src={product.thumbnail}/>
            <span>
              {product.title} <br />
              <Counter // Use o componente Counter aqui
                quantity={product.quantidade} // Passe a quantidade do produto como prop
                handleQuantityChange={(newQuantity) => handleUpdateQuantity(product.docId, newQuantity)} // Passe a função de atualização de quantidade
              />
              <button onClick={() => handleRemoveProduct(product.docId)}>Remover</button>
            </span>
          </div>
        ))}
      </ul>
    </div>
    )
  );
}

export default Cart;
