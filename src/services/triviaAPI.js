export const fetchTokenFromAPI = async () => {
  const API_URL = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(API_URL);
  const { token } = await response.json();

  return token;
};

export const fetchQuestionsFromAPI = async (token) => {
  const API_URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(API_URL);
  const data = await response.json();

  return data;
};
