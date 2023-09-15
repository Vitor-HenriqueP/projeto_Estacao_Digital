import React, {useContext, useEffect, useState } from 'react';
import './compra.css'
const Compra=()=>{
    return(
        <div className='compra'>
            <button className='buynow'>Comprar agora</button>
            <button className='add'>Adicionar ao carrinho</button>
        </div>
    );
}
export default (Compra);