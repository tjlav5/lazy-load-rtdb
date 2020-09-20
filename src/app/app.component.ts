import { Component, VERSION } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/database';

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCjOcNfadiwvNTZgL5YGxYuGnHkgx_teTI",
  authDomain: "tj-rtdb.firebaseapp.com",
  databaseURL: "https://tj-rtdb.firebaseio.com",
  projectId: "tj-rtdb",
  storageBucket: "tj-rtdb.appspot.com",
  messagingSenderId: "386585354605",
  appId: "1:386585354605:web:167d9e2daa6fe63effba64"
};

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  private readonly app = firebase.initializeApp(FIREBASE_CONFIG, `rtdb:${Math.random()}`);
  readonly dbRootRef = this.app.database().ref();
}
