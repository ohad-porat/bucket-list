import React from "react"

const welcomeMessage =  <div className="callout welcome-box">
<h1 className="welcome-header">Welcome to Bucket List</h1>
<h2 className="welcome-subheader">
  the place to compare NBA players and stats with ease and efficiency.
</h2>
<p className="welcome-body">
  To compare players, enter a player name and season, and then select
  stats to be displayed. You can also save your tables by signing up for
  our website!
</p>
<ul className="fa-ul welcome-list">
  <li>
    <span className="fa-li">
      <i className="fas fa-basketball-ball"></i>
    </span>
    Stats will be displayed in season averages.
  </li>
  <li>
    <span className="fa-li">
      <i className="fas fa-basketball-ball"></i>
    </span>
    Seasons are represented by the year they began. For example, 2018
    represents season 2018-2019.
  </li>
  <li>
    <span className="fa-li">
      <i className="fas fa-basketball-ball"></i>
    </span>
    Data is available from seasons 1979-present.
  </li>
</ul>
<p className="welcome-footer">
  Thank you to{" "}
  <a href="http://balldontlie.io/" className="api-link" target="_blank">
    balldontlie API
  </a>{" "}
  for supplying the data for this project!
</p>
</div>

export default welcomeMessage