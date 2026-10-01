<template>
    <div class="container py-4" style="max-width: 500px;">
        <div class="col-12">
            <div class="col-12 p-1" >
                <div
                    class="boxstyle6"
                    style="font-size: 20px; "
                >
                    단체전 참고용 기록 입력
                </div>
            </div>
        </div>
        <form @submit.prevent="submitForm" class="mb-5 p-3" style="background: #ffffff; border-radius: 10px;">
            <div class="mb-3">
                <label for="name" class="form-label fw-bold">이름</label>
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    v-model="formData.name"
                    ref="name"
                >
                <p class="text-danger mt-2 small" v-if="errorMessage[1] === 1">{{ errorMessage[0] }}</p>
            </div>

            <div class="mb-3">
                <label for="age" class="form-label fw-bold">나이</label>
                <input
                    type="number"
                    class="form-control"
                    id="age"
                    v-model.number="formData.age"
                    ref="age"
                >
                <p class="text-danger mt-2 small" v-if="errorMessage[1] === 2">{{ errorMessage[0] }}</p>
            </div>

            <div class="mb-3">
                <label class="form-label fw-bold">성별</label>
                <div class="d-flex gap-4 pt-1">
                    <div class="form-check custom-radio">
                        <input class="form-check-input" type="radio" name="sex" id="male" value="남" v-model="formData.sex" ref="sex">
                        <label class="form-check-label" for="male">남</label>
                    </div>
                    <div class="form-check custom-radio">
                        <input class="form-check-input" type="radio" name="sex" id="female" value="여" v-model="formData.sex">
                        <label class="form-check-label" for="female">여</label>
                    </div>
                </div>
                <p class="text-danger mt-2 small" v-if="errorMessage[1] === 3">{{ errorMessage[0] }}</p>
            </div>

            <div class="mb-4">
                <label class="form-label fw-bold">기록</label>
                <div class="row g-2">
                    <div class="col-3" v-for="style in strokeTypes" :key="style.key">
                        <div class="stroke-box">
                            <label :for="style.key" class="stroke-label">{{ style.label }}</label>
                            <input
                                type="text"
                                class="form-control text-center stroke-input"
                                :id="style.key"
                                v-model="formData.records[style.key]"
                                :ref="style.key"
                                placeholder="00"
                            >
                        </div>
                    </div>
                </div>
                <p class="text-danger mt-2 small" v-if="errorMessage[1] === 4">{{ errorMessage[0] }}</p>
            </div>

            <button type="submit" class="btn btn-submit w-100">
                등 록
            </button>
        </form>

        <hr class="my-4">

        <div>
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="fw-bold m-0">등록된 기록 리스트 ({{ apiData.length }}명)</h5>
                <button v-if="apiData.length" class="btn btn-outline-secondary btn-sm" @click="downloadExcel">
                    📥 엑셀 다운로드
                </button>
            </div>

            <div v-if="apiData.length === 0" class="text-center py-5 text-muted bg-light rounded">
                등록된 기록이 없습니다.
            </div>

            <div
                v-for="item in apiData.slice().reverse()"
                :key="item.key"
                class="record-card mb-3"
            >
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <div class="user-info">
                        <span class="user-name">{{ item.name }}</span>
                        <span class="user-meta">{{ item.age }}세</span>
                        <span class="user-meta">{{ item.sex }}</span>
                    </div>
                    <button @click="deleteRecord(item.key)" class="btn btn-delete btn-sm">삭제</button>
                </div>
                <div class="record-grid">
                    <div class="record-item">접 : {{ item.records?.butterfly || 0 }}</div>
                    <div class="record-item">배 : {{ item.records?.backstroke || 0 }}</div>
                    <div class="record-item">평 : {{ item.records?.breaststroke || 0 }}</div>
                    <div class="record-item">자 : {{ item.records?.freestyle || 0 }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getDatabase, ref, set, onValue, push, remove } from "firebase/database";
import * as XLSX from 'xlsx-js-style';

export default {
    data() {
        return {
            dbPath: "swimming_records", // 기록 전용 새로운 DB 경로
            apiData: [],
            formData: {
                name: '',
                age: '',
                sex: '남', // 이미지 기본값인 '남' 선택 처리
                records: {
                    butterfly: '',    // 접영
                    backstroke: '',   // 배영
                    breaststroke: '', // 평영
                    freestyle: ''     // 자유형
                }
            },
            strokeTypes: [
                { key: 'butterfly', label: '접영' },
                { key: 'backstroke', label: '배영' },
                { key: 'breaststroke', label: '평영' },
                { key: 'freestyle', label: '자유형' }
            ],
            errorMessage: ['', 0]
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        // 실시간 Firebase 데이터 가져오기
        getData() {
            const db = getDatabase();
            const dbRef = ref(db, this.dbPath);
            onValue(dbRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    this.apiData = Object.keys(data).map(key => ({
                        key,
                        ...data[key]
                    }));
                } else {
                    this.apiData = [];
                }
            });
        },

        // 유효성 검사
        validateForm() {
            const f = this.formData;
            if (!f.name.trim()) return this.setError("이름을 입력해주세요.", 1, 'name');
            if (!f.age) return this.setError("나이를 입력해주세요.", 2, 'age');
            if (!f.sex) return this.setError("성별을 선택해주세요.", 3, 'sex');

            // 기록 중 하나라도 입력되었는지 확인 (모두 비어있으면 안 됨)
            const hasRecord = Object.values(f.records).some(val => val.trim() !== '');
            if (!hasRecord) return this.setError("최소 한 종목 이상의 기록을 입력해주세요.", 4, 'butterfly');

            return true;
        },

        setError(msg, no, refName) {
            this.errorMessage = [msg, no];
            if (this.$refs[refName]) {
                const target = Array.isArray(this.$refs[refName]) ? this.$refs[refName][0] : this.$refs[refName];
                target.focus();
            }
            return false;
        },

        // 데이터 등록
        submitForm() {
            if (!this.validateForm()) return;

            const db = getDatabase();
            const newListRef = push(ref(db, this.dbPath));

            set(newListRef, this.formData)
            .then(() => {
                alert("기록 등록이 완료되었습니다!");
                this.resetForm();
            })
             .catch((error) => {
                console.error("저장 오류:", error);
                alert("등록에 실패했습니다.");
            });
        },

        // 데이터 삭제
        deleteRecord(key) {
            if (!confirm("해당 기록을 정말 삭제하시겠습니까?")) return;

            const db = getDatabase();
            remove(ref(db, `${this.dbPath}/${key}`))
            .then(() => {
                alert("삭제되었습니다.");
            })
             .catch((error) => {
                console.error("삭제 실패:", error);
            });
        },

        // 폼 초기화
        resetForm() {
            this.formData = {
                name: '',
                age: '',
                sex: '남',
                records: {
                    butterfly: '',
                    backstroke: '',
                    breaststroke: '',
                    freestyle: ''
                }
            };
            this.errorMessage = ['', 0];
        },

        // 엑셀 다운로드 기능 확장
        downloadExcel() {
            if (!this.apiData.length) return;

            const excelData = this.apiData.map((item, index) => ({
                번호: index + 1,
                이름: item.name,
                나이: item.age,
                성별: item.sex,
                접영: item.records?.butterfly || '-',
                배영: item.records?.backstroke || '-',
                평영: item.records?.breaststroke || '-',
                자유형: item.records?.freestyle || '-'
            }));

            const worksheet = XLSX.utils.json_to_sheet(excelData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "수영_기록_명단");
            XLSX.writeFile(workbook, "수영_기록_명단.xlsx");
        }
    }
};
</script>

<style scoped>
/* 제공된 UI 디자인 가이드라인 맞춤 스타일링 */

/* 종목별 입력 박스 스타일 */
.stroke-box {
    border: 1px solid #333;
    border-radius: 12px;
    padding: 8px 4px;
    text-align: center;
    background: #fff;
}
.stroke-label {
    display: block;
    font-weight: bold;
    font-size: 15px;
    margin-bottom: 6px;
    color: #001e33;
}
.stroke-input {
    border: none;
    font-size: 16px;
    font-weight: bold;
    padding: 2px;
}
.stroke-input:focus {
    outline: none;
    box-shadow: none;
    background-color: #f0f7ff;
}

/* 등록 버튼 스타일 */
.btn-submit {
    background-color: #00a2e8;
    color: white;
    border: 1px solid #001e33;
    border-radius: 5px;
    padding: 8px;
    font-size: 16px;
    transition: background 0.2s;
}
.btn-submit:hover {
    background-color: #0089c4;
    color: white;
}

/* 하단 결과 리스트 카드 스타일 */
.record-card {
    border: 1px solid #001e33;
    border-radius: 18px;
    padding: 12px 15px;
    background: #ffffff;
}
.user-name {
    font-size: 16px;
    font-weight: bold;
    color: #001e33;
    margin-right: 15px;
}
.user-meta {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    margin-right: 15px;
}
.record-grid {
    display: flex;
    justify-content: flex-start;
    gap: 15px;
    margin-top: 8px;
}
.record-item {
    font-size: 16px;
    font-weight: 500;
    color: #000;
}
.btn-delete {
    border: 1px solid #ff1f1f;
    background: #ff4d4f;
    color: #ffffff;
    border-radius: 12px;
    font-weight: bold;
    padding: 4px 10px;
    font-size: 10px;
}
.btn-delete:hover {
    background: #e03b3d;
    color: #fff;
}
</style>