import React, {useContext, useEffect, useState } from 'react';
import './resultado.css'
import AppContext from '../../context/AppContext';
import { useParams } from 'react-router-dom';
import { fetchByID } from '../../api/fetchProducts';
import formatCurrency from '../../utils/formatCurrency';
import Loading from '../Loading/Loading';
import Counter from '../redux/Counter';



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
    (loading && <Loading /> ) || (
    <section className='product-card'>
        <img
        src= {produto.thumbnail.replace(/\w\.jpg/gi, 'W.jpg')}
        alt='product'
        className='card-image'
        />
        <div className='Card-info'>
          <h2 className=' card-tile'>{produto.title}</h2>
          <h4 className='card-price'> {formatCurrency(produto.price, 'BRL')}</h4>
          <span>{produto.title}</span>
          <Counter/>
          <input type='number' placeholder='Digite seu cep'></input><button> Calcular frete</button>
          <button>Comprar agora</button>
          <button>Adicionar ao carrinho</button>
        </div>
    </section>
    )
  );
}
export default ProductResult;

