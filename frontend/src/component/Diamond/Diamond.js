import React from 'react';
import Diamond_Web from './Web/Diamond_Web';

function Diamond({ currentUser, setCurrentUser, setReceiver_id }) {
	return (
		<div>
			<Diamond_Web
				currentUser={currentUser}
				setCurrentUser={setCurrentUser}
				setReceiver_id={setReceiver_id}
			/>
		</div>
	);
}

export default Diamond