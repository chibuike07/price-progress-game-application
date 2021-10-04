import { useEffect, useState } from "react";
import { questionsArray } from "../util/container";
import PriceProgress from "../component/PriceProgress.jsx";

let len = 0;
const DisplayGame = () => {
  const [quesToDisplay, setQuesToDisplay] = useState([]);

  const [checked, setchecked] = useState(false);
  const [selectedAnswer, setselectedAnswer] = useState("");
  const [priceProgress, setpriceProgress] = useState(false);
  const [index, setIndex] = useState(0);

  const next = () => {
    len = len + 1;
    len = len % questionsArray.length;
    setQuesToDisplay(questionsArray[len]);
  };

  const handleRadioBoxChange = ({ target }, selectedAnswer) => {
    setchecked(() => target.checked);
    setselectedAnswer(() => selectedAnswer);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIndex(len);
    questionsArray[len]["answer"] === selectedAnswer
      ? setpriceProgress(() => true)
      : console.log(`false`, false);
  };

  useEffect(() => {
    let subscribe = true;
    const handleCurrentQuestion = () => {
      len = len % questionsArray.length;
      subscribe && setQuesToDisplay(questionsArray[len]);
    };
    handleCurrentQuestion();

    const handleResetPriceProgress = () => {
      setTimeout(() => {
        subscribe && priceProgress && setpriceProgress(() => false);
      }, 2000);
    };

    handleResetPriceProgress();
    return () => {
      subscribe = false;
    };
  }, [priceProgress]);

  return (
    <>
      <PriceProgress priceProgress={priceProgress} index={index} />
      <div
        className={"container d-flex align-items-center"}
        style={{ height: "70vh", backgroundColor: "#fff" }}
      >
        <main
          className="w-100 d-flex justify-content-center align-items-center"
          style={{
            height: "50vh",
            flexDirection: "column",
          }}
        >
          <p className="p-2 card-text text-uppercase">{`${quesToDisplay["question"]}`}</p>

          <form className="p-2 form-check" onSubmit={(e) => handleSubmit(e)}>
            {quesToDisplay &&
              [quesToDisplay["options"]].map((option, indx) => {
                const optionsKeys = option && Object.keys(option);
                return (
                  optionsKeys &&
                  optionsKeys.map((keys, idx) => {
                    return (
                      <p key={idx}>
                        <input
                          className="form-check-input"
                          defaultChecked={checked}
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                          onChange={(e) => handleRadioBoxChange(e, keys)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault1"
                        >
                          {option[keys]}
                        </label>
                      </p>
                    );
                  })
                );
              })}

            <button className="btn btn-primary">Submit Answer</button>
          </form>
          <div className="btn-group">
            <button onClick={() => next()} className="btn-primary btn-sm">
              next
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default DisplayGame;
