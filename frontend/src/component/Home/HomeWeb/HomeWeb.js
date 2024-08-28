import React from "react";
import "./HomeWeb.css";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

export default function HomeWeb({ checkLogin }) {
  return (
    <>
      <Header checkLogin={checkLogin} />
      <main className="web_main">
        {/* section 1 - logo and heart */}
        <section className="section_1">
          {/* logo-text-LINKS */}
          <div className="logo-textDiv">
            <div className="logoDiv">
              <img className="frontLogo" src="./images/phoenix-logo .png" />
            </div>
            <h2 className="titel"> dein Neuanfang</h2>
            <div className="textDivFront">
              <p className="phoenix-text">
                ...Phoenix symbolisiert den neuen Anfang und die Wiedergeburt,
                genau wie eine neue Liebe, die in unserem Leben erblüht. In
                unsere Plattform kannst du aus der Asche alter Beziehungen
                aufsteigen und wahre Verbundenheit finden.
              </p>
            </div>
            {/* alt-textBox */}
            <div className="altBox">
              <p>
                Reichtum ist: verliebt zu sein, auch wenn die Haare grau werden.
              </p>
            </div>
            <div className="image-box">
              <img src="./images/growOldTogether.png" />
            </div>
            {/* love at pool */}
            <div className="poolBox">
              <p>Suchst du einen Abenteurer wie du?!</p>
            </div>
            <div className="poolImageBox">
              <img src="./images/loveAtPool.png" />
            </div>
          </div>
          {/* big-main hearts RECHTS */}
          <div className="heartDiv">
            <div id="heart"></div>
            <div className="image-test">
              <img src="./images/loveTroughHands.png" />
            </div>
            {/* Holliday */}
            <div className="hollidayBox">
              <p>Und die "Hollidays" sind zu zweit noch schoener.</p>
            </div>
            <div className="hollidayImageBox">
              <img src="./images/loveOnHollidays.png" />
            </div>
          </div>
        </section>
        {/* section 3 - about us */}
        <section className="section_3">
          <div className="textDiv">
            <h2>About Us</h2>
            <p>
              Willkommen auf unserer Dating-Website! Wir sind ein kleines, aber
              tatkräftiges Team mit der Mission, eine sichere und freundliche
              Umgebung zu schaffen, in der man neue Leute kennenlernen und
              Kontakte knüpfen kann. Als Gründer dieser Website teilen wir
              unsere eigenen Erfahrungen in der Welt des Datings und das
              Bedürfnis nach einem komfortablen und sicheren Ort, um gesunde und
              bedeutungsvolle Beziehungen aufzubauen. Hier haben wir uns
              verpflichtet, Dienste bereitzustellen, die Ihnen helfen, mit
              Menschen in Kontakt zu treten, die ähnliche Werte, Interessen und
              Ziele teilen. Durch fortschrittliche Tools und intelligente
              Algorithmen bemühen wir uns, Ihnen die besten Übereinstimmungen zu
              bieten und Ihnen eine angenehme Erfahrung bei der Suche nach einem
              Lebenspartner oder neuen Freund zu bieten. Wir legen Wert auf
              Authentizität, Ehrlichkeit und die Sicherheit unserer Benutzer und
              arbeiten stets daran, eine gesunde und unterstützende Umgebung für
              alle Mitglieder unserer Community zu schaffen. Schließen Sie sich
              uns an und lassen Sie uns gemeinsam bedeutungsvolle und dauerhafte
              Beziehungen aufbauen.
            </p>
            <p>Wir wünschen Ihnen alles Gute, das Phoenix-Team</p>
            <button className="seeMoreBtn">See more</button>
          </div>
          <div className="aboutHerz">
            <img className="sec3herz" src="./images/herz.png" />
          </div>
          <div className="unsereBilder">
            <img className="adri" src="./images/Adrijana.png" alt="" />
            <img className="yos" src="./images/Joseph.png" alt="" />
          </div>
        </section>
        {/* section 4 -  */}
        <section className="section_4">
          <div className="perfectHerz">
            <img src="./images/herz.png" />
          </div>
          <div className="perfectText">
            <h2>Perfect Match</h2>
            <p>
              Sie sagen, wir müssen auf das Gute warten, aber wir sagen, wir
              haben lange genug gewartet!
            </p>
            <button className="subscribeBtn">Subscribe now</button>
          </div>
          <div className="sec4lastDiv">
            <img src="./images/perfectMatch.jpg" />
          </div>
        </section>
        {/* section 5 - find your best match */}
        <section className="section_5">
          <h2>find your best match</h2>
          <p>
            Tausende Singles mit ähnlichen Eigenschaften und Hobbys sind nur
            einen Klick entfernt, und vielleicht ist einer davon genau das
            Richtige für Sie. Registrieren Sie sich und finden Sie ihn.
          </p>
          {/* container */}
          <div className="iconsDivBox">
            {/* 1. */}
            <div className="itemBox">
              <div className="circle first"></div>
              <div className="aside">
                <p>Bob, Miami</p>
                <p>35</p>
              </div>
            </div>
            {/* 2. */}
            <div className="itemBox">
              <div className="circle second"></div>
              <div className="aside">
                <p>Jan, Hamburg</p>
                <p>42</p>
              </div>
            </div>
            {/* 3. */}
            <div className="itemBox">
              <div className="circle third"></div>
              <div className="aside">
                <p>Klara, Kiseljak</p>
                <p>33</p>
              </div>
            </div>
            {/* 4. */}
            <div className="itemBox">
              <div className="circle fourth"></div>
              <div className="aside">
                <p>Ronja, Stuttgart</p>
                <p>28</p>
              </div>
            </div>
            {/* 5. */}
            <div className="itemBox">
              <div className="circle fifth"></div>
              <div className="aside">
                <p>Sven, Bogota</p>
                <p>23</p>
              </div>
            </div>
            {/* 6. */}
            <div className="itemBox">
              <div className="circle sixth"></div>
              <div className="aside">
                <p>Hannah, Goeteborg</p>
                <p>31</p>
              </div>
            </div>
          </div>
        </section>
        {/* section 6 */}
        <section className="section_6">
          <div className="teamBox">
            <h2>Our Team</h2>
            <div className="teamDiv">
              <div className="box1">
                <img className="teamBild" src="./images/woman1.png" />
                <label className="label1">Iris</label>
                <label className="label2">
                  Commited to her work and is here for all of you
                </label>
                <div className="sMediaDiv">
                  <img src="./icons/social.png" />
                  <img className="yt" src="./icons/youtube.png" />
                  <img src="./icons/instagram.png" />
                </div>
              </div>
              <div className="box2">
                <img className="teamBild" src="./images/woman1.png" />
                <label className="label1">Claudia</label>
                <label className="label2">
                  Commited to her work and is here for all of you
                </label>
                <div className="sMediaDiv">
                  <img src="./icons/social.png" />
                  <img className="yt" src="./icons/youtube.png" />
                  <img src="./icons/instagram.png" />
                </div>
              </div>
            </div>
          </div>
          <div className="galeryBox">
            <h2>Our Galery</h2>
            <div className="galery">
              <img className="img1" src="./images/growOldTogether.png" alt="" />
              <img className="img2" src="./images/loveAtPool.png" alt="" />
              <img className="img3" src="./images/loveOnHollidays.png" alt="" />
            </div>
          </div>
        </section>
        {/* section 7 */}
        <section className="section_7">
          <h2>We Will Let The Clients Say For Us</h2>
          <div className="sec7box">
            <div className="s7left">
              <img className="s7img" src="./images/romanticLove.png" />
            </div>
            <div className="s7right">
              <p>
                I'll tell you how I found my perfect match on this platform, to
                show you how perfect it is.
              </p>
              <img className="s7img2" src="./images/woman2.png" />
              <label>Chaterine, 34</label>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
