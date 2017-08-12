import { Component, OnInit, ElementRef, HostListener, ViewChild} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  host: {
  	'(window:scroll)': 'execute($event)'
  }
})
export class HomeComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer, private el:ElementRef, private router: Router) {}
    speed: number = 0.5;
    bottom1: string;
    bottom2: string;
    scroll: any;
    offset: any;
    offsetPx: string;

    @ViewChild('bgDiv1') ele: ElementRef;
    @ViewChild('bgDiv2') ele2: ElementRef;
    children: Array<ElementRef>;
    
  ngOnInit() {
    this.children = [this.ele,this.ele2];
    this.execute();
  }

  toLogin(){
    this.router.navigateByUrl('/login');
  }

  execute(){
    console.log("onload");
      for (var i = 0; i < this.children.length; i++) {
        
        if((window.innerHeight -  this.children[i].nativeElement.getBoundingClientRect().top) >= 0){
          this.scroll = (this.children[i].nativeElement.getBoundingClientRect().bottom < 0) ? 0 : (window.innerHeight - this.children[i].nativeElement.getBoundingClientRect().top);

          this.offset = -this.scroll*this.speed;
          
          this.offsetPx = this.offset + "px";
          
          switch (i){
            case 0:
              this.bottom1 = this.offsetPx;
              break;
            case 1: 
              this.bottom2 = this.offsetPx;
          }
        }
      }
  }

/*setSpeed: number = 7;
speed: any;
scrollY: any;
bgPos: any;
  constructor(private sanitizer: DomSanitizer, private router: Router) {}

  ngOnInit() {
  }

  toLogin(){
    this.router.navigateByUrl('/login');
  }
  
  execute(evt){
  	console.log(window.scrollY.valueOf());
  	this.scrollY = window.scrollY.valueOf();
  	if (this.scrollY === 0){
  		this.speed = 0;
  	}
  	else{
  		this.speed = this.scrollY/this.setSpeed;
  	}
  	console.log("speed is: " + this.speed);
  	this.bgPos = this.sanitizer.bypassSecurityTrustStyle("0%  "+ this.speed+ "%"); 
  	console.log(this.bgPos);

  }*/

}
