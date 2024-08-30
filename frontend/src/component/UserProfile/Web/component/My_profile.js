import React, { useState, useEffect } from "react";
import axios from "axios";
import "./My_profile.css";

function My_profile({
	user_id,
	receiver_id,
	profileToDisplay,
	setProfileToDisplay,
	// setCurrentUserProfile,
	handleAvatarClick,
}) {

	const [editing, setEditing] = useState(false);
	const [editedProfile, setEditedProfile] = useState({
		...profileToDisplay,
	});

	const handleChange = (e) => {
		const { name, value, selectedIndex } = e.target;

		// پیدا کردن متن انتخاب شده از آرایه `options`
		const selectedText = e.target.options[selectedIndex].text;

		setEditedProfile((prevProfile) => ({
			...prevProfile,
			[name]: value,
			[`${name.split("_id")[0]}`]: selectedText, // حذف `_id` برای یافتن کلید وضعیت
		}));
	};

	//----------------------------------------------------------------
	//     handleSubmit  for insert or update profile
	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log("editedProfile");
		console.log(editedProfile);

		try {
			const response = await axios.post(
				"http://localhost:5000/insert-update-Profile",
				{
					user_id : receiver_id,
					...editedProfile,
					birthdate: new Date(editedProfile.birthdate)
						.toISOString()
						.split("T")[0], // Format date to YYYY-MM-DD
				}
			);

			if (response.data.message) {
				console.log(response.data.message);
				setProfileToDisplay(editedProfile); // Update the profile state with the new data
				setEditing(false);
			}
		} catch (error) {
			console.error("There was an error updating the profile:", error);
		}
	};
	//----------------------------------------------------------------

	const openEditPopup = () => setEditing(true);
	const closeEditPopup = () => setEditing(false);

	//testing ************
	// useEffect(() => {
	// 	console.log(editedProfile);
	// }, [editedProfile]);
	/*################################################################*/
	//             SELECT * FROM relationship_types
	const [relationshipTypes, setRelationshipTypes] = useState([]);

	useEffect(() => {
		// دریافت داده‌ها از سرور
		axios
			.get("http://localhost:5000/relationship-types")
			.then((response) => {
				setRelationshipTypes(response.data);
			})
			.catch((error) => {
				console.error("Error fetching relationship types:", error);
			});
	}, []);
	/*################################################################*/

	/*################################################################*/
	//             SELECT * FROM children_statuses
	const [childrenStatuses, setChildrenStatuses] = useState([]);

	useEffect(() => {
		// دریافت داده‌ها از سرور
		axios
			.get("http://localhost:5000/children-statuses")
			.then((response) => {
				setChildrenStatuses(response.data);
			})
			.catch((error) => {
				console.error("Error fetching relationship types:", error);
			});
	}, []);
	/*################################################################*/

	/*################################################################*/
	//             SELECT * FROM marital_statuses
	const [maritalStatuses, setMaritalStatuses] = useState([]);

	useEffect(() => {
		// دریافت داده‌ها از سرور
		axios
			.get("http://localhost:5000/marital-statuses")
			.then((response) => {
				setMaritalStatuses(response.data);
			})
			.catch((error) => {
				console.error("Error fetching marital statuses:", error);
			});
	}, []);
	/*################################################################*/

	/*################################################################*/
	//             SELECT * FROM educations
	const [educations, setEducations] = useState([]);

	useEffect(() => {
		// دریافت داده‌ها از سرور
		axios
			.get("http://localhost:5000/educations")
			.then((response) => {
				setEducations(response.data);
			})
			.catch((error) => {
				console.error("Error fetching educations:", error);
			});
	}, []);
	/*################################################################*/

	/*################################################################*/
	//             SELECT * FROM occupations
	const [occupations, setOccupations] = useState([]);

	useEffect(() => {
		// دریافت داده‌ها از سرور
		axios
			.get("http://localhost:5000/occupations")
			.then((response) => {
				setOccupations(response.data);
			})
			.catch((error) => {
				console.error("Error fetching occupations:", error);
			});
	}, []);
	/*################################################################*/

	/*################################################################*/
	//             SELECT * FROM smoking_statuses
	const [smokingStatuses, setSmokingStatuses] = useState([]);

	useEffect(() => {
		// دریافت داده‌ها از سرور
		axios
			.get("http://localhost:5000/smoking-statuses")
			.then((response) => {
				setSmokingStatuses(response.data);
			})
			.catch((error) => {
				console.error("Error fetching smoking statuses:", error);
			});
	}, []);
	/*################################################################*/

	/*################################################################*/
	//             SELECT * FROM drinking_statuses
	const [drinkingStatuses, setDrinkingStatuses] = useState([]);

	useEffect(() => {
		// دریافت داده‌ها از سرور
		axios
			.get("http://localhost:5000/drinking-statuses")
			.then((response) => {
				setDrinkingStatuses(response.data);
			})
			.catch((error) => {
				console.error("Error fetching drinking statuses:", error);
			});
	}, []);
	/*################################################################*/

	/*################################################################*/
	//             SELECT * FROM religions
	const [religions, setReligions] = useState([]);

	useEffect(() => {
		// دریافت داده‌ها از سرور
		axios
			.get("http://localhost:5000/religions")
			.then((response) => {
				setReligions(response.data);
			})
			.catch((error) => {
				console.error("Error fetching religions:", error);
			});
	}, []);
	/*################################################################*/

	/*################################################################*/
	//             SELECT * FROM lifestyles
	const [lifestyles, setLifestyles] = useState([]);

	useEffect(() => {
		// دریافت داده‌ها از سرور
		axios
			.get("http://localhost:5000/lifestyles")
			.then((response) => {
				setLifestyles(response.data);
			})
			.catch((error) => {
				console.error("Error fetching lifestyles:", error);
			});
	}, []);
	/*################################################################*/

	/*################################################################*/
	//             SELECT * FROM languages
	const [languages, setLanguages] = useState([]);

	useEffect(() => {
		// دریافت داده‌ها از سرور
		axios
			.get("http://localhost:5000/languages")
			.then((response) => {
				setLanguages(response.data);
			})
			.catch((error) => {
				console.error("Error fetching languages:", error);
			});
	}, []);
	/*################################################################*/

	/*################################################################*/
	//             SELECT * FROM pet-ownerships
	const [petOwnerships, setPetOwnerships] = useState([]);

	useEffect(() => {
		// دریافت داده‌ها از سرور
		axios
			.get("http://localhost:5000/pet-ownerships")
			.then((response) => {
				setPetOwnerships(response.data);
			})
			.catch((error) => {
				console.error("Error fetching pet ownerships:", error);
			});
	}, []);
	/*################################################################*/

	return (
		<div className="form_myprofile">
			{editing ? (
				<div className="popup-overlay">
					<div className="popup-content">
						<form onSubmit={handleSubmit}>
							<h2>Edit Profile</h2>
							<div className="profile-data-edit">
								{/* -------------------------------------------------  */}
								{/*                First Name                          */}
								<div className="data-item">
									<label>First Name:</label>
									<input
										type="text"
										name="first_name"
										value={editedProfile.first_name}
										onChange={handleChange}
									/>
								</div>
								{/* -------------------------------------------------  */}
								{/*                Last Name                           */}
								<div className="data-item">
									<label>Last Name:</label>
									<input
										type="text"
										name="last_name"
										value={editedProfile.last_name}
										onChange={handleChange}
									/>
								</div>
								{/* -------------------------------------------------  */}
								{/*                  Gender                            */}
								<div className="data-item">
									<label>Gender:</label>
									<select
										name="gender"
										value={editedProfile.gender || ""}
										onChange={handleChange}
									>
										<option value="">Select Gender</option>
										<option value="female">Female</option>
										<option value="male">Male</option>
										<option value="non-binary">
											Non-binary
										</option>
										<option value="prefer-not-to-say">
											Prefer not to say
										</option>
										<option value="other">Other</option>
									</select>
								</div>
								{/* -------------------------------------------------  */}
								{/*                 Birthdate                          */}
								<div className="data-item">
									<label>Birthdate:</label>
									<input
										type="date"
										name="birthdate"
										value={
											new Date(editedProfile.birthdate)
												.toISOString()
												.split("T")[0]
										}
										onChange={handleChange}
									/>
								</div>
								{/* -------------------------------------------------  */}
								{/*                  Location                          */}
								<div className="data-item">
									<label>Location:</label>
									<input
										type="text"
										name="city"
										value={editedProfile.city}
										onChange={handleChange}
									/>
								</div>
								{/* -------------------------------------------------  */}
								<div className="data-item">
									<label>Relationship Type:</label>
									<select
										name="relationship_type_id"
										defaultValue={
											editedProfile.relationship_type_id ||
											""
										}
										onChange={handleChange}
									>
										{/* اگر مقدار editedProfile.relationship_type خالی است، گزینه پیش‌فرض را نمایش می‌دهد */}
										<option
											value=""
											disabled={
												!!editedProfile.relationship_type
											}
										>
											Select Relationship Type
										</option>
										{relationshipTypes.map((type) => (
											<option
												key={type.id}
												value={type.id}
											>
												{type.relationship_type}
											</option>
										))}
									</select>
								</div>
								{/* -------------------------------------------------  */}
								<div className="data-item">
									<label>Children Status:</label>
									<select
										name="children_status_id"
										defaultValue={
											editedProfile.children_status_id ||
											""
										}
										onChange={handleChange}
									>
										<option
											value=""
											disabled={
												!!editedProfile.children_status
											}
										>
											Select Relationship Type
										</option>
										{childrenStatuses.map((type) => (
											<option
												key={type.id}
												value={type.id}
											>
												{type.children_status}
											</option>
										))}
									</select>
								</div>
								{/* -------------------------------------------------  */}
								<div className="data-item">
									<label>Marital Status:</label>
									<select
										name="marital_status_id"
										defaultValue={
											editedProfile.marital_status_id ||
											""
										}
										onChange={handleChange}
									>
										<option
											value=""
											disabled={
												!!editedProfile.marital_status
											}
										>
											Select Marital Status
										</option>
										{maritalStatuses.map((type) => (
											<option
												key={type.id}
												value={type.id}
											>
												{type.marital_status}
											</option>
										))}
									</select>
								</div>
								{/* -------------------------------------------------  */}
								<div className="data-item">
									<label>Education:</label>
									<select
										name="education_id"
										defaultValue={
											editedProfile.education_id || ""
										}
										onChange={handleChange}
									>
										<option
											value=""
											disabled={!!editedProfile.education}
										>
											Select educations
										</option>
										{educations.map((type) => (
											<option
												key={type.id}
												value={type.id}
											>
												{type.education}
											</option>
										))}
									</select>
								</div>
								{/* -------------------------------------------------  */}
								<div className="data-item">
									<label>Occupation:</label>
									<select
										name="occupation_id"
										defaultValue={
											editedProfile.occupation_id || ""
										}
										onChange={handleChange}
									>
										<option
											value=""
											disabled={
												!!editedProfile.occupation
											}
										>
											Select occupation
										</option>
										{occupations.map((type) => (
											<option
												key={type.id}
												value={type.id}
											>
												{type.occupation}
											</option>
										))}
									</select>
								</div>
								{/* -------------------------------------------------  */}
								<div className="data-item">
									<label>Smoking Status:</label>
									<select
										name="smoking_status_id"
										defaultValue={
											editedProfile.smoking_status_id ||
											""
										}
										onChange={handleChange}
									>
										<option
											value=""
											disabled={
												!!editedProfile.smoking_status
											}
										>
											Select smoking status
										</option>
										{smokingStatuses.map((type) => (
											<option
												key={type.id}
												value={type.id}
											>
												{type.smoking_status}
											</option>
										))}
									</select>
								</div>
								{/* -------------------------------------------------  */}
								<div className="data-item">
									<label>Drinking Status:</label>
									<select
										name="drinking_status_id"
										defaultValue={
											editedProfile.drinking_status_id ||
											""
										}
										onChange={handleChange}
									>
										<option
											value=""
											disabled={
												!!editedProfile.drinking_status
											}
										>
											Select drinking status
										</option>
										{drinkingStatuses.map((type) => (
											<option
												key={type.id}
												value={type.id}
											>
												{type.drinking_status}
											</option>
										))}
									</select>
								</div>
								{/* -------------------------------------------------  */}
								{/*                Height (cm)                         */}
								<div className="data-item">
									<label>Height (cm):</label>
									<input
										type="number"
										name="height_cm"
										value={editedProfile.height_cm}
										onChange={handleChange}
									/>
								</div>
								{/* -------------------------------------------------  */}
								{/*                Weight (kg)                         */}
								<div className="data-item">
									<label>Weight (kg):</label>
									<input
										type="number"
										name="weight_kg"
										value={editedProfile.weight_kg}
										onChange={handleChange}
									/>
								</div>
								{/* -------------------------------------------------  */}
								<div className="data-item">
									<label>Religion:</label>
									<select
										name="religion_id"
										defaultValue={
											editedProfile.religion_id || ""
										}
										onChange={handleChange}
									>
										<option
											value=""
											disabled={!!editedProfile.religion}
										>
											Select religion
										</option>
										{religions.map((type) => (
											<option
												key={type.id}
												value={type.id}
											>
												{type.religion}
											</option>
										))}
									</select>
								</div>
								{/* -------------------------------------------------  */}
								<div className="data-item">
									<label>Lifestyle:</label>
									<select
										name="lifestyle_id"
										defaultValue={
											editedProfile.lifestyle_id || ""
										}
										onChange={handleChange}
									>
										<option
											value=""
											disabled={!!editedProfile.lifestyle}
										>
											Select lifestyle
										</option>
										{lifestyles.map((type) => (
											<option
												key={type.id}
												value={type.id}
											>
												{type.lifestyle}
											</option>
										))}
									</select>
								</div>
								{/* -------------------------------------------------  */}
								<div className="data-item">
									<label>Language:</label>
									<select
										name="language_id"
										defaultValue={
											editedProfile.language_id || ""
										}
										onChange={handleChange}
									>
										<option
											value=""
											disabled={!!editedProfile.language}
										>
											Select language
										</option>
										{languages.map((type) => (
											<option
												key={type.id}
												value={type.id}
											>
												{type.language}
											</option>
										))}
									</select>
								</div>
								{/* -------------------------------------------------  */}
								<div className="data-item">
									<label>Pet Ownership:</label>
									<select
										name="pet_ownership_id"
										defaultValue={
											editedProfile.pet_ownership_id || ""
										}
										onChange={handleChange}
									>
										<option
											value=""
											disabled={
												!!editedProfile.pet_ownership
											}
										>
											Select pet ownerships
										</option>
										{petOwnerships.map((type) => (
											<option
												key={type.id}
												value={type.id}
											>
												{type.pet_ownership}
											</option>
										))}
									</select>
								</div>
								{/* -------------------------------------------------  */}
								{/*             space design                           */}
								<div className="data-item"></div>
								{/* -------------------------------------------------  */}
								{/*             Profile Picture                        */}
								<div className="data-item">
									<label>Profile Picture:</label>
									<button
										className="btn_chose_profile"
										type="submit"
										name="profile_picture_url"
										onClick={handleAvatarClick}
									>
										Choose...
									</button>
								</div>
								{/* -------------------------------------------------  */}
							</div>
							<button type="submit">Save</button>
							<button
								className="btn_cancel"
								type="button"
								onClick={closeEditPopup}
							>
								Cancel
							</button>
						</form>
					</div>
				</div>
			) : (
				<div>
					<div className="info-profile">
						<p>First Name : {profileToDisplay.first_name}</p>
						<p>Last Name : {profileToDisplay.last_name}</p>
						<p>Gender : {profileToDisplay.gender}</p>
						<p>
							Age :{" "}
							{new Date().getFullYear() -
								new Date(
									profileToDisplay.birthdate
								).getFullYear()}
						</p>
						<p>Location : {profileToDisplay.location}</p>
						<p>
							Relationship Type :{" "}
							{profileToDisplay.relationship_type}
						</p>
						<p>
							Children Status : {profileToDisplay.children_status}
						</p>
						<p>
							Marital Status : {profileToDisplay.marital_status}
						</p>
						<p>Education : {profileToDisplay.education}</p>
						<p>Occupation : {profileToDisplay.occupation}</p>
						<p>
							Smoking Status : {profileToDisplay.smoking_status}
						</p>
						<p>
							Drinking Status : {profileToDisplay.drinking_status}
						</p>
						<p>Height (cm) : {profileToDisplay.height_cm}</p>
						<p>Weight (kg) : {profileToDisplay.weight_kg}</p>
						<p>Religion : {profileToDisplay.religion}</p>
						<p>Lifestyle : {profileToDisplay.lifestyle}</p>
						<p>Language : {profileToDisplay.language}</p>
						<p>Pet Ownership : {profileToDisplay.pet_ownership}</p>
					</div>
					{user_id === receiver_id ? (
						<button
							className="btn-edit-profile"
							onClick={openEditPopup}
						>
							Edit Profile
						</button>
					) : null}
				</div>
			)}
		</div>
	);
}

export default My_profile;
