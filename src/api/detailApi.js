import axios from "axios";

export async function getItemInfo(id) {
  try {
    const res = await axios({
      method: 'get',
      url: `https://lks.getliner.com/document/${id}`,
      headers: { Authorization: 'Bearer null' },
  })

    return res.data;

  } catch (err) {
    return console.log(err);
  }
}

export async function getRecommendedItems(phrase, url, title) {
  try {
    const res = await axios({
      method: 'post',
      url: 'https://lks.getliner.com/recommendation/document/byphrase',
      headers: { Authorization: 'Bearer null' },
      params: {
        size: 12,
        anchor: null
      },
      data: {
        phrase: phrase,
        url: url,
        title: title, 
        num_of_phrase: 7
      }
    })

    return res.data.items;

  } catch (err) {
    return console.log(err);
  }
}

export async function getRecommendedWordsDetail(id) {
  try {
    const res = await axios({
      method: 'get',
      url: 'https://lks.getliner.com/recommendation/keyword',
      headers: { Authorization: 'Bearer null' },
      params: {
        size: 12,
        document_id: id
      }
    })

    return res.data.items;

  } catch (err) {
    return console.log(err);
  }
}
