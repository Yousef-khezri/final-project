const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const multer = require("multer");
const path = require("path");
const fs = require("fs");
// const http = require("http");
// const socketIO = require("socket.io");

const app = express();
const PORT = 5000;
require("dotenv").config();


app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); // برای parse کردن بدنه درخواست های JSON

// سرویس‌دهی فایل‌های استاتیک (برای پروژه React)
app.use(express.static("public"));
// سرو کردن فایل‌های استاتیک از پوشه "images"
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(
  "/uploads/profile_pictures",
  express.static(path.join(__dirname, "uploads/profile_pictures"))
);
//--------------- Realtime Message -----------------------------------------
// const server = http.createServer(app);

// const io = socketIO(server, {
// 	cors: {
// 		origin: "http://localhost:3000", // آدرس کلاینت
// 		methods: ["GET", "POST"],
// 		allowedHeaders: ["my-custom-header"],
// 		credentials: true,
// 	},
// });

//----------------------------------------------------------------
// const server = http.createServer(app);
// const io = socketIo(server);
// const io = socketIo(server, {
// 	cors: {
// 		origin: "*", // آدرس کلاینت
// 		methods: ["GET", "POST"],
// 	},
// });

// Server-side Socket.io code
// io.on("connection", (socket) => {
// 	console.log("A user connected");

// 	socket.on("joinRoom", ({ senderId, receiverId }) => {
// 		socket.join(`chat-${senderId}-${receiverId}`);
// 		socket.join(`chat-${receiverId}-${senderId}`);
// 		console.log(`User joined chat-${senderId}-${receiverId}`);
// 	});

// 	socket.on("newMessage", (msg) => {
// 		const { sender_id, receiver_id } = msg;
// 		io.to(`chat-${sender_id}-${receiver_id}`).emit("newMessage", msg);
// 		io.to(`chat-${receiver_id}-${sender_id}`).emit("newMessage", msg);
// 	});

// 	socket.on("disconnect", () => {
// 		console.log("User disconnected");
// 	});
// });
//--------------------------------------------------------------------------

//--------------------- Connection Database --------------------------------
const db = mysql.createConnection({
});

// اتصال به دیتابیس
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL database");
});
//--------------------------------------------------------------------------

//--------------------------------------------------------------------------
// Middleware

app.use(
  session({
    secret: "joseph_adrijana_key", // کلید سشن که باید در محیط تولیدی امن باشد
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // برای محیط تولیدی، secure باید true باشد
  })
);
//--------------------------------------------------------------------------

//##########################################################################
//                   Login     Register    Logout
//--------------------------------------------------------------------------
// مسیر پیش‌فرض
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

//--------------------------------------------------------------------------
//             Register

// {
//   "username": "user2",
//   "email": "user2@gmail.com",
//   "phone_number": "test 1",
//   "password": "test1234"
// }

// مسیر ثبت نام
app.post("/register", async (req, res) => {
  const { username, email, phone_number, password } = req.body;

  // بررسی اینکه آیا همه فیلدها در درخواست موجود است
  if (!username || !email || !phone_number || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // هش کردن پسورد
  const hashedPassword = await bcrypt.hash(password, 10);

  // ذخیره سازی اطلاعات در دیتابیس
  const query =
    "INSERT INTO user_credentials (username, email, phone_number, password_hash) VALUES (?, ?, ?, ?)";
  db.query(
    query,
    [username, email, phone_number, hashedPassword],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }
      res.status(201).json({ message: "User registered successfully" });
    }
  );
});
//----------------------------------------------------------------

//----------------------------------------------------------------
// مسیر ورود
app.post("/login", (req, res) => {

});
//----------------------------------------------------------------

//----------------------------------------------------------------
// مسیر خروج از سیستم
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logout successful" });
  });
});
//--------------------------------------------------------------------------
//##########################################################################

//##########################################################################
//                           User Avatar Profile
//--------------------------------------------------------------------------
//                Upload Avatar Profile
// تنظیمات multer برای آپلود فایل
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "./uploads/profile_pictures/";
    // ایجاد دایرکتوری اگر وجود ندارد
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// ----------------------------------------------------------------
//                Upload avatar profile
// مسیر برای آپلود تصویر پروفایل
app.post("/upload-profile", upload.single("image"), (req, res) => {
  const userId = req.body.user_id;
  let profilePictureUrl = null;

  if (req.file) {
    profilePictureUrl = `/uploads/profile_pictures/${req.file.filename}`;
  }

  const sql = `UPDATE user_profile SET profile_picture_url = ?, updated_at = NOW() WHERE user_id = ?`;
  const values = [profilePictureUrl, userId];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    // res.json({
    // 	message: "Profile picture updated successfully",
    // 	photo_url: profilePictureUrl,
    // 	profilePictureUrl,
    // });
    res.status(200).json({
      message: "Profile picture updated successfully",
      profilePictureUrl: profilePictureUrl,
    });
  });
});

//----------------------------------------------------------------
//                 Delete Avatar Profile
// مسیر برای حذف عکس
app.post("/delete-picture", (req, res) => {
  const { profile_picture_url } = req.body; // دریافت آدرس عکس پروفایل از body درخواست

  if (!profile_picture_url) {
    return res.status(400).json({ message: "Photo URL is required" });
  }

  // مسیر کامل فایل عکس پروفایل
  const filePath = path.join(__dirname, profile_picture_url);

  // بررسی وجود فایل قبل از حذف
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: "File not found" });
    }

    // حذف فایل عکس پروفایل از سیستم فایل
    fs.unlink(filePath, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to delete photo", error: err });
      }

      res.json({ message: "Photo deleted successfully" });
    });
  });
});

//--------------------------------------------------------------------------
//##########################################################################

//##########################################################################
//                           User Credentials
//--------------------------------------------------------------------------

//                 UPDATE PASSWORD in user_credentials

app.patch("/update-password", async (req, res) => {
  const { id, password } = req.body;

  if (!id || !password) {
    return res.status(404).json({ msg: "Please write id and new Password!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = "UPDATE user_credentials SET password_hash = ? WHERE id = ?";
  db.query(query, [hashedPassword, id], (err, result) => {
    if (err) {
      return res.status(500).json({ msg: "DB ERROR", err: err });
    }

    res.status(200).json({ msg: "Successuflly updated!" });
  });
});
//--------------------------------------------------------------------------
//##########################################################################

//##########################################################################
//                           User Profile
//--------------------------------------------------------------------------

//                 INSERT and  Update user profile
/*{
  "user_id": 1,
  "first_name": "joseph",
  "last_name": "khezri",
  "gender": "male",
  "location_id": 1,
  "relationship_type_id": 2,
  "children_status_id": 2,
  "marital_status_id": 2,
  "education_id": 2,
  "occupation_id": 2,
  "smoking_status_id": 2,
  "drinking_status_id": 2,
  "height_cm": 175,
  "weight_kg": 72,
  "religion_id": 1,
  "lifestyle_id": 2,
  "language_id": 1,
  "pet_ownership_id": 2
}*/
app.post(
  "/insert-update-Profile",
  upload.single("profile_picture"),
  (req, res) => {
    const data = req.body;
    let profile_picture_url = null;
    let birthdate = null;

    if (req.file) {
      profile_picture_url = `/uploads/profile_pictures/${req.file.filename}`;
    }

    // SQL query to check if user_id exists
    const checkUserSql = `SELECT id FROM user_profile WHERE user_id = ?`;
    db.query(checkUserSql, [data.user_id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // User exists, proceed with update
      if (results.length) {
        const sql = `UPDATE user_profile 
                   SET first_name = ?, last_name = ?, gender = ?, birthdate = ?, 
                   location = ?, profile_picture_url = ?, updated_at = NOW(), 
                   relationship_type_id = ?, children_status_id = ?, marital_status_id = ?, 
                   education_id = ?, occupation_id = ?, smoking_status_id = ?, 
                   drinking_status_id = ?, height_cm = ?, weight_kg = ?, religion_id = ?, 
                   lifestyle_id = ?, language_id = ?, pet_ownership_id = ? 
                   WHERE user_id = ?`;

                     profile_picture_url, created_at, updated_at, relationship_type_id,
                     children_status_id, marital_status_id, education_id, occupation_id,
                     smoking_status_id, drinking_status_id, height_cm, weight_kg,
                     religion_id, lifestyle_id, language_id, pet_ownership_id
                   ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
          data.user_id,
          data.first_name,
          data.last_name,
          data.gender,
          data.birthdate || null,
          data.location || null,
          profile_picture_url,
          data.relationship_type_id,
          data.children_status_id,
          data.marital_status_id,
          data.education_id,
          data.occupation_id,
          data.smoking_status_id,
          data.drinking_status_id,
          data.height_cm,
          data.weight_kg,
          data.religion_id,
          data.lifestyle_id,
          data.language_id,
          data.pet_ownership_id,
        ];

        db.query(sql, values, (err, result) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.json({ message: "User profile created successfully" });
        });
      }
    });
  }
);
//--------------------------------------------------------------------------
//                     Get info user profile
// مسیر برای دریافت پروفایل کاربر
app.get("/profile", (req, res) => {
  const { user_id } = req.query;

  // Check if user_id is provided in the request
  if (!user_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  // Query to fetch complete profile information
  const query = `
    SELECT 
      user_profile.*,
	  user_credentials.username,
      children_statuses.children_status,
      drinking_statuses.drinking_status,
      educations.education,
      languages.language,
      lifestyles.lifestyle,
      marital_statuses.marital_status,
      occupations.occupation,
      pet_ownerships.pet_ownership,
      relationship_types.relationship_type,
      religions.religion,
      smoking_statuses.smoking_status
    FROM user_profile
	LEFT JOIN user_credentials ON user_profile.user_id = user_credentials.id
    LEFT JOIN children_statuses ON user_profile.children_status_id = children_statuses.id
    LEFT JOIN drinking_statuses ON user_profile.drinking_status_id = drinking_statuses.id
    LEFT JOIN educations ON user_profile.education_id = educations.id
    LEFT JOIN languages ON user_profile.language_id = languages.id
    LEFT JOIN lifestyles ON user_profile.lifestyle_id = lifestyles.id
    LEFT JOIN marital_statuses ON user_profile.marital_status_id = marital_statuses.id
    LEFT JOIN occupations ON user_profile.occupation_id = occupations.id
    LEFT JOIN pet_ownerships ON user_profile.pet_ownership_id = pet_ownerships.id
    LEFT JOIN relationship_types ON user_profile.relationship_type_id = relationship_types.id
    LEFT JOIN religions ON user_profile.religion_id = religions.id
    LEFT JOIN smoking_statuses ON user_profile.smoking_status_id = smoking_statuses.id
    WHERE user_profile.user_id = ?`;

  // Execute the query
  db.query(query, [user_id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User profile not found" });
    }

    // Return the complete user profile
    const userProfile = results[0];
    res.status(200).json(userProfile);
    console.log(userProfile);
  });
});

//--------------------------------------------------------------------------

//                   get all profiles by gender

app.get("/user-profiles/all/:gender", (req, res) => {
  const { gender } = req.params;

  const query = `
	  SELECT  
		up.user_id,
		up.first_name,
		up.last_name,
		up.gender,
		up.birthdate,
		up.location,
		up.profile_picture_url,
		uc.username
	  FROM
		user_profile up
	  LEFT JOIN
		user_credentials uc ON up.user_id = uc.id
	  WHERE
		up.gender = ? LIMIT 9`;

  db.query(query, [gender], (err, results) => {
    if (err) {
      return res.status(500).json({ msg: "DB ERROR", err: err });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ msg: `Profile not found! Table is probably empty.` });
    }

    res.status(200).json(results);
  });
});

//--------------------------------------------------------------------------

//                   get all filtered profiles

app.get("/user-profiles/filtered", (req, res) => {
  const { minAge } = req.query;
  const { maxAge } = req.query;
  const { gender, location } = req.query;
  console.log("minAge:", minAge);
  console.log("maxAge:", maxAge);
  console.log("gender:", gender);
  console.log("location:", location);

  let query = `
	  SELECT  
		up.user_id,
		up.first_name,
		up.last_name,
		up.gender,
		up.birthdate,
		up.location,
		up.profile_picture_url,
		uc.username 
	  FROM
		user_profile up
	  LEFT JOIN
		user_credentials uc ON up.user_id = uc.id
	  WHERE
	  	gender = ?
		AND (DATEDIFF(CURDATE(), birthdate) / 365.25) BETWEEN ? AND ?
	`;

  let queryParams = [gender, minAge, maxAge];

  if (location !== null && location !== undefined) {
    query += " AND location = ? LIMIT 9";
    queryParams.push(location);
  }else{
	query += " LIMIT 9";
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      return res.status(500).json({ msg: "DB ERROR", err: err });
    }

    if (!results) {
      return res.status(400).json({ msg: `Keiner gefunden!` });
    }

    return res.status(200).json( results );
  });
});

//--------------------------------------------------------------------------
//##########################################################################

//##########################################################################
//                           Messages
//--------------------------------------------------------------------------
//  New Massage
/*
{ 
  "sender_id": 1, 
  "receiver_id": 2, 
  "content": "test 1" 
}
*/

// مسیر برای اضافه کردن پیام جدید
app.post("/messages", (req, res) => {
  const { sender_id, receiver_id, content } = req.body;

  if (!sender_id || !receiver_id || !content) {
    return res.status(400).json({
      message: "Sender ID, Receiver ID, and content are required",
    });
  }

  const query = `INSERT INTO messages (sender_id, receiver_id, content, sent_at) 
                   VALUES (?, ?, ?, CURRENT_TIMESTAMP)`;

  db.query(query, [sender_id, receiver_id, content], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    io.to(`chat-${sender_id}-${receiver_id}`).emit("newMessage", {
      sender_id,
      receiver_id,
      content,
    });

    res.status(201).json({ message: "Message sent successfully" });
  });
});
//--------------------------------------------------------------------------
//  Delete message
// مسیر برای حذف پیام
app.delete("/messages", (req, res) => {
  const { messageId } = req.body;

  if (!messageId) {
    return res.status(400).json({ message: "Message ID is required" });
  }

  const query = "DELETE FROM messages WHERE id = ?";

  db.query(query, [messageId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({ message: "Message deleted successfully" });
  });
});

//--------------------------------------------------------------------------
//     Get all messages from 2 users
// مسیر برای دریافت پیام‌ها بین دو کاربر
app.get("/messages", (req, res) => {
  const { sender_id, receiver_id } = req.query;

  if (!sender_id || !receiver_id) {
    return res.status(400).json({
      message: "Sender ID and Receiver ID are required",
    });
  }

  const query = `SELECT * FROM messages 
                   WHERE (sender_id = ? AND receiver_id = ?)
                      OR (sender_id = ? AND receiver_id = ?)
                   ORDER BY sent_at ASC`;

  db.query(
    query,
    [sender_id, receiver_id, receiver_id, sender_id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }

      res.status(200).json(results);
    }
  );
});

//--------------------------------------------------------------------------
//             Find users we chatted with
// دریافت لیست دوستان و آخرین پیام‌ها

// app.get("/chat-friends/:userId", (req, res) => {
app.get("/chat-friends/:userId", (req, res) => {
  const userId = parseInt(req.params.userId, 10); // تبدیل رشته به عدد

  // کوئری برای دریافت آخرین پیام‌های ارسال شده و دریافت شده به همراه تصاویر پروفایل و نام کاربری
  const query = `
        SELECT 
            m1.id,
            m1.sender_id,
            m1.receiver_id,
            m1.content,
            m1.sent_at,
            sp.profile_picture_url AS sender_profile_picture_url,
            rp.profile_picture_url AS receiver_profile_picture_url,
            su.username AS sender_username,
            ru.username AS receiver_username
        FROM 
            messages m1
        JOIN (
            SELECT 
                LEAST(sender_id, receiver_id) AS user1_id,
                GREATEST(sender_id, receiver_id) AS user2_id,
                MAX(sent_at) AS last_sent_at
            FROM 
                messages
            WHERE 
                sender_id = ? OR receiver_id = ?
            GROUP BY 
                user1_id, user2_id
        ) m2 ON 
            LEAST(m1.sender_id, m1.receiver_id) = m2.user1_id
            AND GREATEST(m1.sender_id, m1.receiver_id) = m2.user2_id
            AND m1.sent_at = m2.last_sent_at
        LEFT JOIN user_profile sp ON m1.sender_id = sp.user_id
        LEFT JOIN user_profile rp ON m1.receiver_id = rp.user_id
        LEFT JOIN user_credentials su ON m1.sender_id = su.id
        LEFT JOIN user_credentials ru ON m1.receiver_id = ru.id
        ORDER BY 
            m1.sent_at DESC;
    `;

  // اجرای کوئری
  db.query(query, [userId, userId], (err, results) => {
    if (err) {
      console.error(
        "Error fetching latest messages with profile pictures and usernames:",
        err
      ); // چاپ خطای دقیق
      res.status(500).send("Server error"); // ارسال خطای سرور
      return;
    }

    // ارسال نتایج به فرانت‌اند
    res.json(results);
  });
});

//--------------------------------------------------------------------------
//##########################################################################

//##########################################################################
//                           matches
//--------------------------------------------------------------------------
//                   Insert match
// مسیر برای اضافه کردن یک رکورد جدید
app.post("/matches", (req, res) => {
  const { user1_id, user2_id, matched_at, status } = req.body;

  // بررسی وجود تمامی پارامترها
  if (
    user1_id === undefined ||
    user2_id === undefined ||
    status === undefined
  ) {
    return res
      .status(400)
      .json({ message: "user1_id, user2_id, and status are required" });
  }

  // تعریف کوئری SQL برای اضافه کردن رکورد
  const query =
    "INSERT INTO matches (user1_id, user2_id, matched_at, status) VALUES (?, ?, ?, ?)";
  const values = [user1_id, user2_id, matched_at || null, status];

  // اجرای کوئری SQL
  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    res.status(201).json({
      message: "Match added successfully",
      matchId: result.insertId,
    });
  });
});
//--------------------------------------------------------------------------
//             Update  match status
// مسیر برای بروزرسانی وضعیت یک رکورد
app.patch("/matches", (req, res) => {
  const { matchId, status } = req.body;

  // بررسی وجود status
  if (status === undefined) {
    return res.status(400).json({ message: "Status is required" });
  }

  // تعریف کوئری SQL برای بروزرسانی وضعیت
  const query = "UPDATE matches SET status = ? WHERE id = ?";
  const values = [status, matchId];

  // اجرای کوئری SQL
  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Match not found" });
    }

    res.status(200).json({ message: "Match updated successfully" });
  });
});
//--------------------------------------------------------------------------
//                       Delete Match
// مسیر برای حذف یک رکورد
app.delete("/matches", (req, res) => {
  const matchId = req.body;

  // تعریف کوئری SQL برای حذف رکورد
  const query = "DELETE FROM matches WHERE id = ?";

  // اجرای کوئری SQL
  db.query(query, [matchId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Match not found" });
    }

    res.status(200).json({ message: "Match deleted successfully" });
  });
});
//--------------------------------------------------------------------------

//##########################################################################
//                            Interests
//--------------------------------------------------------------------------
// مسیر برای اضافه کردن علاقه‌مندی جدید
app.post("/interests", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Interest name is required" });
  }

  const query = "INSERT INTO interests (name) VALUES (?)";

  db.query(query, [name], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    res.status(201).json({
      message: "Interest added successfully",
      interestId: result.insertId,
    });
  });
});
//--------------------------------------------------------------------------
// مسیر برای حذف علاقه‌مندی بر اساس id
app.delete("/interests/delete", (req, res) => {
  const { interestId } = req.body;

  if (!interestId) {
    return res.status(400).json({ message: "Interest ID is required" });
  }

  const query = "DELETE FROM interests WHERE id = ?";

  db.query(query, [interestId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Interest not found" });
    }

    res.status(200).json({ message: "Interest deleted successfully" });
  });
});

//--------------------------------------------------------------------------
// مسیر برای بروزرسانی جزئی علاقه‌مندی بر اساس id
app.patch("/interests/update", (req, res) => {
  const { name, interestId } = req.body;

  // بررسی اینکه حداقل یک فیلد برای بروزرسانی ارسال شده باشد
  if (!name) {
    return res.status(400).json({
      message: "At least one field (name) is required for update",
    });
  }

  const query = "UPDATE interests SET name = ? WHERE id = ?";

  db.query(query, [name, interestId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Interest not found" });
    }

    res.status(200).json({ message: "Interest updated successfully" });
  });
});
//--------------------------------------------------------------------------
//  Get Interest API
// مسیر برای دریافت اطلاعات
app.get("/interests", (req, res) => {
  const query = "SELECT * FROM interests";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching interests:", err);
      res.status(500).send("Error fetching interests");
    } else {
      res.json(results);
    }
  });
});

//##########################################################################
//                           user_interests
//--------------------------------------------------------------------------
//                       Get user interest
//  For test => http://localhost:5000/user-interests?user_Id=1

app.get("/user-interests", (req, res) => {
  const { user_Id } = req.query;

  if (!user_Id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  // Updated query to join both tables and get interest names
  const query = `
        SELECT ui.interest_id, i.name 
        FROM user_interests ui
        JOIN interests i ON ui.interest_id = i.id
        WHERE ui.user_id = ?
    `;

  db.query(query, [user_Id], (err, results) => {
    if (err) {
      console.error("Error fetching user interests:", err);
      res.status(500).send("Error fetching user interests");
    } else {
      res.json(results);
    }
  });
});

//--------------------------------------------------------------------------
//               update-user-interests
app.post("/update-user-interests", (req, res) => {
  const { user_Id, userInterests } = req.body;

  if (!user_Id || !Array.isArray(userInterests)) {
    return res
      .status(400)
      .json({ message: "User ID and user interests are required" });
  }

  // Step 1: حذف علایق قدیمی کاربر
  const removeQuery = `DELETE FROM user_interests WHERE user_id = ?`;
  db.query(removeQuery, [user_Id], (err) => {
    if (err) {
      console.error("Error removing user interests:", err);
      return res.status(500).send("Error removing user interests");
    }

    // Step 2: اضافه کردن علایق جدید کاربر
    if (userInterests.length > 0) {
      const insertQuery = `INSERT INTO user_interests (user_id, interest_id) VALUES ?`;
      const values = userInterests.map((interest) => [
        user_Id,
        interest.interest_id,
      ]);

      db.query(insertQuery, [values], (err) => {
        if (err) {
          console.error("Error adding user interests:", err);
          return res.status(500).send("Error adding user interests");
        }

        res.json({ message: "User interests updated successfully" });
      });
    } else {
      res.json({ message: "User interests updated successfully" });
    }
  });
});

//--------------------------------------------------------------------------
// مسیر برای اضافه کردن یک رکورد جدید به جدول user_interests
app.post("/user-interests", (req, res) => {
  const { user_id, interest_id } = req.body;

  if (!user_id || !interest_id) {
    return res
      .status(400)
      .json({ message: "user_id and interest_id are required" });
  }

  const query =
    "INSERT INTO user_interests (user_id, interest_id) VALUES (?, ?)";

  db.query(query, [user_id, interest_id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    res.status(201).json({
      message: "User interest added successfully",
      userInterestId: result.insertId,
    });
  });
});
//--------------------------------------------------------------------------
// مسیر برای حذف یک رکورد از جدول user_interests بر اساس id
app.delete("/user-interests/delete", (req, res) => {
  const { id } = req.body;

  // بررسی وجود id
  if (!id) {
    return res.status(400).json({ message: "Interest ID is required" });
  }

  // تعریف کوئری SQL برای حذف رکورد
  const query = "DELETE FROM user_interests WHERE id = ?";

  // اجرای کوئری SQL
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User interest not found" });
    }

    res.status(200).json({ message: "User interest deleted successfully" });
  });
});

//--------------------------------------------------------------------------
//##########################################################################

//##########################################################################
//                               Photos
//--------------------------------------------------------------------------
//                       Address for Upload Photos
// تنظیمات Multer برای ذخیره تصاویر
const storage_photos = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "images")); // استفاده از مسیر کامل
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload_photos = multer({ storage: storage_photos });

//---------------------------------------------------------------------------
//                    Upload photos
// Endpoint برای آپلود تصویر
app.post("/upload-photos", upload_photos.single("image"), (req, res) => {
  const imageUrl = `${req.file}` ? `${req.file.filename}` : null; // نام فایل ذخیره شده
  const userId = req.body.user_id;

  if (!imageUrl) {
    return res.status(400).json({ error: "Image upload failed" });
  }

  const query = "INSERT INTO photos (photo_url, user_id) VALUES (?, ?)";
  db.query(query, [imageUrl, userId], (err, result) => {
    if (err) {
      console.error("Error inserting image data:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json({
      message: "Image uploaded successfully!",
      photo_url: imageUrl,
    });
  });
});
//---------------------------------------------------------------
//                Get User photos
// Endpoint برای دریافت لیست تصاویر یک کاربر خاص
app.get("/photos/:user_id", (req, res) => {
  const userId = req.params.user_id;
  const query = "SELECT * FROM photos WHERE user_id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching photos:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json(results);
  });
});

//--------------------------------------------------------------------------
//                   Delete photo
// مسیر برای حذف عکس
app.delete("/delete-photo", (req, res) => {
  const { user_id, photo_url } = req.body;

  // ابتدا حذف فایل از سیستم فایل سرور
  const filePath = `./images/${photo_url}`;
  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to delete the file from the server.",
      });
    }

    // سپس حذف رکورد از پایگاه داده
    const query = "DELETE FROM photos WHERE user_id = ? AND photo_url = ?";
    db.query(query, [user_id, photo_url], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to delete the record from the database.",
        });
      }

      res.status(200).json({ message: "Photo deleted successfully." });
    });
  });
});

//--------------------------------------------------------------------------
//##########################################################################

//##########################################################################
//                      relationship types
//--------------------------------------------------------------------------
// مسیر برای دریافت اطلاعات relationship types
app.get("/relationship-types", (req, res) => {
  const query = "SELECT * FROM relationship_types";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching relationship types:", err);
      res.status(500).send("Error fetching relationship types");
    } else {
      res.json(results);
    }
  });
});
//--------------------------------------------------------------------------
//##########################################################################

//##########################################################################
//                      children statuses
//--------------------------------------------------------------------------
// مسیر برای دریافت اطلاعات relationship types
app.get("/children-statuses", (req, res) => {
  const query = "SELECT * FROM children_statuses";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching children statuses:", err);
      res.status(500).send("Error fetching children statuses");
    } else {
      res.json(results);
    }
  });
});
//--------------------------------------------------------------------------
//##########################################################################

//##########################################################################
//                      Marital statuses
//--------------------------------------------------------------------------
// مسیر برای دریافت اطلاعات marital_statuses
app.get("/marital-statuses", (req, res) => {
  const query = "SELECT * FROM marital_statuses";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching marital statuses:", err);
      res.status(500).send("Error fetching marital statuses");
    } else {
      res.json(results);
    }
  });
});
//--------------------------------------------------------------------------
//##########################################################################

//##########################################################################
//                      educations
//--------------------------------------------------------------------------
// مسیر برای دریافت اطلاعات educations
app.get("/educations", (req, res) => {
  const query = "SELECT * FROM educations";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching educations:", err);
      res.status(500).send("Error fetching educations");
    } else {
      res.json(results);
    }
  });
});
//--------------------------------------------------------------------------
//##########################################################################

//##########################################################################
//                      occupations
//--------------------------------------------------------------------------
// مسیر برای دریافت اطلاعات occupations
app.get("/occupations", (req, res) => {
  const query = "SELECT * FROM occupations";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching occupations:", err);
      res.status(500).send("Error fetching occupations");
    } else {
      res.json(results);
    }
  });
});
//--------------------------------------------------------------------------
//##########################################################################

//##########################################################################
//                      smoking_statuses
//--------------------------------------------------------------------------
// مسیر برای دریافت اطلاعات smoking_statuses
app.get("/smoking-statuses", (req, res) => {
  const query = "SELECT * FROM smoking_statuses";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching smoking statuses:", err);
      res.status(500).send("Error fetching smoking statuses");
    } else {
      res.json(results);
    }
  });
});
//--------------------------------------------------------------------------
//##########################################################################

//##########################################################################
//                      drinking_statuses
//--------------------------------------------------------------------------
// مسیر برای دریافت اطلاعات drinking_statuses
app.get("/drinking-statuses", (req, res) => {
  const query = "SELECT * FROM drinking_statuses";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching drinking statuses:", err);
      res.status(500).send("Error fetching drinking statuses");
    } else {
      res.json(results);
    }
  });
});
//--------------------------------------------------------------------------
//##########################################################################

//##########################################################################
//                      religions
//--------------------------------------------------------------------------
// مسیر برای دریافت اطلاعات drinking_statuses
app.get("/religions", (req, res) => {
  const query = "SELECT * FROM religions";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching religions:", err);
      res.status(500).send("Error fetching religions");
    } else {
      res.json(results);
    }
  });
});
//--------------------------------------------------------------------------
//##########################################################################

//##########################################################################
//                      lifestyles
//--------------------------------------------------------------------------
// مسیر برای دریافت اطلاعات lifestyles
app.get("/lifestyles", (req, res) => {
  const query = "SELECT * FROM lifestyles";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching lifestyles:", err);
      res.status(500).send("Error fetching lifestyles");
    } else {
      res.json(results);
    }
  });
});
//--------------------------------------------------------------------------
//##########################################################################

//##########################################################################
//                      languages
//--------------------------------------------------------------------------
// مسیر برای دریافت اطلاعات drinking_statuses
app.get("/languages", (req, res) => {
  const query = "SELECT * FROM languages";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching languages:", err);
      res.status(500).send("Error fetching languages");
    } else {
      res.json(results);
    }
  });
});
//--------------------------------------------------------------------------
//##########################################################################

//##########################################################################
//                      pet_ownerships
//--------------------------------------------------------------------------
// مسیر برای دریافت اطلاعات drinking_statuses
app.get("/pet-ownerships", (req, res) => {
  const query = "SELECT * FROM pet_ownerships";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching pet ownerships:", err);
      res.status(500).send("Error fetching pet ownerships");
    } else {
      res.json(results);
    }
  });
});
//--------------------------------------------------------------------------
//##########################################################################

//##########################################################################
//                           user_hobbies
//--------------------------------------------------------------------------
//                       Get user hobbies
//  For test => http://localhost:5000/user-hobbies?user_Id=1

app.get("/user-hobbies", (req, res) => {
  const { user_Id } = req.query;

  if (!user_Id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  // Updated query to join both tables and get hobby names
  const query = `
        SELECT uh.hobby_id, h.hobby 
        FROM user_hobbies uh
        JOIN hobbies h ON uh.hobby_id = h.id
        WHERE uh.user_id = ?
    `;

  db.query(query, [user_Id], (err, results) => {
    if (err) {
      console.error("Error fetching user hobbies:", err);
      res.status(500).send("Error fetching user hobbies");
    } else {
      res.json(results);
    }
  });
});

//--------------------------------------------------------------------------
//               update-user_hobbies
app.post("/update-user-hobbies", (req, res) => {
  const { user_Id, userHobbies } = req.body;

  if (!user_Id || !Array.isArray(userHobbies)) {
    return res
      .status(400)
      .json({ message: "User ID and user hobbies are required" });
  }

  // Step 1: حذف علایق قدیمی کاربر
  const removeQuery = `DELETE FROM user_hobbies WHERE user_id = ?`;
  db.query(removeQuery, [user_Id], (err) => {
    if (err) {
      console.error("Error removing user hobbies:", err);
      return res.status(500).send("Error removing user hobbies");
    }

    // Step 2: اضافه کردن علایق جدید کاربر
    if (userHobbies.length > 0) {
      const insertQuery = `INSERT INTO user_hobbies (user_id, hobby_id) VALUES ?`;
      const values = userHobbies.map((hobby) => [user_Id, hobby.hobby_id]);

      db.query(insertQuery, [values], (err) => {
        if (err) {
          console.error("Error adding user hobbies:", err);
          return res.status(500).send("Error adding user hobbies");
        }

        res.json({ message: "User hobbies updated successfully" });
      });
    } else {
      res.json({ message: "User hobbies updated successfully" });
    }
  });
});

//--------------------------------------------------------------------------
//                       End user Hobies API
//##########################################################################

//##########################################################################
//                 Get Hobbies API
//--------------------------------------------------------------------------

// مسیر برای دریافت اطلاعات
app.get("/hobbies", (req, res) => {
  const query = "SELECT * FROM hobbies";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching hobbies:", err);
      res.status(500).send("Error fetching hobbies");
    } else {
      res.json(results);
    }
  });
});
//--------------------------------------------------------------------------
//                 End Hobbies API
//##########################################################################

//##########################################################################
//                  friend-request
//--------------------------------------------------------------------------

//                Get friend request
// API برای دریافت وضعیت درخواست دوستی
app.get("/friend-request-status", (req, res) => {
  const { sender_id, receiver_id } = req.query;

  if (!sender_id || !receiver_id) {
    return res
      .status(400)
      .json({ error: "sender_id and receiver_id are required" });
  }

  const query = `
    SELECT * FROM friend_requests
    WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)
    LIMIT 2
  `;

  db.query(
    query,
    [sender_id, receiver_id, receiver_id, sender_id],
    (err, results) => {
      if (err) {
        console.error("Error fetching friend request status:", err);
        return res.status(500).json({ error: "Database query error" });
      }

      if (results.length > 0) {
        res.json(results);
      } else {
        res.json({
          sender_id: sender_id,
          receiver_id: receiver_id,
          status: "rejected",
        });
      }
    }
  );
});

//--------------------------------------------------------------------------
// مسیر API برای دریافت وضعیت درخواست دوستی
app.get('/friend-request-status', (req, res) => {
  const { sender_id, receiver_id } = req.query;

  console.log("sender_id: ", sender_id);
  console.log("receiver_id : ", receiver_id);

  if (!sender_id || !receiver_id) {
    return res.status(400).json({ error: 'Sender ID and Receiver ID are required' });
  }

  // اجرای کوئری برای دریافت وضعیت درخواست
  const query = 'SELECT status FROM friend_requests WHERE sender_id = ? AND receiver_id = ?';
  connection.execute(query, [sender_id, receiver_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }

    if (results.length > 0) {
      res.json({ status: results[0].status });
    } else {
      res.json({ status: 'No request found' });
    }
  });
});

//--------------------------------------------------------------------------

//       Update and Insert friend request status
//  در این قسمت بررسی میکند حالت های مختلف برای بروزرسانی status
app.post("/update-friend-request-status", (req, res) => {
  const { sender_id, receiver_id, action } = req.body;

  // بررسی اینکه آیا درخواست دوستی (در هر دو جهت) وجود دارد یا خیر
  const query = `
    SELECT * FROM friend_requests 
    WHERE (sender_id = ? AND receiver_id = ?) 
    OR (sender_id = ? AND receiver_id = ?)
  `;
  db.query(
    query,
    [sender_id, receiver_id, receiver_id, sender_id],
    (err, results) => {
      if (err) {
        console.error("Error fetching friend request:", err);
        return res
          .status(500)
          .json({ message: "Error fetching friend request." });
      }

      // بررسی وجود درخواست دوستی از sender_id به receiver_id
      const directRequest = results.find(
        (req) => req.sender_id === sender_id && req.receiver_id === receiver_id
      );

      // بررسی وجود درخواست دوستی از receiver_id به sender_id
      const reverseRequest = results.find(
        (req) => req.sender_id === receiver_id && req.receiver_id === sender_id
      );

      if (directRequest) {
        // اگر درخواست دوستی از sender_id به receiver_id وجود دارد، وضعیت آن را به‌روزرسانی کنید
        const updateQuery = `
        UPDATE friend_requests 
        SET status = ? 
        WHERE sender_id = ? AND receiver_id = ?
      `;
        db.query(
          updateQuery,
          [action, sender_id, receiver_id],
          (err, updateResult) => {
            if (err) {
              console.error("Error updating friend request status:", err);
              return res.status(500).json({
                message: "Error updating friend request status.",
              });
            }

            if (action === "accepted" && reverseRequest) {
              // اگر action = accepted باشد و درخواست معکوس وجود داشته باشد، وضعیت آن را به accepted تغییر دهید
              const updateReverseQuery = `
            UPDATE friend_requests 
            SET status = ? 
            WHERE sender_id = ? AND receiver_id = ?
          `;
              db.query(
                updateReverseQuery,
                [action, receiver_id, sender_id],
                (err, updateResult) => {
                  if (err) {
                    console.error(
                      "Error updating reverse friend request status:",
                      err
                    );
                    return res.status(500).json({
                      message: "Error updating reverse friend request status.",
                    });
                  }
                  return res.json({
                    message:
                      "Friend request status updated successfully, reverse request also updated to accepted.",
                  });
                }
              );
            } else if (action === "rejected" && reverseRequest) {
              // اگر action = rejected باشد و درخواست معکوس وجود داشته باشد، وضعیت آن را به rejected تغییر دهید
              const updateReverseQuery = `
            UPDATE friend_requests 
            SET status = ? 
            WHERE sender_id = ? AND receiver_id = ?
          `;
              db.query(
                updateReverseQuery,
                [action, receiver_id, sender_id],
                (err, updateResult) => {
                  if (err) {
                    console.error(
                      "Error updating reverse friend request status:",
                      err
                    );
                    return res.status(500).json({
                      message: "Error updating reverse friend request status.",
                    });
                  }
                  return res.json({
                    message:
                      "Friend request status updated successfully, reverse request also updated to rejected.",
                  });
                }
              );
            } else {
              return res.json({
                message: "Friend request status updated successfully.",
              });
            }
          }
        );
      } else if (reverseRequest && reverseRequest.status !== "rejected") {
        // اگر درخواست دوستی معکوس وجود دارد، وضعیت آن را به‌روزرسانی کنید
        const updateReverseQuery = `
        			UPDATE friend_requests 
        			SET status = ? 
       				WHERE sender_id = ? AND receiver_id = ?
      				`;
        db.query(
          updateReverseQuery,
          [action, receiver_id, sender_id],
          (err, updateResult) => {
            if (err) {
              console.error(
                "Error updating reverse friend request status:",
                err
              );
              return res.status(500).json({
                message: "Error updating reverse friend request status.",
              });
            }

            // حالا که درخواست معکوس به‌روزرسانی شد، یک رکورد جدید ایجاد کنید
            const insertQuery = `
          INSERT INTO friend_requests (sender_id, receiver_id, status, sent_at) 
          VALUES (?, ?, ?, NOW())
        `;
            db.query(
              insertQuery,
              [sender_id, receiver_id, action],
              (err, insertResult) => {
                if (err) {
                  console.error("Error inserting new friend request:", err);
                  return res.status(500).json({
                    message: "Error inserting new friend request.",
                  });
                }
                return res.json({
                  message:
                    "Friend request created and reverse request updated successfully.",
                });
              }
            );
          }
        );
      } else {
        // اگر هیچ درخواست دوستی وجود ندارد، تنها یک رکورد جدید ایجاد کنید
        const insertQuery = `
        INSERT INTO friend_requests (sender_id, receiver_id, status, sent_at) 
        VALUES (?, ?, ?, NOW())
      `;
        db.query(
          insertQuery,
          [sender_id, receiver_id, action],
          (err, insertResult) => {
            if (err) {
              console.error("Error inserting new friend request:", err);
              return res.status(500).json({
                message: "Error inserting new friend request.",
              });
            }
            return res.json({
              message: "Friend request created successfully.",
            });
          }
        );
      }
    }
  );
});

//--------------------------------------------------------------------------
//                    End friend-request
//##########################################################################

//##########################################################################
//--------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
