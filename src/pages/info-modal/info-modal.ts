import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
	selector: 'info-modal',
	templateUrl: 'info-modal.html',
})


export class InfoModal {

	constructor(
		private params: NavParams,
		private viewCtrl: ViewController,
	) {

	}

	dismiss()
	{
		this.viewCtrl.dismiss();
	}

}