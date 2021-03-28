module.exports = {
    format_date: date => {
      const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

      const d = new Date(date);

      return `${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    },
    format_plural: (word, amount) => {
        if (amount !== 1) {
          return `${word}s`;
        }

        return word;
    },
    format_url: url => {
        return url
          .replace('http://', '')
          .replace('https://', '')
          .replace('www.', '')
          .split('/')[0]
          .split('?')[0];
    },
    randomNumber: (min, max) => {
      return Math.floor(Math.random() * (max - min) + min);
    }
}