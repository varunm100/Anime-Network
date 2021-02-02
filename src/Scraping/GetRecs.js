import malScraper from 'mal-scraper'

malScraper.getRecommendationsList({
  name: 'Sakura Trick',
  id: 20047
})
  .then((data) => console.log(data)
  .catch((err) => console.log(err))