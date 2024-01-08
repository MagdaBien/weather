import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import React, {useCallback, useState} from 'react';
import { useAccordionButton } from 'react-bootstrap';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = props => {

  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback(
    (chosenCity) => { 
      setisLoading(true);
      setError(false);  
      setCity(chosenCity); 
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${chosenCity}&appid=775773313d1fb3883f591ec75649c793&units=metric`)
      .then(res => {
        if(res.status === 200) {
          setisLoading(false);
          return res.json()
            .then(data => {
              const cityData = {
                city: data.name,
                temp: data.main.temp,
                icon: data.weather[0].icon,
                description: data.weather[0].main
                };  
                setWeatherData({...cityData});  
                setisLoading(false);    
            });
          } else {
            setError(true);
            setisLoading(false);
          }
        })

      }, [city]
    );

  //console.log("weatherData: ", weatherData);
  
  return (
    <section>
      <PickCity action={handleCityChange} />
      { (weatherData  &&  !isLoading && !error) && <WeatherSummary {...weatherData} /> }
      { isLoading && <Loader /> }
      { error && <ErrorBox>There is no such city</ErrorBox> }
    </section>    
  )
};

export default WeatherBox;