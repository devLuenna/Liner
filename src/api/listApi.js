import axios from "axios";

export async function getSearchedItems(keyword, anchor) {
  try {
    const res = await axios({
      method: 'post',
      url: 'https://lks.getliner.com/search/document',
      headers: { Authorization: 'Bearer null' },
      params: {
        size: 20,
        anchor: anchor
      },
      data: {
        query: keyword,
        num_of_phrase: 7
      }
    })
    //console.log(res.data)
    return res.data;

  } catch (err) {
    return console.log(err);
  }
}

export async function getPeopleAlsoSearchedForInList(keyword) {
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
    return res.data.items;

  } catch (err) {
    return console.log(err);
  }
}