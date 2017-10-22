export const formatDate = (date) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${monthNames[monthIndex]} ${year}`;
};

export const getRandomColor = () => {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
};

export const makeKey = () => {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

export const sortBy = (array, key) => {
  
  if (key == 'date') {
    return array.sort((a,b) => new Date(b.date) - new Date(a.date));
  }
  
  if (key == 'vote') {
    return array.sort((a,b) => {
      const aVote = a.options.reduce(function(sum, item) {
        return sum + item.vote;
      }, 0);   
      
      const bVote = b.options.reduce(function(sum, item) {
        return sum + item.vote;
      }, 0);
      
      return bVote - aVote;
    });
  }
  
  return array;
  
};