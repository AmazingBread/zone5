// src/firebase.js
import { initializeApp } from 'firebase/app'; // Firebase 앱 초기화
import { getDatabase } from 'firebase/database'; // Realtime Database 사용
import { getAnalytics, logEvent  } from 'firebase/analytics'; // Firebase Analytics 모듈 추가

// Firebase 구성 객체
const firebaseConfig = {
	apiKey: "AIzaSyC9d5ec445ZXygk4qAYKoZVpIKD2c1ZrMQ",
	authDomain: "bonobono-e6ed4.firebaseapp.com",
	databaseURL: "https://bonobono-e6ed4-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "bonobono-e6ed4",
	storageBucket: "bonobono-e6ed4.appspot.com",
	messagingSenderId: "429492989063",
	appId: "1:429492989063:web:80e63aa9a9fef0deee5c22",
	measurementId: "G-ZS11JB5KRY"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
// Realtime Database 가져오기
export const db = getDatabase(app); // Firebase Database 초기화 및 내보내기
// Firebase Analytics 초기화
export const analytics = getAnalytics(app); // Firebase Analytics 초기화 및 내보내기

// 페이지 로드 이벤트를 추적
logEvent(analytics, 'page_view');