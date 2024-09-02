// export function sum(a, b) {
// 	return a + b;
// }

/*
[
	{
		user_id: 1,
		first_name: "John",
		last_name: "Smith",
		gender: "Male",
		birthdate: null,
		location: null,
		profile_picture_url: "/uploads/profile_pictures/1724695445659.png",
		username: "John",
        status: "pending",
	},
];
*/

//*********************************************************************** */
//                checking for friend request
//--------------------------------------------------------------------------
import axios from "axios";

// تابع برای دریافت مسیر تصویر بر اساس وضعیت درخواست دوستی
export const getImageSrc = async (userId, receiverId) => {
	let status = "rejected"; // مقدار پیش‌فرض برای وضعیت

	// تابع برای بررسی وضعیت درخواست دوستی
	const checkFriendRequestStatus = async () => {
		try {
			const response = await axios.get(
				"http://localhost:5000/api/friend-request-status",
				{
					params: {
						sender_id: userId,
						receiver_id: receiverId,
					},
				}
			);
			return response.data.status;
		} catch (error) {
			console.error("Error fetching friend request status:", error);
			return "rejected"; // مقدار پیش‌فرض در صورت بروز خطا
		}
	};

	// صدا زدن تابع `checkFriendRequestStatus` و دریافت وضعیت
	status = await checkFriendRequestStatus();

	// برگشت مسیر تصویر بر اساس وضعیت
	switch (status) {
		case "accepted":
			return "./images/heart-accepted.png";
		case "pending":
			return "./images/heart-red.png";
		case "rejected":
		default:
			return "./images/heart.png";
	}
};

//------------------------------------------------------------------------------------

// تابع برای مدیریت کلیک روی درخواست دوستی
export const handleFriendRequestClick = async (
	currentUser_id,
	receiverId
) => {
	let newStatus;

	console.log("Current User_id in RequestClick");
	console.log(currentUser_id);
	console.log("Receiver Id in RequestClick");
	console.log(receiverId);

	try {
		const friendRequest = await fetchFriendRequestStatus(
			currentUser_id,
			receiverId
		);

		console.log("Friend Request in fetch");
		console.log(friendRequest);

		// اگر درخواست‌های دوستی موجود باشد
		if (Array.isArray(friendRequest) && friendRequest.length > 0) {
			// پیدا کردن درخواست دوستی مرتبط با user_id و receiver_id
			let existingRequest = friendRequest.find(
				(request) =>
					(request.sender_id === currentUser_id &&
						request.receiver_id === receiverId) ||
					(request.sender_id === receiverId &&
						request.receiver_id === currentUser_id)
			);

			let receiver_status_rejected = true;

			if (Array.isArray(friendRequest) && friendRequest.length > 1) {
				// پیدا کردن ایندکس آبجکت‌هایی که شرایط مشخص شده را دارند
				const index_obj_sender = friendRequest.findIndex(
					(request) =>
						request.sender_id === currentUser_id &&
						request.receiver_id === receiverId
				);

				const index_obj_receiver = friendRequest.findIndex(
					(request) =>
						request.sender_id === receiverId &&
						request.receiver_id === currentUser_id
				);

				if (friendRequest[index_obj_receiver].status !== "rejected") {
					receiver_status_rejected = false;
				}

				existingRequest = friendRequest[index_obj_sender];

				// console.log("index_obj_sender : " + index_obj_sender);
				// console.log("index_obj_receiver : " + index_obj_receiver);
				// console.log(
				// 	"receiver_status_rejected : " + receiver_status_rejected
				// );
			}

			// console.log(existingRequest);

			if (existingRequest) {
				if (existingRequest.sender_id === currentUser_id) {
					// درخواست از سمت user_id به receiver_id ارسال شده است
					if (
						existingRequest.status === "pending" &&
						receiver_status_rejected
					) {
						newStatus = "rejected"; // اگر وضعیت فعلی "pending" است و درخواست توسط user_id ارسال شده، باید رد شود
					} else if (existingRequest.status === "accepted") {
						newStatus = "rejected"; // اگر وضعیت فعلی "accepted" است، باید به "rejected" تغییر کند
					} else if (
						existingRequest.status === "rejected" &&
						receiver_status_rejected
					) {
						newStatus = "pending"; // اگر وضعیت فعلی "rejected" است، باید به "pending" برگردد
					} else {
						newStatus = "accepted"; // اگر وضعیت فعلی "rejected" است، باید به "pending" برگردد
					}
				} else if (existingRequest.sender_id === receiverId) {
					// درخواست از سمت receiver_id به user_id ارسال شده است
					if (existingRequest.status === "pending") {
						newStatus = "accepted"; // اگر وضعیت فعلی "pending" است و درخواست از سمت receiver_id به user_id ارسال شده، باید پذیرفته شود
					} else if (existingRequest.status === "rejected") {
						newStatus = "pending"; // اگر وضعیت فعلی "rejected" است، باید به "pending" برگردد
					} else if (existingRequest.status === "accepted") {
						newStatus = "rejected"; // اگر وضعیت فعلی "accepted" است، باید به "rejected" تغییر کند
					}
				}
			} else {
				// اگر هیچ درخواست مرتبطی پیدا نشد، وضعیت پیش‌فرض "pending" خواهد بود
				newStatus = "pending";
			}
		} else {
			// اگر هیچ درخواست دوستی موجود نباشد
			newStatus = "pending"; // وضعیت پیش‌فرض
		}

		// ارسال درخواست به سرور برای به‌روزرسانی وضعیت
		const response = await axios.post(
			"http://localhost:5000/update-friend-request-status",
			{
				sender_id: currentUser_id,
				receiver_id: receiverId,
				action: newStatus,
			}
		);

		console.log(response);
		// برگرداندن وضعیت جدید برای استفاده در کامپوننت اصلی
		return newStatus;
	} catch (error) {
		console.error("Error updating friend request status:", error);
		return null; // در صورت بروز خطا، مقدار null برگردانده شود
	}
};

//-------------------------------------------------------------------------------------
//          Get friend request status
const fetchFriendRequestStatus = async (currentUser_id, receiverId) => {
	let friendRequest;

	try {
		const response = await axios.get(
			`http://localhost:5000/friend-request-status`,
			{
				params: {
					sender_id: currentUser_id,
					receiver_id: receiverId,
				},
			}
		);

		const data = response.data; // دریافت داده‌ها از پاسخ

		console.log(data);

		if (data) {
			// بررسی اینکه داده‌ای موجود است
			friendRequest = data;
			return data;
		} else {
			friendRequest = { status: "rejected" }; // اگر هیچ داده‌ای موجود نبود
			return friendRequest;
		}
	} catch (error) {
		// console.error("Error fetching friend request status:", error);
		friendRequest = { status: "rejected" };
		return friendRequest;
	}

	// console.log("Friend Request in fetch");
	// console.log(friendRequest);
	// console.log("Current User_id in fetch");
	// console.log(currentUser_id);
	// console.log("Receiver Id in fetch");
	// console.log(receiverId);
	// currentUser_id,
	// receiverId,
	// friendRequest,
};

//--------------------------------------------------------------------------
//                ending friend request
//*********************************************************************** */
