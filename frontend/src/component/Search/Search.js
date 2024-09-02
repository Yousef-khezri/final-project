import React from 'react';
import Search_Web from "./Web/Search_Web";

function Search({ currentUser, setCurrentUser, setReceiver_id }) {
	return (
		<div>
			<Search_Web
				currentUser={currentUser}
				setCurrentUser={setCurrentUser}
				setReceiver_id={setReceiver_id}
			/>
		</div>
	);
}

export default Search;