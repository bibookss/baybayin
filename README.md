# Baybayin
Baybayin is an innovative mobile-first web application designed to celebrate the rich cultural heritage of the Philippines through the exploration of Baybayin, a pre-colonial script used by Filipino natives. Serving as a spelling game, the application offers users an engaging experience while simultaneously contributing to the advancement of Baybayin handwriting recognition technology. By providing a platform for users to interact with and spell words in Baybayin, the app collects valuable data that enhances the machine learning model's proficiency in recognizing and interpreting these ancient scripts. Embrace the beauty of Filipino history and contribute to the future of technology with Baybayin—an educational and entertaining journey into the heart of indigenous Philippine culture.

## Model
The model is from Kaggle user [DANIELLE "ALGOREX" BAGAFORO](https://www.kaggle.com/code/daniellebagaforomeer/baybayin-classifier-using-neural-networks/notebook)'s Baybayin Classifier using Neural Networks.

## To do
- [x] Scrape https://tagalog.pinoydictionary.com for Tagalog words
- [ ] Create an API for the scraped website, or use already existing ones
- [x] Implement character match per word 
- [x] Design a UI/UX  
- [x] Find a Filipino dictionary since Tagalog is limited 
- [ ] Change font and font colors
- [ ] Allow users to contribute their handwriting to train the model better

## Installation
```
pip install -r requirements.txt
```

## Usage
Make sure to change the api endpoint in `src/scripts/api` match your IP address
```
uvicorn app:app --reload --host 0.0.0.0 --port 3000
```
