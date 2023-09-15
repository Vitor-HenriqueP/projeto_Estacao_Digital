import React from 'react';
import { connect } from 'react-redux';
import './counter.css'


const Counter = (props) => {
    return (
        <div className='quant'>
            <button onClick={props.incremento}>+</button>
            <button onClick={props.decremento}>-</button>
            <span className='text'>Quantidade: {props.count}</span>
           
        </div>
        
    );
};

const mapState = (state) => {
    return{
        count: state.count,
    };
};

const mapAssociate = (dispatch) => {
    return {
        incremento: () => dispatch({ type: 'INCREMENTO' }),
        decremento: () => dispatch({ type: 'DECREMENTO' }),

    };
};

export default connect(mapState,mapAssociate) (Counter);