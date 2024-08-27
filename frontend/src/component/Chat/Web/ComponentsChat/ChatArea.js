import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./ChatArea.css";

const ChatArea = ({ receiverId, usernameFriend, pictureProfileFriend }) => {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const chatEndRef = useRef(null);

	const senderId = 1; // شناسه فرستنده (باید از session یا context گرفته شود)

	useEffect(() => {
		// بارگذاری پیام‌های قدیمی
		fetchMessages();

		// تایمر برای دریافت پیام‌ها هر 10 ثانیه
		const interval = setInterval(() => {
			fetchMessages();
		}, 10000);

		return () => {
			clearInterval(interval); // پاکسازی تایمر هنگام خروج از کامپوننت
		};
	}, [receiverId]);

	const fetchMessages = async () => {
		if (receiverId == null) return; // اگر receiverId وجود ندارد، چت را بارگذاری نکنید

		try {
			const response = await axios.get("http://localhost:5000/messages", {
				params: {
					sender_id: senderId,
					receiver_id: receiverId,
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
				receiver_id: receiverId,
				content: newMessage,
			});

			// اضافه کردن پیام به صورت محلی به لیست پیام‌ها
			const newSentMessage = {
				type: "sent",
				receiver_id: receiverId,
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

	return (
		<div className="chat-area">
			<div className="chat-header">
				{/* usernameFriend, pictureProfileFriend */}
				<img
					className="img-profile-friend"
					src={
						pictureProfileFriend
							? `http://localhost:5000${pictureProfileFriend}`
							: "./images/user.png"
					}
					alt="profile"
				/>
				<span>{usernameFriend ? `${usernameFriend}` : null}</span>
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
			<div className="chat-input">
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
