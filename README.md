# Baybayin
Baybayin is spelling game for practicing writing in Baybayin for our Dalumat Ng/Sa Filipino class.

## Model
The model is from Kaggle user [DANIELLE "ALGOREX" BAGAFORO](https://www.kaggle.com/code/daniellebagaforomeer/baybayin-classifier-using-neural-networks/notebook)'s Baybayin Classifier using Neural Networks.

## To do
- [x] Scrape https://tagalog.pinoydictionary.com for Tagalog words
- [] Create an API for the scraped website, or use already existing ones
- [x] Implement character match per word 
- [x] Design a UI/UX  
- [x] Find a Filipino dictionary since Tagalog is limited 
- [ ] Change font and font colors

## Installation
```
pip install -r requirements.txt
```

## Usage
Make sure to change the api endpoint in `src/scripts/api` match your IP address
```
uvicorn app:app --reload --host 0.0.0.0 --port 3000
```
