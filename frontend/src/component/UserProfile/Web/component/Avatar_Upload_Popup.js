import React, { useState } from "react";
import axios from "axios";
import "./Avatar_Upload_Popup.css";

function Avatar_Upload_Popup({
	currentUserProfile,
	setCurrentUserProfile,
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
		formData.append("user_id", currentUserProfile.user_id);

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

					setCurrentUserProfile((prevProfile) => ({
						...prevProfile, // نگه داشتن بقیه ویژگی‌های آبجکت
						profile_picture_url: newPhotoUrl, // تغییر مقدار photo_url
					}));
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
					profile_picture_url: currentUserProfile.profile_picture_url,
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
