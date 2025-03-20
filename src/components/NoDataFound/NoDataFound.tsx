import "./NoDataFound.css"
import { IoSearchSharp } from "react-icons/io5";
import React from 'react'

 function NoDataFound() {
	return (
		<div className="noDataContainer">
			<div className='search-icon'>
				<IoSearchSharp />
			</div>

			<span>No data found. Please search proper query</span>
		</div>
	)
}
export default NoDataFound
