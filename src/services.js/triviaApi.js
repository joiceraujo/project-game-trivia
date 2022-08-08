const apiPerguntas = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  return data;
  /* localStorage.setItem('token', data.token);
  console.log(response);
  console.log(data);
  console.log(token); */
  /* const guardaPerguntas = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`); */
  /* const perguntas = await guardaPerguntas.json(); */
  /*  return token; */
};
export default apiPerguntas;
