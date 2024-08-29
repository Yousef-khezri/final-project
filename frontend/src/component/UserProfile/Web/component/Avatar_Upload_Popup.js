import React, { useState } from "react";
import axios from "axios";
import "./Avatar_Upload_Popup.css";

/*
const [currentUser, setCurrentUser] = useState( {currentUser : {
	currentUser : {
		user_id:1,
		profile_picture_url: "/image/test.png"
	}
}});
*/

function Avatar_Upload_Popup({
	currentUser,
	setCurrentUser,
	// currentUserProfile,
	// setCurrentUserProfile,
	showPopup,
	closePopup,
}) {
	const [file, setFile] = useState(null);

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	const handleUpload = () => {
		handleDeletePhoto();

		const formData = new FormData();
		formData.append("image", file);
		formData.append("user_id", currentUser.user_id);

		// profile.profile_picture_url = `/uploads/profile_pictures/${file.name}`;

		// console.log(`newPhotoUrl ${currentUserProfile.profile_picture_url}`);
		// console.log(file.name);

		axios
			.post("http://localhost:5000/upload-profile", formData)
			.then((res) => {
				console.log(res.data.message);

				const imageUrl = res.data.profilePictureUrl
					? res.data.profilePictureUrl
					: null;

				console.log(res.data.profilePictureUrl);
				// بررسی اگر imageUrl برابر null نباشد
				if (imageUrl !== null) {
					const newPhotoUrl = `${imageUrl}`;

					setCurrentUser((prevProfile) => ({
						...prevProfile, // نگه داشتن بقیه ویژگی‌های آبجکت
						profile_picture_url: newPhotoUrl, // تغییر مقدار photo_url
					}));
					console.log(currentUser);
				}
			})
			.catch((err) => {
				console.error(err);
			});

		setFile(null);
		// window.location.reload();
	};

	if (!showPopup) return null; // اگر پاپ‌آپ فعال نباشد، چیزی نمایش داده نشود

	// Delete Photo of backend
	const handleDeletePhoto = async () => {
		try {
			const response = await axios.post(
				"http://localhost:5000/delete-picture",
				{
					profile_picture_url: currentUser.profile_picture_url,
				}
			);
			console.log(response.data.message);
		} catch (err) {
			console.error(
				err.response ? err.response.data.message : err.message
			);
		}
	};

	return (
		<div className="popup-overlay-profile" onClick={closePopup}>
			<div
				className="popup-content-profile"
				onClick={(e) => e.stopPropagation()}
			>
				<button className="close-button" onClick={closePopup}>
					&times;
				</button>
				<input type="file" onChange={handleFileChange} />
				{file && (
					<img
						src={URL.createObjectURL(file)}
						alt="Selected"
						className="preview-image-profile"
					/>
				)}
				<button className="save-button" onClick={handleUpload}>
					Save
				</button>
			</div>
		</div>
	);
}

export default Avatar_Upload_Popup;
