import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Hobbies.css";

function Hobbies({user_id, receiver_id}) {
	const [userHobbies, setUserHobbies] = useState();
	const [hobbies, setHobbies] = useState([]);
	const [isEditingHobbies, setIsEditingHobbies] = useState(false);
	const [error, setError] = useState(null); // State برای مدیریت خطاها

	// const [receiverId, setReceiverId] = useState(receiver_id);

	//############################################################################ */
	//                            start hobbies			    					   //
	//**************************************************************************** */
	// Get user-hobbies API
	useEffect(() => {
		const fetchHobbies = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5000/user-hobbies`,
					{
						params: { user_Id: receiver_id },
						// ارسال پارامترها به‌عنوان query string
					}
				);
				setUserHobbies(response.data);
			} catch (err) {
				setError(err.message); // مدیریت خطاها
			}
		};

		fetchHobbies();
	}, []);

	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	console.log("receiver_id in Hobbies : ");
	console.log(receiver_id);
	console.log("userHobbies : ");
	console.log(userHobbies);
	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

	//----------------------------------------------------------------
	// GET Hobbies API
	useEffect(() => {
		// دریافت داده‌ها از سرور
		axios
			.get("http://localhost:5000/hobbies")
			.then((response) => {
				setHobbies(response.data);
			})
			.catch((error) => {
				console.error("Error fetching hobbies:", error);
			});
	}, []);
	//----------------------------------------------------------------

	const toggleHobbies = (hobby) => {
		if (userHobbies.some((uh) => uh.hobby_id === hobby.id)) {
			setUserHobbies(
				userHobbies.filter((uh) => uh.hobby_id !== hobby.id)
			);
		} else {
			setUserHobbies([
				...userHobbies,
				{ hobby_id: hobby.id, hobby: hobby.hobby }, // Ensure the new object has the correct structure
			]);
		}
	};
	//----------------------------------------------------------------

	//--------------------------------------------------------------------------
	//         Update  user hobbies
	const updateUserHobbies = async () => {
		try {
			const response = await axios.post(
				"http://localhost:5000/update-user-hobbies",
				{
					user_Id: receiver_id,
					userHobbies,
				}
			);

			if (response.status === 200) {
				alert("User hobbies updated successfully!");
			}
		} catch (error) {
			console.error("Error updating user hobbies:", error);
			alert("Error updating user hobbies.");
		}
	};

	//--------------------------------------------------------------

	const handleBtnSaveHobbies = () => {
		if (isEditingHobbies) {
			updateUserHobbies(); // زمانی که کاربر در حال ویرایش است و "Save" را کلیک می‌کند، ذخیره انجام می‌شود
		}
		setIsEditingHobbies(!isEditingHobbies); // تغییر وضعیت ویرایش
	};

	//**************************************************************************** */
	//                             End hobbies				    				   //
	//############################################################################ */

	return (
		<div className="main_box_Hobbies">
			{/* ------------------------------------------------------------------- */}
			{/*                      box-Hobbies                                    */}
			{/* ------------------------------------------------------------------- */}
			<div className="box-Hobbies">
				<h2>Hobbies</h2>
				<ul className="ul_Hobbies">
					{userHobbies
						? userHobbies.map((hobby) => (
								<li className="li" key={hobby.hobby_id}>
									{hobby.hobby}
								</li>
						  ))
						: null}
				</ul>
				{user_id === receiver_id ? (
					<button onClick={handleBtnSaveHobbies}>
						{isEditingHobbies ? "Save" : "Edit"}
					</button>
				) : null}

				{isEditingHobbies && (
					<div className="hobbies-list">
						{hobbies.map((hobby) => (
							<button
								key={hobby.id}
								className={`hobby-button ${
									userHobbies.some(
										(uh) => uh.hobby_id === hobby.id
									)
										? "selected"
										: "unselected"
								}`}
								onClick={() => toggleHobbies(hobby)}
							>
								{hobby.hobby}
							</button>
						))}
					</div>
				)}
			</div>
			{/* ------------------------------------------------------------------- */}
		</div>
	);
}

export default Hobbies;
