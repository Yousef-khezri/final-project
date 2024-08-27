import React, { useState } from "react";
import Axios from "axios";
import "./PhotoUploadPopup.css";

function PhotoUploadPopup({ showPopup, closePopup, setPhotos }) {
	const [file, setFile] = useState(null);
	const [userId] = useState(1); // فرض می‌کنیم user_id = 1 است

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	const handleUploadPhoto = () => {
		const formData = new FormData();
		formData.append("image", file);
		formData.append("user_id", userId);

		Axios.post("http://localhost:5000/upload-photos", formData)
			.then((res) => {
				console.log(res.data.message);

				// مقدار تصادفی برای id یا هر مقدار دیگر
				const randomId = Math.floor(1000 + Math.random() * 9000);
				const imageUrl = res.data.photo_url ? res.data.photo_url : null;

				// بررسی اگر imageUrl برابر null نباشد
				if (imageUrl !== null) {
					const newPhoto = {
						id: randomId,
						photo_url: imageUrl, // مسیر عکس جدید
						user_id: userId,
					};

					// اضافه کردن عکس جدید به آرایه photos
					setPhotos((prevPhotos) => [...prevPhotos, newPhoto]);
				}
			})
			.catch((err) => {
				console.error(err);
			});

		setFile(null);
	};

	if (!showPopup) return null; // اگر پاپ‌آپ فعال نباشد، چیزی نمایش داده نشود

	return (
		<div className="popup-overlay" onClick={closePopup}>
			<div className="popup-content" onClick={(e) => e.stopPropagation()}>
				<button className="close-button" onClick={closePopup}>
					&times;
				</button>
				<input type="file" onChange={handleFileChange} />
				{file && (
					<img
						src={URL.createObjectURL(file)}
						alt="Selected"
						className="preview-image"
					/>
				)}
				<button className="save-button" onClick={handleUploadPhoto}>
					Save
				</button>
			</div>
		</div>
	);
}

export default PhotoUploadPopup;
