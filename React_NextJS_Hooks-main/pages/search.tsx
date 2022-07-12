import { GetStaticProps } from "next";
import React from "react";
import { whithLayout } from "../layout/Layout";
import axios from "axios";
import { MenuItem } from "../interfaces/menu.interface";
import { API } from "../helpers/api";

function Search(): JSX.Element {
  return (
    <>
      Search
    </>
  );
}

export default whithLayout(Search);

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
