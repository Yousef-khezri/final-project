import React, { useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Photos.css";

function Photos({ photos, setPhotos }) {
	const [user_id] = useState(1);
	const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
	const [photpUrl, setPhotoUrl] = useState(null);

	/*
	const photos = [
	{id: 1, photo_url: '1724267803525.jpeg', user_id: 1},
	{id: 2, photo_url: '1724275255179.jpeg', user_id: 1},
	{id: 3, photo_url: '1724275389003.jpeg', user_id: 1}, 
	{id: 4, photo_url: '1724275444616.jpeg', user_id: 1},
	{id: 7, photo_url: '1724323394692.jpeg', user_id: 1}
	];

	const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
	*/

	const openPopup = (index) => {
		setSelectedPhotoIndex(index);
		setPhotoUrl(photos[index].photo_url);

		console.log(`index: ${index}`);
		// console.log(`photp_url: ${photos[index].photo_url}`);
		console.log(...photos);
	};

	const closePopup = () => {
		setSelectedPhotoIndex(null);
	};

	const deletePhoto = async () => {
		try {
			const response = await axios.delete(
				"http://localhost:5000/delete-photo",
				{
					data: {
						user_id: user_id,
						photo_url: photpUrl,
					},
				}
			);

			if (response.status === 200) {
				// delete photo in photos
				const newPhotos = photos.filter(
					(_, i) => i !== selectedPhotoIndex
				);
				setPhotos(newPhotos);

				alert("Photo deleted successfully.");
			}
		} catch (error) {
			console.error("Error deleting the photo:", error);
			alert("Failed to delete the photo.");
		}
		closePopup();
	};

	const nextPhoto = () => {
		setSelectedPhotoIndex((prevIndex) =>
			prevIndex < photos.length - 1 ? prevIndex + 1 : 0
		);
	};

	const prevPhoto = () => {
		setSelectedPhotoIndex((prevIndex) =>
			prevIndex > 0 ? prevIndex - 1 : photos.length - 1
		);
	};

	const settings = {
		dots: true,
		infinite: photos.length > 4,
		speed: 500,
		slidesToShow: Math.min(photos.length, 4),
		slidesToScroll: 1,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
	};

	return (
		<div className="photo-gallery">
			<h2>Photo Gallery</h2>
			<Slider {...settings}>
				{photos ? photos.map((photo, index) => (
					<div
						key={photo.id}
						className="photo-item"
						onClick={() => openPopup(index)}
					>
						<img
							className="item-img"
							src={`http://localhost:5000/images/${photo.photo_url}`}
							alt={photo.alt}
						/>
					</div>
				)): null}
			</Slider>

			{selectedPhotoIndex !== null && (
				<div className="popup-overlay-photo" onClick={closePopup}>
					<div
						className="popup-content-photo"
						onClick={(e) => e.stopPropagation()}
					>
						<button className="close-button" onClick={closePopup}>
							&times;
						</button>
						<button
							className="nav-button prev-button"
							onClick={prevPhoto}
						>
							&#8249;
						</button>
						<img
							src={`http://localhost:5000/images/${photos[selectedPhotoIndex].photo_url}`}
							alt={photos[selectedPhotoIndex].photo_url}
							className="img_photo"
						/>
						<button
							className="nav-button next-button"
							onClick={nextPhoto}
						>
							&#8250;
						</button>
						<button className="delete-button" onClick={deletePhoto}>
							Delete
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

function NextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={`${className} custom-arrow next-arrow`}
			onClick={onClick}
		/>
	);
}

function PrevArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={`${className} custom-arrow prev-arrow`}
			onClick={onClick}
		/>
	);
}

export default Photos;
