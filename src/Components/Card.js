import React from 'react'

const Card = ({ getDayName, forecastData, selectedCity }) => {
	return (
		<div className='weather'>
			<div className='mx-w'>
				<div className='card'>
					<p className='day'>{getDayName(new Date(), 0)}</p>

					<p>Temperature: {selectedCity.main.temp} °C</p>
					<p>Wind Speed: {selectedCity.wind.speed} m/s</p>
					<p>Humidity: {selectedCity.main.humidity}%</p>
					<p>Atmospheric Pressure: {selectedCity.main.pressure} Pa</p>
					<p>Weather Description: {selectedCity.weather[0].description}</p>
				</div>
				<div className='jccen'>
					<div className='minicard'>
						{forecastData.map((forecast, index) => (
							<div className='mini' key={index}>{getDayName(new Date(), index + 1)}: {forecast.main.temp} °C</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Card
