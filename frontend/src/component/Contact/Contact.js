import React from "react";
import "./Contact.css";

function Contact() {
	return (
		<div className="contactContainer">
			<section className="contactBox-1">
				<div className="contact-left">
					<h4>CONTACT US</h4>
					<p>
						<img
							className="fIcon"
							src="./icons/telephone-call.png"
						/>
						<label>04871 123456</label>
					</p>
					<p>
						<img className="fIcon" src="./icons/mail.png" />
						<label>fhoenix@gmail.com</label>
					</p>
					<p>
						<img className="fIcon" src="./icons/location.png" />
						<label>Geschäftszentrum 112</label>
					</p>
				</div>
				<div className="wHours-right">
					<h4>WORKING HOURS</h4>
					<p>Mon. - Fri. : 09:00 am - 05:00 pm</p>
					<p>Saturday and Sundays closed</p>
				</div>
			</section>
			<section className="contactBox-2">
				<form className="form" method="post">
					<div className="nameBox">
						<label>Username: </label>
						<input className="nameInput" type="text" />
					</div>
					<textarea
						className="textArea"
						rows={5}
						placeholder="Hier lassen Deine Nachricht..."
					/>
					<button className="sendenBtn">Senden</button>
				</form>
			</section>
			<section className="iconsSection">
				<a
					href="https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2F%3Flocale%3Dde_DE"
					target="_blank"
				>
					<img className="FBimg" src="./icons/footerFB.png" />
				</a>
				<a
					href="https://www.instagram.com/accounts/login/"
					target="_blank"
				>
					<img src="./icons/footerInstagram.png" />
				</a>
				<a
					href="https://www.youtube.com/?app=desktop&hl=de"
					target="_blank"
				>
					<img src="./icons/footerYT.png" />
				</a>
				<a
					href="https://de.linkedin.com/?src=go-pa&trk=sem-ga_campid.17342682713_asid.148803897556_crid.657308124612_kw.linkedin_d.c_tid.kwd-148086543_n.g_mt.e_geo.1004864&mcid=6935667189886640128&cid=&gad_source=1&gclid=Cj0KCQjw_sq2BhCUARIsAIVqmQtlN7d_QfcXSNLWn-_HlP7S8B2juZJkRBltM-q4iFj7_GlbwzeSfQ0aAvvPEALw_wcB&gclsrc=aw.ds"
					target="_blank"
				>
					<img className="LiImg" src="./icons/footerLinkedin.png" />
				</a>
			</section>
		</div>
	);
}

export default Contact;
