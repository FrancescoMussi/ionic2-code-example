import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ApiProvider {
	
	private randomWordUrl = 'http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=50&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
	private easyJsonUrl = './assets/json/easy.json';
	private mediumJsonUrl = './assets/json/medium.json';
	private hardJsonUrl = './assets/json/hard.json';


	constructor(
		public http: Http
	) {}


	randomWordCall(): Promise<any> 
	{

		return this.http.get(this.randomWordUrl)
					.toPromise()
					.then(response => response.json())
	
	}

	wordReferencesCall(fullPath): Promise<any> 
	{
		return this.http.get(fullPath)
						.toPromise()
						.then(response => response.json())
	}


	getEasyWords()
	{
		return this.http.get(this.easyJsonUrl)
					.toPromise()
					.then(response => response.json())
	}

	getMediumWords()
	{
		return this.http.get(this.mediumJsonUrl)
					.toPromise()
					.then(response => response.json())
	}

	getHardWords()
	{
		return this.http.get(this.hardJsonUrl)
					.toPromise()
					.then(response => response.json())
	}


}
