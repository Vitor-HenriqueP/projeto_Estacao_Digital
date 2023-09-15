import React, {useContext, useEffect, useState } from 'react';
import './frete.css'
const frete=()=>{
    return(
        <div className='frete'>
            <input type='number' placeholder='Digite seu cep'></input><button> Calcular frete</button>
        </div>
    );
}
export default (frete);