import React from 'react';

import './Box.css';
import Title from './Title/Title';
import Footer from './Footer/Footer';
import Container from './Container/Container';

const box = (props) => (
    <div className="Box">
        <Title>{props.title}</Title>
        <Container name="Net" date="23/06/2018" value="R$ 200,00" />
        <Container name="Aluguel" date="05/06/2018" value="R$ 800,00" />
        <Container name="Luz" date="10/06/2018" value="R$ 150,00" />
        <Footer total={2000} />
    </div>
)

export default box;