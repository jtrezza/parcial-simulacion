import React from 'react';
import './App.scss';
import avgImg from 'images/promedio.png';
import varianzaImg from 'images/varianza.png';
import limitesAceptImg from 'images/limites-aceptacion.png';
import limitesVarImg from 'images/limites-varianza.png';
import dddImg from 'images/ddd.png';
import o0Img from 'images/o0.png';
import u0Img from 'images/u0.png';
import z0Img from 'images/z0.png';
import { avg, varianza, countRange, mat2arrSort } from 'functions';
import { jStat } from 'jstat';

const values = [
  [0.8797, 0.3884, 0.6289, 0.875, 0.5999, 0.8589, 0.9996, 0.2415, 0.3808, 0.9606],
  [0.9848, 0.3469, 0.7977, 0.5844, 0.8147, 0.6431, 0.7387, 0.5613, 0.0318, 0.7401],
  [0.4557, 0.1592, 0.8536, 0.8846, 0.341, 0.1492, 0.8681, 0.5291, 0.3188, 0.5992],
  [0.917, 0.2204, 0.5991, 0.5461, 0.5739, 0.3254, 0.0856, 0.2258, 0.4603, 0.5027],
  [0.8376, 0.6235, 0.3681, 0.2088, 0.1525, 0.2006, 0.472, 0.4272, 0.636,	0.0954],
]

function App() {
  const n = values.reduce((acc, r) => acc + r.reduce((acc, v) => acc + 1, 0), 0);
  // El valor de "m" que usaremos para la prueba de chi-cuadrada
  const chiSqM = Math.floor(Math.sqrt(n));
  let x02 = 0;
  const insri = [];
  const riis1n = [];
  return (
    <div className="App">
      <h1 className="title">Segundo parcial simulación</h1>
      <h2 className="subtitle">José Trezza</h2>
      <h3 className="section-title">Dado la siguiente tabla de números pseudoaleatorios:</h3>
      <div className="table-container">
        <table className="values-table">
          <tbody>
            {
              values.map((r, i) => (
                <tr key={i}>
                  {r.map(v => (
                    <td key={v}>{v}</td>
                  ))}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className="content">
        <p>
          Hacer las siguientes pruebas para determinar si se aceptan o se rechazan el conjunto de datos que pueden ser usados para la simulación:
        </p>
        <p className="step-title">
          <b>1. Prueba de las medias:</b>
        </p>
        <p>Usando un nivel de aceptación del 95%.</p>
        <p className="step-title">
          La prueba de medias consiste en determinar el promedio de los n números que contiene el conjunto mediante la siguiente ecuación
        </p>
        <p className="step-title">
          <img src={avgImg} alt="AVG formula"/>
        </p>
        <p className="step-title">
          Calculamos el promedio de todos los valores en la tabla: <b>{avg(values)}</b>
        </p>
        <p className="step-title">
          Después se calculan los límites de aceptación inferior y superior con las ecuaciones siguientes:
        </p>
        <p className="step-title">
          <img src={limitesAceptImg} alt="Límites de aceptación"/>
        </p>
        <p className="step-title">
          Límite inferior: <b>{(1/2)-(1.96)*(1/Math.sqrt(12*50))}</b> <br/>
          Límite superior: <b>{(1/2)+(1.96)*(1/Math.sqrt(12*50))}</b>
        </p>
        <p className="step-title">
          El valor del promedio se encuentra entre los límites de aceptación, por lo tanto se concluye que no se puede rechazar el conjunto.
        </p>
        <p className="step-title" />
        <p className="step-title">
          <b>2. Prueba de la varianza:</b>
        </p>
        <p>Usando un nivel de aceptación del 95%.</p>
        <p className="step-title">
          La prueba de varianza consiste en determinar la varianza de los n números que contiene el conjunto mediante la ecuación siguiente:
        </p>
        <p className="step-title">
          <img src={varianzaImg} alt="AVG formula"/>
        </p>
        <p className="step-title">
          V(r) = {varianza(values)}
        </p>
        <p className="step-title">
          Después se calculan los límites de aceptación inferior y superior con las ecuaciones siguientes:
        </p>
        <p className="step-title">
          <img src={limitesVarImg} alt="Límites de aceptación"/>
        </p>
        <p className="step-title">
          Límite inferior: <b>{jStat.chisquare.inv(0.05/2, n - 1)/(12 * (n - 1))}</b> <br/>
          Límite superior: <b>{jStat.chisquare.inv(1- 0.05/2, n - 1)/(12 * (n - 1))}</b> <br/>
        </p>
        <p className="step-title">
          El valor se encuentra entre los límites de aceptación. No se puede rechazar.
        </p>
        <p className="step-title">
          <b>3. Prueba de Uniformidad:</b>
        </p>
        <div className="step-title">
          <ul>
            <li>Chi cuadrada con un nivel de aceptación del 95%</li>
          </ul>
        </div>
        <p className="step-title">
          m = {chiSqM}
        </p>
        <p className="step-title">
          Usamos el valor de <i>m</i> para la cantidad de filas de la tabla:
        </p>
        <div className="table-container">
          <table className="values-table">
            <thead>
              <tr>
                <th>Intervalo</th>
                <th>Oi</th>
                <th>Ei = n/m</th>
                <th>(Ei - O)^2/Ei</th>
              </tr>
            </thead>
            <tbody>
              {
                new Array(Math.floor(chiSqM)).fill(1).map((r, i) => {
                  const bottom = i * 1/chiSqM;
                  const top = i * 1/chiSqM + (1/chiSqM);
                  const oi = countRange(values, bottom, top);
                  const einm = Math.sqrt(n);
                  const eio = Math.pow(einm - oi, 2)/einm;
                  x02 += eio;
                  return (
                    <tr key={i}>
                      <td>{bottom} - {top}</td>
                      <td>{oi}</td>
                      <td>{n/einm}</td>
                      <td>{eio}</td>
                    </tr>
                  )
                })
              }
              <tr>
                <td />
                <td />
                <td><b>Total</b></td>
                <td>{x02}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="step-title">
          No se puede rechar porque: <br/>
          {x02} &lt; {jStat.chisquare.inv(1- 0.05, 6)}
        </p>
        <div className="step-title">
          <ul>
            <li>Prueba Kolmogorov-Smirnov</li>
          </ul>
        </div>
        <div className="table-container">
          <table className="values-table">
            <thead>
              <tr>
                <th>i</th>
                <th>i/n</th>
                <th>ri</th>
                <th>(i-1)/n</th>
                <th>(i/n)-ri</th>
                <th>ri - ((i-1)/n)</th>
              </tr>
            </thead>
            <tbody>
              {
                mat2arrSort(values).map((v, i) => {
                  const actualI = i+1;
                  insri.push(actualI/n-v);
                  riis1n.push(v - ((actualI-1)/n));
                  return (
                    <tr key={i}>
                      <td>{actualI}</td>
                      <td>{actualI/n}</td>
                      <td>{v}</td>
                      <td>{(actualI-1)/n}</td>
                      <td>{actualI/n-v}</td>
                      <td>{v - ((actualI-1)/n)}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        <p className="step-title">
          Determinar los valores de: D+, D- y D con las siguientes ecuaciones:
        </p>
        <p className="step-title">
          <img src={dddImg} alt="Límites de aceptación"/>
        </p>
        <p className="step-title">
          D+ = <b>{Math.max(...insri)}</b>; D- = <b>{Math.max(...riis1n)}</b>; D = <b>{Math.max(Math.max(...insri), Math.max(...riis1n))}</b>
        </p>
        <p className="step-title">
          Valor de la tabla D0.10,50 = 0.16
        </p>
        <p className="step-title">
          El valor D es menor que el de la tabla, por lo tanto se concluye que los números del conjunto se distribuyen uniformemente
        </p>
        <p className="step-title">
          <b>4. Prueba de Independencia:</b>
        </p>
        <p>Corridas de arriba y abajo con un nivel de aceptación del 95%.</p>
        <p className="step-title">
          Tabla de unos y ceros:
        </p>
        <div className="table-container">
          <table className="values-table">
            <tbody>
              {
                values.map((r, i, fullArr) => (
                  <tr key={i}>
                    {r.map((v, j, rowArr) => {
                      const current = v;
                      const next = rowArr[j+1] ? rowArr[j+1] : (fullArr[i+1] ? fullArr[i+1][0] : '');
                      return (
                        <td key={`${i}-${j}`}>{next ? (current <= next ? 1 : 0) : ''}</td>
                      )
                    })}
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <p className="step-title same-line">
          C0 = 31
        </p>
        <p className="step-title same-line table-container">
          <img src={u0Img} alt="AVG formula"/><span className="value">{(2*n-1)/3}</span>
        </p>
        <p className="step-title same-line table-container">
          <img src={o0Img} alt="AVG formula"/><span className="value">{(16*n-29)/90}</span>
        </p>
        <p className="step-title same-line table-container">
          <img src={z0Img} alt="AVG formula"/><span className="value">{Math.abs((31-33)/Math.sqrt((16*n-29)/90))}</span>
        </p>
        <p className="step-title same-line">
          El valor 𝑍0 cae dentro del intervalo −1,96 ≤ 𝑍_0=0,68 ≥ 1,96 se cnocluye que no se puede rachazar que los numeros del conjunto 𝑟_𝑖 son independientes. Son aptos para usar en un estudio de simulación.
        </p>
      </div>
    </div>
  );
}

export default App;
