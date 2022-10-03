import "./App.scss";
import { useEffect, useState } from "react";
import Axios from "axios";

function App() {
  const [value, setvalue] = useState([]);
  const [search, setsearch] = useState('');
  const [loading, setloading] = useState(false);

  const searchitems = (e) => {
    setsearch(e.target.value)
  };

  const work = () => {
    setloading(true);
    Axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    )
      .then((res) => {
        setvalue(res.data);
        setloading(false);
      })
      .catch((error) => console.log("error"));
}

  useEffect(() => {
    work();
  }, []);


  return (
    <div className="App">
      <h2>Search for a currency</h2>
      {loading === true &&  <div ><img src= './icons8-loading-24.png' className="loading"/></div>}
      <input placeholder="search currency" onChange={searchitems}/>
      {value.filter((item=>{
            if (search === ""){
              return item
            }else if (item.name.toLowerCase().includes(search.toLowerCase())){
              return item
            }
          })).map((item) => {
        return (
          <div key={item.id} >
            <div className="container">
                <div className="imgsec">
                <img src={item.image} alt='img'/>
                <p>{item.name}</p>
              </div>
              <p className="symbol">{item.symbol.toUpperCase()}</p>
              <div className="price-change">
              <p className="current-price">${item.current_price.toLocaleString()}</p>
              {item.market_cap_change_percentage_24h < 0 ?
              (<p className="mcap-day" style={{color: 'red'}}>{item.market_cap_change_percentage_24h.toFixed(2)}</p>) :
              (<p className="mcap-day" style={{color: 'green'}}>{item.market_cap_change_percentage_24h.toFixed(2)}</p>)}
              </div>
              <p className="m-cap">MKT Cap:  ${item.market_cap.toLocaleString()}</p>
            </div>
            <hr className="hr"/>
          </div>
        );
      })}
    </div>
  );
}

export default App;
