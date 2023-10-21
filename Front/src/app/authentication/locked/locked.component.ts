import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-locked',
  templateUrl: './locked.component.html',
  styleUrls: ['./locked.component.scss'],
  animations: [
    trigger('backgroundChange', [
      state('initial', style({ opacity: 1 })),
      state('final', style({ opacity: 0 })),
      transition('initial <=> final', [
        animate('1s', style({ opacity: 0 })),
        animate('1s', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class LockedComponent implements OnInit {
  images: string[] = [
    '../../../assets/images/pages/1.svg',
    '../../../assets/images/pages/2.svg',
  ];

  currentImage: string = this.images[0];
  constructor() {
    setInterval(() => this.changeBackgroundImage(), 5000);
  }
  ngOnInit() {
   
  }
  changeBackgroundImage() {
    const currentIndex = this.images.indexOf(this.currentImage);
    const nextIndex = (currentIndex + 1) % this.images.length;
    this.currentImage = this.images[nextIndex];
  }
}
