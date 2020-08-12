import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { faThumbsUp, faThumbsDown, faShareSquare } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnChanges {
  @Input() post;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faShareSquare = faShareSquare;

  uid = null; // currently logged in user
  upvote = 0;
  downvote = 0;
  constructor(private db: AngularFireDatabase, private auth: AuthService) {
    this.auth.getUser().subscribe((user) => {  // grab the user id from the user
      this.uid = user?.uid
    });
  }

  ngOnInit(): void { }
  // to change the count upvote and downvote
  // ng onchanges is used when u change something in database and want to reflect on ur page
  ngOnChanges(): void {
    if (this.post.vote) {
      Object.values(this.post.vote).map((val: any) => {
        if (val.upvote) {
          this.upvote += 1;
        }
        if (val.downvote) {
          this.downvote += 1
        }
      });
    }
  }

  upvotePost() {
    this.db.object(`/posts/${this.post.id}/vote/${this.uid}`).set({
      upvote: 1
    });  // grab the post id inside posts in database
  }

  downVotePost() {
    this.db.object(`/posts/${this.post.id}/vote/${this.uid}`).set({
      downvote: 1
    });
  }

  getInstalUrl() {
    return `https://instagram/${this.post.instaId}`
  }
}
