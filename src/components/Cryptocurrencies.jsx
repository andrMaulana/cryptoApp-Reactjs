import React, {useState, useEffect} from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';

function Cryptocurrencies({simplified}) {
  const count = simplified?10:100;
  const {data: cryptosList, isFetching} = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState('')
  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);
    const filtereData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
    setCryptos(filtereData);
  },
  [cryptosList,searchTerm]
  );
  if(isFetching) return 'Loading ...';
  return (
    <div>
      <>
      {!simplified &&(
      <div className="search-crypto">
        <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      )}
        <Row gutter={[32, 32]} className="crypto-card-container">
              {cryptos?.map((currency) => (
                <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
                    <Link to={`/crypto/${currency.id}`}>
                        <Card 
                        title={`${currency.rank}. ${currency.name}`}
                        extra={<img className="crypto-image" src={currency.iconUrl} />}
                        hoverable
                        >
                          <p>Price: {millify(currency.price)}</p>  
                          <p>Market Cap: {millify(currency.marketCap)}</p>  
                          <p>Change: {millify(currency.change)}%</p>  
                        </Card>
                    </Link>
                </Col>
              ))}
        </Row>
      </>
    </div>
  )
}

export default Cryptocurrencies