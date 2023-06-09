import React, { createContext, useEffect, useState } from "react";
import Binary from "../../../components/Index/Binary/Binary";
import Analys from "../../../components/Index/Analys/Analys";
import b_price from "../../../api/price/b_price";
import { useContext } from "react";
import { MainContext } from "../Index";
import { useMediaQuery } from "react-responsive";


export const TradingContext= createContext()
const Trading = () => {
  const isDesktopScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  // const isMobileScreen = useMediaQuery({ query: "(max-width: 1024px)" });
  const {setClassIndex }= useContext(MainContext)
  const [data, setData]= useState()
  useEffect(()=> {
    (async () => {
      try {
        const data = await b_price();
        setData(data)
      } catch (error) {}
    })();
  }, [])
  useEffect(()=> {
    setClassIndex("index")
  }, [])

  return (
    <TradingContext.Provider value={{data}}>
      <div data-v-0dc9f329 data-v-2120bbd4 id="binaryPage">
        <section data-v-0dc9f329 className="content position-relative">
          <div data-v-0dc9f329 className={isDesktopScreen ? "h-100 d-flex flex-lg-row flex-md-row" : "wrap-chart-page"}>
            <Binary />
            <Analys />
          </div>
        </section>
      </div>
    </TradingContext.Provider>
  );
};

export default Trading;
