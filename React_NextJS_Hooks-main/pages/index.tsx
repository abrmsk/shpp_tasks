import { GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import { Button, Htag, P, Tag, Rating, Input, Textarea } from "../components";
import { whithLayout } from "../layout/Layout";
import axios from "axios";
import { MenuItem } from "../interfaces/menu.interface";
import { API } from "../helpers/api";

function Home({ menu }: HomeProps): JSX.Element {
  const [counter, setCounter] = useState(0);
  const [rating, setRating] = useState<number>(4);
  // useEffect(() => { console.log('Mounted'); }, []);
  // useEffect(() => { console.log('Counter: ', counter); return function cleanup() { console.log('Unmount'); }; });

  return (
    <>
      <Htag tag='h1'>Title</Htag>
      <Htag tag='h3'>Counrer click: {counter}</Htag>
      <Button appearance='primary' arrow='right' onClick={() => setCounter(x => x + 1)}>Click Button</Button>
      <Button appearance='ghost' arrow='down'>Кнопка</Button>
      <br />
      <P size='l'>Большой</P>
      <P>Средний</P>
      <P size='s'>Маленький</P>
      <Tag size='s' color="primary">Тег Маленький</Tag>
      <Tag size='m' color="ghost">Тег Большой</Tag>
      <Tag size='m' color="red">Тег 1</Tag>
      <Tag size='m' color="green">Тег 2</Tag>
      <Tag size='m' color="green" href="###">Тег Ссылка</Tag>
      <p />
      <Rating rating={2} />
      <Rating rating={rating} isEditable setRating={setRating} />
      <Input placeholder='placeholder' />
      <Textarea placeholder='this textarea' />
    </>
  );
}

export default whithLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
   const firstCategory = 0;
   const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
     firstCategory
   });
   return {
      props: {
        firstCategory,
        menu
      }
   };
};

interface HomeProps extends Record<string, unknown> {
  firstCategory: number;
  menu: MenuItem[];
}
