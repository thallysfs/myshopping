import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore'

import { styles } from './styles';
import { Product, ProductProps } from '../Product';

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  // useEffect(()=>{
  //   //leitura única de uma coleção do firebase
  //   firestore()
  //     .collection('products')
  //     .get()
  //     .then(response => {
  //       const data = response.docs.map(doc => {
  //         return {
  //           id: doc.id,
  //           ...doc.data()
  //         }
  //       }) as ProductProps[];
  //       setProducts(data);
  //     })
  //     .catch(error => console.log(error))
  // }, [])
  //pegando por um id específico
  // useEffect(() => {
  //   firestore()
  //     .collection('products')
  //     .doc('C4LeDG5q7OdK1Oqbb9gr')
  //     .get()
  //     .then(response => console.log({
  //       id: response.id,
  //       ...response.data()
  //     }))
  // }, [])

  //semelhante ao order by sql
  //.orderBy('quantity')
  //start e end define um intervalo, para funcionar o orderBy precisa estar presente
  //.startAt(2)
  //.endAt(5) 
  //.limit(3) semelhante ao top do select
  //where condiciona a busca, a função recebe 3 parametros = Coluna, operador e valor
  //.where('quantity', '==', 1)


    useEffect(()=>{
    //leitura do banco em tempo real
    const subscribe = firestore()
      .collection('products')
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }) as ProductProps[]
        setProducts(data);
      });
      console.log(products)
      return () => subscribe();
  }, [])

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
