<!-- src/views/ApplicationForm.vue -->
<template>
    <div>
        <h1>신청 양식</h1>
        <form @submit.prevent="submitForm"> <!-- 폼 제출 시 submitForm 호출 -->
            <div>
                <label for="name">이름:</label>
                <input type="text" id="name" v-model="name" required />
            </div>
            <div>
                <label for="payment">입금 유무:</label>
                <input type="checkbox" id="payment" v-model="hasPaid" /> 입금 완료
            </div>
            <div>
                <label for="message">남기고 싶은 말:</label>
                <textarea id="message" v-model="messageContent" rows="4" required></textarea>
            </div>
            <button type="submit">신청</button>
        </form>
        <p v-if="message">{{ message }}</p>

        <h2>신청 목록</h2>
        <table>
            <thead>
            <tr>
                <th>이름</th>
                <th>입금 유무</th>
                <th>남기고 싶은 말</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="applicant in applicants" :key="applicant.id">
                <td>{{ applicant.name }}</td>
                <td>{{ applicant.hasPaid ? '완료' : '미완료' }}</td>
                <td>{{ applicant.message }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { db } from '../firebase'; // firebase.js 가져오기
import { ref as dbRef, get, push } from 'firebase/database'; // Firebase Database의 ref와 get, push 가져오기

export default {
    data() {
        return {
            name: '', // 신청자의 이름
            hasPaid: false, // 입금 유무 체크박스
            messageContent: '', // 남기고 싶은 말
            message: '', // 성공/오류 메시지
            applicants: [] // 신청자 목록
        };
    },
    mounted() {
        this.fetchApplicants(); // 컴포넌트가 마운트될 때 신청자 목록 가져오기
    },
    methods: {
        validateForm() {
            if (!this.name || !this.messageContent) {
                alert('모든 필드를 작성해주세요.');
                return false;
            }
            return true;
        },
        async checkNameExists(name) {
            try {
                const nameRef = dbRef(db, 'applicants'); // 'applicants' 노드 참조
                const snapshot = await get(nameRef);
                return snapshot.val() && Object.values(snapshot.val()).some(applicant => applicant.name === name);
            } catch (error) {
                console.error("이름 중복 확인 중 오류 발생:", error);
                return false; // 오류 발생 시 false 반환
            }
        },
        async fetchApplicants() {
            try {
                const nameRef = dbRef(db, 'applicants'); // 'applicants' 노드 참조
                const snapshot = await get(nameRef);
                if (snapshot.exists()) {
                    // 신청자 목록 업데이트
                    this.applicants = Object.keys(snapshot.val()).map(key => ({
                        id: key,
                        ...snapshot.val()[key]
                    }));
                } else {
                    this.applicants = []; // 데이터가 없으면 빈 배열
                }
            } catch (error) {
                console.error("신청자 목록 가져오기 오류:", error);
            }
        },
        async submitForm() {
            if (!this.validateForm()) {
                return; // 필드 유효성 검사 실패 시 종료
            }

            const nameExists = await this.checkNameExists(this.name);
            if (nameExists) {
                this.message = '동일 이름이 있습니다.';
                return;
            }

            const applicantData = {
                name: this.name, // 신청자의 이름
                hasPaid: this.hasPaid, // 입금 유무
                message: this.messageContent // 남기고 싶은 말
            };

            // Firebase Realtime Database에 데이터 추가
            push(dbRef(db, 'applicants'), applicantData) // push 메서드를 사용하여 데이터 추가
                .then(() => {
                    this.message = '신청이 완료되었습니다.'; // 완료 메시지 표시
                    this.fetchApplicants(); // 신청자 목록 갱신
                    // 양식 초기화
                    this.name = '';
                    this.hasPaid = false; // 체크박스 초기화
                    this.messageContent = ''; // 메시지 초기화
                })
                .catch((error) => {
                console.error('데이터 저장 오류:', error);
                this.message = '데이터 저장 오류가 발생했습니다.';
            });
        }
    }
};
</script>

<style>
/* 스타일 추가 (예: form 스타일링) */
form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: auto;
}

label {
    margin-top: 10px;
}

button {
    margin-top: 20px;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

p {
    color: green; /* 성공 메시지 색상 */
    margin-top: 15px;
}

/* 테이블 스타일 */
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th, td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ccc;
}

th {
    background-color: #f2f2f2;
}
</style>
