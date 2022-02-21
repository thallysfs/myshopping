import React from 'react';
import firestore from '@react-native-firebase/firestore'

import { ButtonIcon } from '../ButtonIcon';
import { Container, Info, Title, Quantity, Options } from './styles';

export type ProductProps = {
  id: string;
  description: string;
  quantity: number;
  done: boolean;
}

type Props = {
  data: ProductProps;
}

export function Product({ data }: Props) {
  function handleDoneToggle(){
    //atualizar registro no Firebase
    firestore()
    .collection('products')
    .doc(data.id)
    .update({
      done: !data.done,
      //description: 'feijão' para alterar a descrição. O que for passado nesse objeto será atualizado
    })
  }

  function handleDelete(){
    //deletar um registro de firebase
    firestore()
    .collection('products')
    .doc(data.id)
    .delete()
  }

  return (
    <Container>
      <Info>
        <Title done={data.done}>
          {data.description}
        </Title>

        <Quantity>
          Quantidade: {data.quantity}
        </Quantity>
      </Info>

      <Options>
        <ButtonIcon
          icon={data.done ? "undo" : "check"}
          onPress={handleDoneToggle}
        />

        <ButtonIcon
          icon="delete"
          color="alert"
          onPress={handleDelete}
        />
      </Options>
    </Container>
  );
}
