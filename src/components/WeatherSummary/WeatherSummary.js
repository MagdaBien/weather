import styles from './WeatherSummary.module.scss';

const WeatherSummary = ({...data}) => {

  return (
    <section className={styles.weatherSummary}>
      <img
        className={styles.weatherIcon}
        alt={data.description} 
        src={`${process.env.PUBLIC_URL}/images/weather-icons/${data.icon}.png`} />
      <div className={styles.weatherInfo}>
        <h2>{data.city}</h2>
        <p>
          <strong>Temp:</strong> {data.temp}°C
        </p>
      </div>
    </section>
  );
};

export default WeatherSummary;
 