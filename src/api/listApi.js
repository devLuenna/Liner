import axios from "axios";

export async function getSearchedItems(keyword) {
  try {
    const res = await axios({
      method: 'post',
      url: 'https://lks.getliner.com/search/document',
      headers: { Authorization: 'Bearer null' },
      params: {
        size: 20,
        anchor: null
      },
      data: {
        query: keyword,
        num_of_phrase: 7
      }
    })

    return res.data;

  } catch (err) {
    return console.log(err);
  }
}

export async function getRecommendedWords(keyword) {
  try {
    const res = await axios({
      method: 'get',
      url: 'https://lks.getliner.com/recommendation/keyword',
      headers: { Authorization: 'Bearer null' },
      params: {
        size: 12,
        keyword: keyword
      }
    })

    return res.data;

  } catch (err) {
    return console.log(err);
  }
}