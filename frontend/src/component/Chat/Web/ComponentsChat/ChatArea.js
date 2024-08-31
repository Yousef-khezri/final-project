import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ChatArea.css";

const ChatArea = ({
	currentUser,
	receiver_id,
	// usernameFriend,
	// pictureProfileFriend,
}) => {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [friendInfo, setFriendInfo] = useState(null);
	const chatEndRef = useRef(null);

	const navigate = useNavigate();

	// console.log(currentUser);
	const [senderId] = useState(currentUser.user_id);
	// const [senderId] = useState(1);

	useEffect(() => {
		// console.log("receiver_id ====> " + receiver_id);
		// If the chat section is selected directly, receiver_id = 0
		if (receiver_id !== 0) {
			// بارگذاری پیام‌های قدیمی
			fetchMessages();

			// تایمر برای دریافت پیام‌ها هر 10 ثانیه
			const interval = setInterval(() => {
				fetchMessages();
			}, 10000);

			return () => {
				clearInterval(interval); // پاکسازی تایمر هنگام خروج از کامپوننت
			};
		}
	}, [receiver_id]);

	const fetchMessages = async () => {
		// اگر receiverId وجود ندارد، چت را بارگذاری نکنید
		if (receiver_id == null || receiver_id == 0) return;

		try {
			const response = await axios.get("http://localhost:5000/messages", {
				params: {
					sender_id: senderId,
					receiver_id: receiver_id,
				},
			});

			const formattedMessages = response.data.map((msg) => ({
				type: msg.sender_id === senderId ? "sent" : "received",
				receiver_id: msg.receiver_id,
				sender_id: msg.sender_id,
				sent_at: msg.sent_at,
				content: msg.content,
				isFile: false,
			}));
			setMessages(formattedMessages);
		} catch (error) {
			console.error("Error fetching messages:", error);
		}
	};

	const handleSendMessage = async () => {
		if (newMessage.trim() === "") {
			return;
		}

		try {
			// ارسال پیام به سرور از طریق HTTP
			await axios.post("http://localhost:5000/messages", {
				sender_id: senderId,
				receiver_id: receiver_id,
				content: newMessage,
			});

			// اضافه کردن پیام به صورت محلی به لیست پیام‌ها
			const newSentMessage = {
				type: "sent",
				receiver_id: receiver_id,
				sender_id: senderId,
				sent_at: new Date().toISOString(), // ذخیره تاریخ و زمان سیستم
				content: newMessage,
				isFile: false,
			};

			setMessages((prevMessages) => [...prevMessages, newSentMessage]);

			setNewMessage(""); // پاک کردن فیلد ورودی بعد از ارسال پیام
		} catch (error) {
			console.error("Error sending message:", error);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			handleSendMessage();
		}
	};

	const scrollToBottom = () => {
		chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleNavigateToProfile = () => {
		navigate("/user-profile"); // تغییر مسیر به /user-profile
	};

	//----------------------------------------------------------------
	//           Get friend information
	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				const response = await axios.post(
					"http://localhost:5000/get-user-info",
					{ user_id: receiver_id }
				);

				if (response.status === 200) {
					// console.log(response.data);
					setFriendInfo(response.data);
				}
			} catch (err) {
				// setError("Error fetching user info");
				console.error(err);
			}
		};

		if (receiver_id !== 0) {
			// شرط برای ارسال نشدن درخواست در صورت صفر بودن receiver_id
			fetchUserInfo();
		}
	}, [receiver_id]);
	//----------------------------------------------------------------

	return (
		<div className="chat-area">
			<div className="chat-header">
				{/* usernameFriend, pictureProfileFriend */}
				<img
					className="img-profile-friend"
					src={
						friendInfo
							? `http://localhost:5000${friendInfo.profile_picture_url}`
							: "./images/user.png"
					}
					alt="profile"
				/>
				<span
					className="span-user-profile"
					onClick={handleNavigateToProfile}
				>
					{friendInfo  ?
					 	(friendInfo.first_name && friendInfo.last_name
						? `${friendInfo.first_name} ${friendInfo.last_name}`
						: friendInfo.username)
					: null}
				</span>
			</div>
			<div className="chat-body">
				{messages.map((msg, index) => (
					<div key={index} className={`message ${msg.type}`}>
						{msg.isFile ? (
							<span className="file">{msg.content}</span>
						) : (
							msg.content
						)}
					</div>
				))}
				<div ref={chatEndRef} />
			</div>
			<div
				className="chat-input"
				style={{
					pointerEvents: receiver_id === 0 ? "none" : "auto",
					opacity: receiver_id === 0 ? 0.5 : 1,
				}}
			>
				<input
					type="text"
					placeholder="Write Something"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
				<img
					className="attach-img"
					src="./images/attach-button.png"
					alt="attach"
				/>
				<img
					className="smile-img"
					src="./images/smile.png"
					alt="smile"
				/>
				<img
					className="send-img"
					src="./images/send.png"
					alt="send"
					onClick={handleSendMessage}
				/>
			</div>
		</div>
	);
};

export default ChatArea;
