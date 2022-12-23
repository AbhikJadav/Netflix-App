import videoData from "../data/videos.json";

export const getCommonVideos = async (url) => {
  try {
    const BASE_URL = `youtube.googleapis.com/youtube/v3`;

    const response = await fetch(
      `https://${BASE_URL}/${url}&maxResults=25&key=${process.env.YOUTUBE_API_KEY}`
    );
    const data = await response.json();
    if (data?.error) {
      console.log("Youtube API error", data.error);
      return [];
    }
    console.log({ items: data.items });
    return data?.items?.map((item) => {
      const snippet = item.snippet;
      return {
        title: snippet.title,
        imgUrl: snippet.thumbnails.high.url,
        id: item?.id?.videoId || item.id,
        description: snippet.description,
        publishTime: snippet.publishedAt,
        channelTime: item.channelTitle || "",
        statistics: item.statistics ? item.statistics : { viewCount: 0 },
      };
    });
  } catch (error) {
    console.log("Something went wrong with video library", error);
    return [];
  }
};

export const getVideos = (searchQuery) => {
  const URL = `search?part=snippet&q=${searchQuery}&type=video`;
  return getCommonVideos(URL);
};

export const getPopularVideos = () => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US`;
  return getCommonVideos(URL);
};

export const getYouTubeVideoById = (videoId) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
  return getCommonVideos(URL);
};
