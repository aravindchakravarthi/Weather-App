import React from 'react'
import '../StyleSheet/Location.css'

const Location = ({ selectRow, searchResults }) => {
	return (
		<table id="keywords" cellSpacing="0" cellPadding="0">
			<thead>
				<tr>
					<th>City Name</th>
					<th>Country Name</th>
					<th>Longitude</th>
					<th>Latitude</th>
					<th>Timezone</th>
				</tr>
			</thead>
			<tbody>
				{searchResults.map(city => (
					<tr key={city.geoname_id} onClick={() => selectRow(city.coordinates.lon, city.coordinates.lat)}>
						<td>{city.ascii_name}</td>
						<td>{city.cou_name_en}</td>
						<td>{city.coordinates.lon}</td>
						<td>{city.coordinates.lat}</td>
						<td>{city.timezone}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default Location
