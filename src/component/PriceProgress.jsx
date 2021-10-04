import { useEffect, useRef } from "react";
import styles from "./priceProgress.module.css";
import { price } from "../util/container";

const PriceProgress = ({ priceProgress, index }) => {
  const lists = useRef();
  const { PriceColorForCorrectAnswer } = styles;

  useEffect(() => {
    const handlePriceProgress = () => {
      const {
        current: { children },
      } = lists;
      const ulList = [...children];
      if (priceProgress) {
        for (let i = 0; i < ulList.length; ++i) {
          index === i
            ? ulList[index].classList.add(PriceColorForCorrectAnswer)
            : ulList[i].classList.remove(PriceColorForCorrectAnswer);
        }
      }
    };
    handlePriceProgress();
  }, [PriceColorForCorrectAnswer, priceProgress, index]);

  return (
    <div className="container w-100" style={{ backgroundColor: "red" }}>
      <ul
        className={"d-flex justify-content-around float-end w-50 mt-2"}
        ref={lists}
        style={{ listStyle: "none", color: "#fff" }}
      >
        {price && price.map((val, idx) => <li key={idx}>{val}</li>)}
      </ul>
    </div>
  );
};

export default PriceProgress;
