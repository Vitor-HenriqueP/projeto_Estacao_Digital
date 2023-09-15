import React, {useContext, useEffect, useState } from 'react';
import './resultado.css'
import AppContext from '../../context/AppContext';
import { useParams } from 'react-router-dom';
import { fetchByID } from '../../api/fetchProducts';
import formatCurrency from '../../utils/formatCurrency';



function ProductResult(){ 
  const {loading, setLoading } = useContext(AppContext);
  const {id}= useParams();
  const [produto, setProduto] = useState({})

  useEffect(() => {
    fetchByID(id).then((resultado) => {
      setProduto(resultado);
      setLoading(false);
    });
  }, []);

  return(
    <section className='product-card'>
        <img
        src= {produto.thumbnail}
        alt='product'
        className='card-image'
        />
        <div className='Card-info'>
          <h3 className=' card-tile'>{produto.title}</h3>
          <h4 className='card-price'> {formatCurrency(produto.price, 'BRL')}</h4>
          <span>{}</span>
          <span>Quantidade <button>+</button><button>-</button></span>
          <input placeholder='Digite seu cep'></input><button> calcular frete</button>
          <button>Comprar agora</button>
          <button>Adicionar ao carrinho</button>

        </div>
    </section>
  );
}
export default ProductResult;

