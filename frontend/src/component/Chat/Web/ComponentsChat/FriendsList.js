import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FriendsList.css";

const FriendsList = ({ setReceiverId, setUsernameFriend, setPictureProfileFriend }) => {
	const [chatFriends, setChatFriends] = useState([]);
	const [userId] = useState(1); // شناسه کاربری که وارد شده است (برای مثال)

	//----------------------------------------------------------------
	/*const chatFriend = 
	{
		content: "test 2",
		id: 58,
		receiver_id: 1,
		receiver_profile_picture_url:
			"/uploads/profile_pictures/1724695445659.png",
		receiver_username: "joseph",
		sender_id: 3,
		sender_profile_picture_url:
			"/uploads/profile_pictures/1724695615948.png",
		sender_username: "test1",
		sent_at: "2024-08-26T12:14:53.000Z",
	 };
	 */

	//----------------------------------------------------------------

	useEffect(() => {
		// فراخوانی API با استفاده از axios
		axios
			.get(`http://localhost:5000/chat-friends/${userId}`)
			.then((response) => {
				setChatFriends(response.data);
			})
			.catch((error) => {
				console.error("Error fetching friends:", error);
			});
	}, [userId]);

	// testing ******************
	useEffect(() => {
		console.log("chatFriends:");
		console.log(...chatFriends);
	}, [chatFriends]);

	return (
		<div className="friends-list">
			<input
				type="text"
				placeholder="Search Friends"
				className="search-box"
			/>
			{chatFriends.map((chatFriend) => {
				// تعیین username پروفایل
				const usernameFriend =
					chatFriend.sender_id === userId
						? chatFriend.receiver_username
						: chatFriend.sender_username;

				// تعیین عکس پروفایل
				const profilePictureUrl =
					chatFriend.sender_id === userId
						? chatFriend.receiver_profile_picture_url
						: chatFriend.sender_profile_picture_url;

				// تعیین کلید منحصربفرد
				const uniqueKey =
					chatFriend.sender_id === userId
						? chatFriend.receiver_id
						: chatFriend.sender_id;

				// فرمت تاریخ و ساعت
				const formattedDate = new Date(
					chatFriend.sent_at
				).toLocaleString("en-US", {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
				});
				const formattedTime = new Date(
					chatFriend.sent_at
				).toLocaleString("en-US", {
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
				});

				return (
					<div
						className="friend"
						key={uniqueKey}
						onClick={() => {
							setReceiverId(uniqueKey);
							setUsernameFriend(usernameFriend);
							setPictureProfileFriend(profilePictureUrl);
						}}
					>
						<div className="friend-info">
							<img
								src={
									`http://localhost:5000${profilePictureUrl}` ||
									"./images/user.png"
								}
								alt="Profile"
							/>
							<div className="span_usernameFriend">
								{usernameFriend}
							</div>
						</div>
						<div className="box_Date_Time">
							<div className="time">{formattedTime}</div>
							<div className="time">{formattedDate}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default FriendsList;
