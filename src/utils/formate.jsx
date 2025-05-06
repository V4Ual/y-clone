import moment from "moment";

export const formatViews = (views) => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M views`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K views`;
  }
  return `${views} views`;
};

export const formatSubscribers = (subscribers) => {
  if (subscribers >= 1000000) {
    return `${(subscribers / 1000000).toFixed(1)}M`;
  } else if (subscribers >= 1000) {
    return `${(subscribers / 1000).toFixed(1)}K`;
  }
  return subscribers.toString() + " " + "subscriber";
};

export const formatTime = (givenTime) => {
  const timeString = givenTime;
  const time = moment(timeString);
  const now = moment();

  const diffInSeconds = now.diff(time, "seconds");
  const diffInMinutes = now.diff(time, "minutes");
  const diffInHours = now.diff(time, "hours");
  const diffInDays = now.diff(time, "days");
  const diffInMonths = now.diff(time, "months");
  const diffInYears = now.diff(time, "years");

  let result = "";

  if (diffInSeconds < 60) {
    result = "just now";
  } else if (diffInMinutes < 60) {
    result = `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  } else if (diffInHours < 24) {
    result = `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else if (diffInDays < 30) {
    result = `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  } else if (diffInMonths < 12) {
    result = `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  } else {
    result = `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
  }

  return result;
};
