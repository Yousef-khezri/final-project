import React from "react";
import "./OurTeam.css";

function OurTeam() {
	return (
		<div className="containerOT">
			<h1>
				Unser <b>TEAM</b>
			</h1>
			<section className="firstOTsec">
				<p className="p1">
					Lerne unser kleines, aber engagiertes Team kennen, das jeden
					Tag engagiert daran arbeitet, Dir dabei zu helfen, Deinen
					perfekten Partner zu finden.
				</p>
				<p className="p2">Kurz über unsere Claudia und Iris.</p>
			</section>
			<section className="secondOTsec">
				<div className="boxOT">
					<div className="leftOT">
						<img className="claudia" src="./images/woman1.png" />
						<div>
							<p>
								Name: <b>Claudia</b>
							</p>
							<p>
								Alter: <b>36 Jahre</b>
							</p>
							<p>
								Sie will unterstützen Dich auf:{" "}
								<b>Englisch, Deutch, Kroatisch und Tukisch</b>
							</p>
						</div>
					</div>
					<div className="rightOT">
						<img className="iris" src="./images/woman1.png" />
						<div>
							<p>
								Name: <b>Iris</b>
							</p>
							<p>
								Alter: <b>32 Jahre</b>
							</p>
							<p>
								Sie will unterstützen Dich auf:{" "}
								<b>Englisch, Deutch, Persich und Russisch</b>
							</p>
						</div>
					</div>
				</div>
				<h2 className="bottomText">Wir Sind immer für sie da!</h2>
			</section>
		</div>
	);
}

export default OurTeam;
