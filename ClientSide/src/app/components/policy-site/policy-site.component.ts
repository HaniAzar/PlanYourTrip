import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policy-site',
  templateUrl: './policy-site.component.html',
  styleUrls: ['./policy-site.component.scss']
})
export class PolicySiteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  print() {
    window.print();
  }
  top() {
    document.querySelector('#top').scrollIntoView({ behavior: "smooth" });
  }
}
