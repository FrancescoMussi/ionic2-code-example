import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder }  from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { ApiProvider } from '../../providers/api-provider';


@Component({
	selector: 'game-modal',
	templateUrl: 'game-modal.html',
	providers: [ApiProvider],
})


export class GameModal {

	currentWord: string = "";
	wordRhymeList = [];
	wordInputForm: FormGroup;
	submitAttempt: boolean = false;
	seconds: number = 30;
	circleAnimator = 440;
	subscription: any;
	totalPoints: number = 0;
	currentStage: number = 1;
	gameOver: boolean = false;
	messageSuccess: string = "Ou yeah! That's a goody rhyme!";
	messageError: string = "Not correct. Hurry up! Try again!";
	showMessageSuccess: boolean = false;
	showMessageError: boolean = false;
	level:string;
	gameOverFinalMessage: string;
	gameOverImagePath: string;
	alreadyUsedWords = [];



	constructor(
		private params: NavParams,
		private viewCtrl: ViewController,
		private apiProvider: ApiProvider,
		private formBuilder: FormBuilder,
	) {

		this.level = params.get('level');
		console.log(this.level);

		var regexWord = '[a-zA-Z]+';

		this.wordInputForm = this.formBuilder.group({
			wordInput: ['', Validators.compose([Validators.pattern(regexWord), Validators.required])],
		});

		this.getWord();
	}

	
	ionViewDidLoad() 
	{

	}

	nextStage()
	{
		console.log('this.currentStage');
		console.log(this.currentStage);
		this.currentStage++;

		if( this.currentStage <= 10) 
		{	
			this.wordInputForm.reset();
			this.circleAnimator = 0;
			this.seconds = 30;
			this.getWord()
		}
		else if( this.currentStage == 11) 
		{
			this.gameOver = true;

			if(this.totalPoints <= 1) 
			{
				this.gameOverFinalMessage = "How could you do it so bad!";
				this.gameOverImagePath = "assets/images/very_bad.png";
			}
			else if(this.totalPoints <= 3 ) 
			{
				this.gameOverFinalMessage = "Well could be better...";
				this.gameOverImagePath = "assets/images/bad2.png";
			}
			else if(this.totalPoints <= 5 ) 
			{
				this.gameOverFinalMessage = "That was quite good! Keep on!";
				this.gameOverImagePath = "assets/images/singer.png";
			}
			else if(this.totalPoints <= 8 ) 
			{
				this.gameOverFinalMessage = "Ou yeah! That was very good!";
				this.gameOverImagePath = "assets/images/dab.png";
			}
			else
			{
				this.gameOverFinalMessage = "You are the new king of rap!";
				this.gameOverImagePath = "assets/images/king.png";
			}
			this.subscription.unsubscribe();
		}
	}


	startTimer()
	{
		let timer = Observable.timer(0,1000);
		this.subscription = timer.subscribe(t => this.countdown());
	}


	countdown()
	{
		this.seconds--;

		this.circleAnimator = this.circleAnimator - 15.11;

		if( this.seconds == 0 ) 
		{
			this.subscription.unsubscribe();
			this.circleAnimator = 0;
			this.nextStage();
		}
	}


	getWord()
	{
		switch (this.level) 
		{
			case "easy":
				this.apiProvider.getEasyWords().then(data => {

					this.manageWord(data);
				});

			break;

			case "medium":
				this.apiProvider.getMediumWords().then(data => {

					this.manageWord(data);
				});

			break;

			case "hard":
				this.apiProvider.getHardWords().then(data => {

					this.manageWord(data);
				});

			break;

			case "random":
				this.apiProvider.randomWordCall().then(data => {

					this.currentWord = data.word;
					this.getRhymes();

				});

			break;
			
		}
	}


	manageWord(data)
	{
		var randomIndex = Math.floor(Math.random() * data.length);
		var tempWord = data[randomIndex];
		var wordAlreadyUsed = false;

		for (var i = 0; i < this.alreadyUsedWords.length; ++i) 
		{
			if(this.alreadyUsedWords[i] == tempWord) 
			{
				wordAlreadyUsed = true;
			}
		}

		if(!wordAlreadyUsed) 
		{
			this.currentWord = data[randomIndex];
			console.log('Current word: ' + this.currentWord);
			this.getRhymes();
		}
		else
		{
			this.getWord();
		}
	}


	getRhymes()
	{
		var dataMuseApi = 'http://api.datamuse.com/words?rel_rhy=';
		var apiParameters = '&max=1000';
		var fullPath = dataMuseApi + this.currentWord + apiParameters;

		this.apiProvider.wordReferencesCall(fullPath).then(response => {

			console.log(response);

			this.wordRhymeList = response;

			this.startTimer();
		});
	}



	checkWord()
	{
		this.submitAttempt = true;

		var rhymeFound = false;

		if(this.wordInputForm.valid)
		{
			var wordInput = this.wordInputForm.value.wordInput.trim();

			for (var i = 0; i < this.wordRhymeList.length; ++i) 
			{
				console.log(this.wordRhymeList[i].word);

				if( wordInput == this.wordRhymeList[i].word) 
				{
					rhymeFound = true;
					this.showMessageSuccess = true;
					this.subscription.unsubscribe();
					this.totalPoints++;
					this.nextStage();

					setTimeout(() =>
					{
						this.showMessageSuccess = false;
					}, 3000);
				}
			}
			if(!rhymeFound) 
			{
				this.showMessageError = true;
				setTimeout(() =>
				{
					this.showMessageError = false;
				}, 3000);
			}
		} 
		else
		{
			console.log('form not valid');
		}		
	}


	closeMessage(message)
	{
		if( message == 'success' ) 
		{
			this.showMessageSuccess = false;
		}
		else if( message == 'error' ) 
		{
			this.showMessageError = false;
		}
	}

	dismiss()
	{
		this.viewCtrl.dismiss();
	}


	

}