import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users = [];
  posts = [];

  isLoading = false;

  constructor(
    private db: AngularFireDatabase,
    private toastr: ToastrService,
  ) {
    this.isLoading = true;

    // get all the users from database
    db.object('/users').valueChanges().subscribe((obj) => {
      if (obj) {
        this.users = Object.values(obj) // conver object into array and store in array users
        this.isLoading = false;
      } else {
        toastr.error('No user found');
        this.users = [];
        this.isLoading = false;
      }
    });

    // grab all the posts from firebase
    db.object('/posts').valueChanges().subscribe((obj) => {
      if (obj) {
        this.posts = Object.values(obj).sort((a, b) => b.date - a.date)
        this.isLoading = false;
      } else{
        toastr.error('No post to display');
        this.posts =[];
        this.isLoading = false;
      }
    });

  }

  ngOnInit(): void {
  }

}
