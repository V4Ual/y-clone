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
  return subscribers.toString();
};
