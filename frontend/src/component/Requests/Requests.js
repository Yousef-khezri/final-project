import React from 'react'
import Requests_Web from "./Web/Requests_Web";

function Requests({ currentUser, setCurrentUser, setReceiver_id }) {
	return (
		<div>
			<Requests_Web
				currentUser={currentUser}
				setCurrentUser={setCurrentUser}
				setReceiver_id={setReceiver_id}
			/>
		</div>
	);
}

export default Requests;