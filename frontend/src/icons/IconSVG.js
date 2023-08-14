import React from "react";

const icons = {
  doubleDocument: require("./doubleDocument.svg"),
  dashboard: require("./dashboard.svg"),
  analysis: require("./analysis.svg"),
  pencil: require("./pencil.svg"),
  instagram: require("./instagram.svg"),
  twitter: require("./twitter.svg"),
  facebook: require("./facebook.svg"),
  borderedPlus: require("./borderedplus.svg"),
  plus: require("./plus.svg"),
  downArrow: require("./downarrow.svg"),
  instagramLike: require("./instagramlike.svg"),
  instagramComment: require("./instagramcomment.svg"),
  instagramSend: require("./instagramsend.svg"),
  instagramSave: require("./instagramsave.svg"),
  instagramMore: require("./instagrammore.svg"),
  loading: require("./loading.svg"),
  rightArrow: require("./rightarrow.svg"),
  leftArrow: require("./leftarrow.svg"),
  twitterComment: require("./twittercomment.svg"),
  twitterLike: require("./twitterlike.svg"),
  twitterRetweet: require("./twitterretweet.svg"),
  twitterShare: require("./twittershare.svg"),
  twitterViews: require("./twitterviews.svg"),
  bigClose: require("./bigclose.svg"),
  miniClose: require("./miniclose.svg"),
  welcomeImage: require("./welcomeimage.svg"),
  manage: require("./manage.svg"),
  createPost: require("./createpost.svg"),
  analyticOrange: require("./analyticorange.svg"),
  schedule: require("./schedule.svg"),
  preview: require("./preview.svg"),
  easyToUse: require("./easytouse.svg"),
  check: require("./check.svg"),
  hamburgerMenu: require("./hamburgermenu.svg"),
  dashboardhome : require("./dashboardhome.svg"),
  moon : require("./moon.svg"),
  sun : require("./sun.svg"),
  upArrow : require("./uparrow.svg"),
  instagramColorless : require("./instagramcolorless.svg"),
  facebookColorless : require("./facebookColorless.svg"),
  twitterColorless : require("./twitterColorless.svg"),
  linkedin : require("./linkedin.svg"),
  mail: require("./mail.svg"),
  settings: require("./settings.svg"),
  search: require("./search.svg"),
  linkedinColorless: require("./linkedinColorless.svg"),
  star : require("./star.svg"),
  starBorder: require("./starBorder.svg"),
  starFill : require("./starFill.svg"),
  checkType2: require("./checkType2.svg"),
  toggle: require("./toggle.svg")
};

const IconSVG = ({ name, ...props }) => {
  if(!icons[name])
  {
    return null
  }
  const { ReactComponent: SVGComponent } = icons[name];
  return <SVGComponent {...props} />;
};

export default IconSVG;
