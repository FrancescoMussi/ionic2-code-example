import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController, NavParams } from 'ionic-angular';

import { InfoModal } from '../info-modal/info-modal';
import { GameModal } from '../game-modal/game-modal';



@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
	animations: [

		trigger('levelButtonsClickAnimation', [
			state('bouncing', style({
				transform: 'translate3d(0,0,0)'
			})),
			transition('* => bouncing', [
				animate('300ms ease-in', keyframes([
					style({transform: 'translate3d(0,0,0)', offset: 0}),
					style({transform: 'translate3d(0,-4px,0)', offset: 0.3}),
					style({transform: 'translate3d(0,0,0)', offset: 1}) 
				]))
			])
		]),

		trigger('titleAnimation', [
			state('in', style({
				transform: 'translate3d(0,0,0)'
			})),
			transition('void => *', [
				style({transform: 'translate3d(0,2000px,0)'}),
				animate('1600ms ease-in-out')
			])
		]),

		trigger('imageAnimation', [
			state('in', style({
				transform: 'translate3d(0,0,0)'
			})),
			transition('void => *', [
				style({transform: 'translate3d(0,2000px,0)'}),
				animate('2000ms 200ms ease-in-out')
			])
		]),

		trigger('levelButtonsFadeIn', [
			state('in', style({
				opacity: 1
			})),
			transition('void => *', [
				style({opacity: 0}),
				animate('800ms 2200ms ease-in')
			])
		]),

		trigger('mainButtonsFadeIn', [
			state('in', style({
				opacity: 1
			})),
			transition('void => *', [
				style({opacity: 0}),
				animate('800ms 2700ms ease-in')
			])
		])

	]
})


export class HomePage {

	level: string;
	showValidationError: boolean = false;
	easyBounceState: string = 'noBounce';
	mediumBounceState: string = 'noBounce';
	hardBounceState: string = 'noBounce';
	randomBounceState: string = 'noBounce';
	titleState: string = "in";
	imageState: string = "in";
	levelButtonsState: string = "in";
	mainButtonsState: string = "in";

	constructor(
		private navCtrl: NavController,
		private modalCtrl: ModalController,
	) {

	}

	selectLevel(level)
	{
		this.showValidationError = false;
		
		console.log('Set level: ' + level);
		this.level = level;

		switch (level) 
		{
			case "easy":
				this.easyBounceState = 'bouncing';
				this.mediumBounceState = 'noBounce';
				this.hardBounceState = 'noBounce';
				this.randomBounceState = 'noBounce';
				break;
			case "medium":
				this.mediumBounceState = 'bouncing';
				this.easyBounceState = 'noBounce';
				this.hardBounceState = 'noBounce';
				this.randomBounceState = 'noBounce';
				break;
			case "hard": 
				this.hardBounceState = 'bouncing';
				this.easyBounceState = 'noBounce';
				this.mediumBounceState = 'noBounce';
				this.randomBounceState = 'noBounce';
				break;
			case "random":
				this.randomBounceState = 'bouncing';
				this.easyBounceState = 'noBounce';
				this.mediumBounceState = 'noBounce';
				this.hardBounceState = 'noBounce'; 
				break;
		}
	}

	startGame()
	{
		if( this.level === undefined ) 
		{
			this.showValidationError = true;
		}
		else
		{
			this.showValidationError = false;
			let gameModal = this.modalCtrl.create(GameModal, { level: this.level });
 	 		gameModal.present();
		}
	}

	goToInfo()
	{
		let infoModal = this.modalCtrl.create(InfoModal, { level: this.level });
 	 	infoModal.present();
	}

	closeMessage()
	{
		this.showValidationError = false;
	}

	

}


