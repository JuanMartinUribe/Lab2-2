import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';

import Book from '../components/Book'

const HomeScreen = () => {

    const [books, setBooks] = useState([])

    useEffect( () => {
        const fetchBooks = async () => {
            const { data } = await axios.get('/api/books')
            
            setBooks(data)
        }
        
        fetchBooks()
    }, [])

    return (
        <>
            <h1> Catalogo de Libros </h1> 
            <Row>
                {books.map((book) => (
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <Book book={book} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen
