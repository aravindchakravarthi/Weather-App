import React from 'react'

const Header = ({ search, setSearch }) => {
	return (
		<div className='df head'>
			<h1 className='heading'>Weather App</h1>
			<input
				type='search'
				placeholder=' Enter City name...'
				className='search'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
		</div>
	)
}

export default Header
