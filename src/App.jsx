import { useState, useEffect } from "react";
import Nebula from "./nebula.jpg";
import NebulaPlaceholder from "./nebula_placeholder.jpg";

export default function App() {
  const initialState = {
    term1: "",
    symbol: "",
    term2: "",
    result: "",
  };

  const [data, setData] = useState(initialState);
  const [loaded, setLoaded] = useState(false);

  function addNumber(n) {
    if (data.symbol === "") {
      setData({ ...data, term1: (data.term1 += n), result: "" });
    } else {
      setData({ ...data, term2: (data.term2 += n), result: "" });
    }
  }

  function addFunction(f) {
    if (f === "CE") {
      setData(initialState);
      return;
    }
    if (f === "C") {
      if (data.symbol === "" && data.term2 === "") {
        setData({ ...data, result: "", term1: "" });
      } else if (data.symbol !== "" && data.term2 === "") {
        setData({ ...data, result: "", symbol: "" });
      } else if (data.term2 !== "") {
        setData({ ...data, result: "", term2: "" });
      }
      return;
    }
    if (
      (f === "/" || f === "+" || f === "-" || f === "*") &&
      data.term1 !== ""
    ) {
      setData({ ...data, symbol: f });
      return;
    }
    if (
      f === "=" &&
      data.term1 !== "" &&
      data.term2 !== "" &&
      data.symbol !== ""
    ) {
      var t1 = Number(data.term1),
        t2 = Number(data.term2);
      setData({
        ...data,
        result: String(
          data.symbol === "/"
            ? t1 / t2
            : data.symbol === "*"
            ? t1 * t2
            : data.symbol === "+"
            ? t1 + t2
            : data.symbol === "-"
            ? t1 - t2
            : ""
        ).slice(0, 12),
      });
    }
  }

  return (
    <main>
      <img
        src={Nebula}
        className="image"
        alt="background"
        loading="lazy"
        onLoad={() => setLoaded((prev) => !prev)}
      />
      <img
        src={NebulaPlaceholder}
        alt="background placeholder"
        className={`image placeholder ${loaded ? "is-gone" : ""}`}
      />
      <h1>
        <a href="https://pierregueroult.dev" target={"_blank"} rel="noreferrer">
          Pierre Guéroult
        </a>
        , Calculatrice Simple codée avec{" "}
        <a href="https://reactjs.org/" target={"_blank"} rel="noreferrer">
          React.JS
        </a>
      </h1>
      <section>
        <div className="screen">
          <div className="calculation">{`${data.term1} ${data.symbol} ${
            data.term2
          } ${data.result !== "" ? "=" : ""}`}</div>
          <div className="result">{data.result}</div>
        </div>
        <div className="keyboard">
          <div className="numbers">
            <div className="seven element" onClick={() => addNumber("9")}>
              9
            </div>
            <div className="eight element" onClick={() => addNumber("8")}>
              8
            </div>
            <div className="nine element" onClick={() => addNumber("7")}>
              7
            </div>
            <div className="four element" onClick={() => addNumber("4")}>
              4
            </div>
            <div className="five element" onClick={() => addNumber("5")}>
              5
            </div>
            <div className="six element" onClick={() => addNumber("6")}>
              6
            </div>
            <div className="one element" onClick={() => addNumber("1")}>
              1
            </div>
            <div className="two element" onClick={() => addNumber("2")}>
              2
            </div>
            <div className="three element" onClick={() => addNumber("3")}>
              3
            </div>
            <div className="zero element" onClick={() => addNumber("0")}>
              0
            </div>
            <div className="point element" onClick={() => addNumber(".")}>
              .
            </div>
          </div>
          <div className="functions">
            <div className="ce element" onClick={() => addFunction("CE")}>
              CE
            </div>
            <div className="c element" onClick={() => addFunction("C")}>
              C
            </div>
            <div className="divide element" onClick={() => addFunction("/")}>
              /
            </div>
            <div className="times element" onClick={() => addFunction("*")}>
              *
            </div>
            <div className="substract element" onClick={() => addFunction("-")}>
              -
            </div>
            <div className="add element" onClick={() => addFunction("+")}>
              +
            </div>
            <div className="enter element" onClick={() => addFunction("=")}>
              =
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
