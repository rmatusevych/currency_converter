import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { currencyCodes, currencyList } from '../constants/currency';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(public httpClient: HttpClient ) { }

  ngOnInit(): void {
    this.httpClient.get('https://api.monobank.ua/bank/currency').subscribe(
      (response) => {
        this.findNeededCurrencies(response)
      }
    )
  }

  findNeededCurrencies = (currencies) => {
    const neededCurrencies = {}

    for (const [key, value] of Object.entries(currencyList)) {
      neededCurrencies[key] = this.generateCurrencyObject(key, value, currencies)
    }

    console.log(neededCurrencies)
  }

  generateCurrencyObject = (currencyKey, currencyMapping, currencies) => {
    const mappingObject = {}

    currencyMapping.forEach(currencyName => {
      const currency = currencies.find((currencyRawObj) => {
        return this.checkCurrencyNames(currencyRawObj, currencyKey, currencyName)
      })

      if(currency) { mappingObject[currencyName] = currency.rateSell }
    });

    return mappingObject;
  }

  checkCurrencyNames = (currencyObj, firstCurrencyName, secondCurrencyName) => {
    const firstNumberKey = this.convertKeyToNumber(firstCurrencyName)
    const secondNumberKey = this.convertKeyToNumber(secondCurrencyName)

    return (this.checkEquals(currencyObj.currencyCodeA, firstNumberKey) && 
            this.checkEquals(currencyObj.currencyCodeB, secondNumberKey)) || 
            (this.checkEquals(currencyObj.currencyCodeB, firstNumberKey) && 
            this.checkEquals(currencyObj.currencyCodeA, secondNumberKey))
  }

  checkEquals = (firstElement, secondElement) => {
    return firstElement == secondElement;
  }

  convertKeyToNumber = (key) => {
    return currencyCodes[key];
  }
}
