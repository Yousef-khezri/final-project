import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Interests.css";

function Interests({ user_id, receiver_id }) {
	const [userInterests, setUserInterests] = useState();
	const [interests, setInterests] = useState([]); // State برای ذخیره لیست علایق
	const [error, setError] = useState(null); // State برای مدیریت خطاها
	const [isEditing, setIsEditing] = useState(false);

	const [receiverId, setReceiverId] = useState(receiver_id);
	// const [userId, setUserId] = useState(receiver_id);

	//############################################################################ */
	//                            start interests								   //
	//**************************************************************************** */
	// get user-interests
	useEffect(() => {
		const fetchInterests = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5000/user-interests`,
					{
						params: { user_Id: receiverId },
						// ارسال پارامترها به‌عنوان query string
					}
				);
				setUserInterests(response.data);
			} catch (err) {
				setError(err.message); // مدیریت خطاها
			}
		};

		fetchInterests();
	}, [receiverId]);

	useEffect(() => {
		// دریافت داده‌ها از سرور
		axios
			.get("http://localhost:5000/interests")
			.then((response) => {
				setInterests(response.data);
			})
			.catch((error) => {
				console.error("Error fetching interests:", error);
			});
	}, []);

	//testers
	// useEffect(() => {
	// 	console.log(userInterests);
	// }, [userInterests]);

	const toggleInterest = (interest) => {
		if (userInterests.some((ui) => ui.interest_id === interest.id)) {
			setUserInterests(
				userInterests.filter((ui) => ui.interest_id !== interest.id)
			);
		} else {
			setUserInterests([
				...userInterests,
				{ interest_id: interest.id, name: interest.name }, // Ensure the new object has the correct structure
			]);
		}
	};

	//--------------------------------------------------------------------------
	//         Update  user interests
	const updateUserInterests = async () => {
		try {
			const response = await axios.post(
				"http://localhost:5000/update-user-interests",
				{
					user_Id: receiverId,
					userInterests,
				}
			);

			if (response.status === 200) {
				alert("User interests updated successfully!");
			}
		} catch (error) {
			console.error("Error updating user interests:", error);
			alert("Error updating user interests.");
		}
	};

	//---------------------------------------------------------------------------------
	const handleBtnSaveInterests = () => {
		if (isEditing) {
			updateUserInterests(); // زمانی که کاربر در حال ویرایش است و "Save" را کلیک می‌کند، ذخیره انجام می‌شود
		}
		setIsEditing(!isEditing); // تغییر وضعیت ویرایش
	};

	//**************************************************************************** */
	//                             End interests								   //
	//############################################################################ */

	return (
		<div className="main_box_Interests">
			{/* ------------------------------------------------------------------- */}
			{/*                     box-Interests                                   */}
			{/* ------------------------------------------------------------------- */}
			<div className="box-Interests">
				<h2>Interests</h2>
				<ul className="ul_Interests">
					{userInterests
						? userInterests.map((interest) => (
								<li className="li" key={interest.interest_id}>
									{interest.name}
								</li>
						  ))
						: null}
				</ul>
				{user_id === receiver_id ? (
					<button onClick={handleBtnSaveInterests}>
						{isEditing ? "Save" : "Edit"}
					</button>
				) : null}

				{isEditing && (
					<div className="interests-list">
						{interests.map((interest) => (
							<button
								key={interest.id}
								className={`interest-button ${
									userInterests.some(
										(ui) => ui.interest_id === interest.id
									)
										? "selected"
										: "unselected"
								}`}
								onClick={() => toggleInterest(interest)}
							>
								{interest.name}
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default Interests;
