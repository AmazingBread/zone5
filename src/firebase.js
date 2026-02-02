// src/firebase.js
import { initializeApp } from 'firebase/app'; // Firebase 앱 초기화
import { getDatabase } from 'firebase/database'; // Realtime Database 사용
import { getAnalytics, logEvent  } from 'firebase/analytics'; // Firebase Analytics 모듈 추가


// Firebase 구성 객체
const firebaseConfig = {
	apiKey: "AIzaSyAjFuSBPwWBj-w4SaRqzlKvPhMbEaOpKZ4",
	authDomain: "zone5-c1f49.firebaseapp.com",
	databaseURL: "https://zone5-c1f49-default-rtdb.firebaseio.com",
	projectId: "zone5-c1f49",
	storageBucket: "zone5-c1f49.firebasestorage.app",
	messagingSenderId: "790591085026",
	appId: "1:790591085026:web:744bda9240ce475e1001bb",
	measurementId: "G-P03TDQNZN8"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
// Realtime Database 가져오기
export const db = getDatabase(app); // Firebase Database 초기화 및 내보내기
// Firebase Analytics 초기화
export const analytics = getAnalytics(app); // Firebase Analytics 초기화 및 내보내기

// 페이지 로드 이벤트를 추적
logEvent(analytics, 'page_view');