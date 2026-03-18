<template>
    <div>
        <div class="col-12">
            <div class="col-12 p-1" >
                <div
                    class="boxstyle3 diary"
                    style="font-size: 30px; height: 250px;"
                    @click="$router.push('/swimming_competition')"
                >
                    <p>📢 창원 클럽 대항전 📢</p>
                    <p>
                        26년 3월 29일<br>
                        팀 ZONE5 신청
                    </p>
                </div>
            </div>
        </div>
        <div class="col-12 p-1">
            <div
                class="boxstyle5"
                style="font-size: 20px; "
            >
                신청마감 2월 11일 오후 4시 까지
            </div>
        </div>

        <div class="col-12 p-1 mb-5">
            <div
                class="boxstyle5"
                style="font-size: 20px; "
            >
                팀명 ZONE5 (50명제한)
            </div>
        </div>

        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="name" class="form-label fw-bold">1. 성함</label>
                <input type="text" class="form-control" id="name" v-model="formData.name" ref="name" placeholder="홍길동">
                <p class="text-danger mt-2" v-if="errorMessage[1] === 1">{{errorMessage[0]}}</p>
            </div>
            <!--<div class="mb-3">-->
            <!--    <label for="sex" class="form-label fw-bold">2. 성별(남,여)로 입력</label>-->
            <!--    <input type="text" class="form-control" id="sex" v-model="formData.sex" ref="sex">-->
            <!--    <p class="text-danger mt-2" v-if="errorMessage[1] === 2">{{errorMessage[0]}}</p>-->
            <!--</div>-->
            <div class="mb-3">
                <label for="age" class="form-label fw-bold">3. 생년월일(800523-1)</label>
                <input type="text" class="form-control" id="age" v-model="formData.age" ref="age" placeholder="800523-1">
                <p class="text-danger mt-2" v-if="errorMessage[1] === 3">{{errorMessage[0]}}</p>
            </div>
            <div class="mb-3">
                <label for="phone" class="form-label fw-bold">4. 저나보노(010-3637-1234)</label>
                <input type="text" class="form-control" id="phone" v-model="formData.phone" ref="phone" placeholder="010-3637-1234">
                <p class="text-danger mt-2" v-if="errorMessage[1] === 4">{{errorMessage[0]}}</p>
            </div>
            <div class="mb-3">
                <label class="form-label fw-bold">5. 나이에 맞는 본인 그룹 선택</label>
                <div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="group" id="group1" value="1그룹" v-model="formData.group" ref="group">
                        <label class="form-check-label" for="group1">1그룹 (고등학생∼2007년)</label>
                    </div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="group" id="group2" value="2그룹" v-model="formData.group" ref="group">
                        <label class="form-check-label" for="group2">2그룹 (1997년∼2006년)</label>
                    </div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="group" id="group3" value="3그룹" v-model="formData.group" ref="group">
                        <label class="form-check-label" for="group3">3그룹 (1987년∼1996년)</label>
                    </div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="group" id="group4" value="4그룹" v-model="formData.group" ref="group">
                        <label class="form-check-label" for="group4">4그룹 (1977년∼1986년)</label>
                    </div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="group" id="group5" value="5그룹" v-model="formData.group" ref="group">
                        <label class="form-check-label" for="group5">5그룹 (1967년~1976년)</label>
                    </div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="group" id="group5" value="6그룹" v-model="formData.group" ref="group">
                        <label class="form-check-label" for="group5">6그룹 (1966년 이전)</label>
                    </div>
                </div>
                <p class="text-danger mt-2" v-if="errorMessage[1] === 5">{{errorMessage[0]}}</p>
            </div>
            <div class="mb-3">
                <label class="form-label fw-bold">6. 종목 1</label>
                <div>
                    <div class="form-check d-inline-block me-3" v-for="(ev, idx) in events" :key="'ev1_'+idx">
                        <input class="form-check-input" type="radio" name="events1" :id="'ev1_'+idx" :value="ev" v-model="formData.events1" ref="events1">
                        <label class="form-check-label" :for="'ev1_'+idx">{{ ev }}</label>
                    </div>
                </div>
                <p class="text-danger mt-2" v-if="errorMessage[1] === 6">{{errorMessage[0]}}</p>
            </div>

            <div class="mb-3">
                <label class="form-label fw-bold">7. 종목 2</label>
                <div>
                    <div class="form-check d-inline-block me-3" v-for="(ev, idx) in events" :key="'ev2_'+idx">
                        <input class="form-check-input" type="radio" name="events2" :id="'ev2_'+idx" :value="ev" v-model="formData.events2" ref="events2">
                        <label class="form-check-label" :for="'ev2_'+idx">{{ ev }}</label>
                    </div>
                </div>
                <p class="text-danger mt-2" v-if="errorMessage[1] === 7">{{errorMessage[0]}}</p>
            </div>
            <!--<div class="mb-3">-->
            <!--    <label class="form-label fw-bold">8. 티샤스 사이즈</label>-->
            <!--    <div>-->
            <!--        <div class="form-check d-inline-block me-3"> &lt;!&ndash; d-inline-block을 사용하여 인라인 블록으로 설정 &ndash;&gt;-->
            <!--            <input class="form-check-input" type="radio" name="tsize" id="tsize" value="S" v-model="formData.tsize" ref="tsize">-->
            <!--            <label class="form-check-label" for="tsize">S</label>-->
            <!--        </div>-->
            <!--        <div class="form-check d-inline-block me-3"> &lt;!&ndash; d-inline-block을 사용하여 인라인 블록으로 설정 &ndash;&gt;-->
            <!--            <input class="form-check-input" type="radio" name="tsize" id="tsize" value="M" v-model="formData.tsize" ref="tsize">-->
            <!--            <label class="form-check-label" for="tsize">M</label>-->
            <!--        </div>-->
            <!--        <div class="form-check d-inline-block me-3"> &lt;!&ndash; d-inline-block을 사용하여 인라인 블록으로 설정 &ndash;&gt;-->
            <!--            <input class="form-check-input" type="radio" name="tsize" id="tsize" value="L" v-model="formData.tsize" ref="tsize">-->
            <!--            <label class="form-check-label" for="tsize">L</label>-->
            <!--        </div>-->
            <!--        <div class="form-check d-inline-block me-3"> &lt;!&ndash; d-inline-block을 사용하여 인라인 블록으로 설정 &ndash;&gt;-->
            <!--            <input class="form-check-input" type="radio" name="tsize" id="tsize" value="XL" v-model="formData.tsize" ref="tsize">-->
            <!--            <label class="form-check-label" for="tsize">XL</label>-->
            <!--        </div>-->
            <!--        <div class="form-check d-inline-block me-3"> &lt;!&ndash; d-inline-block을 사용하여 인라인 블록으로 설정 &ndash;&gt;-->
            <!--            <input class="form-check-input" type="radio" name="tsize" id="tsize" value="XXL" v-model="formData.tsize" ref="tsize">-->
            <!--            <label class="form-check-label" for="tsize">XXL</label>-->
            <!--        </div>-->
            <!--    </div>-->
            <!--    <p class="text-danger mt-2" v-if="errorMessage[1] === 8">{{errorMessage[0]}}</p>-->
            <!--</div>-->
            <div class="mb-3">
                <label for="size" class="form-label fw-bold">9. 대회 참가비</label>
                <select class="form-select" id="size" v-model="formData.ok" ref="sizeSelect">
                    <option value="" disabled>대회 참가비 확인</option>
                    <option value="대회 참가비 확인함">대회 참가비 3만원</option>
                </select>
                <p class="text-danger mt-2" v-if="errorMessage[1] === 9">{{errorMessage[0]}}</p>
            </div>
            <div class="mb-3">
                <label class="form-label fw-bold">면책 동의</label>
                <div class="d-flex justify-content-end">
                    <div class="form-check me-3">
                        <input class="form-check-input" type="radio" name="liabilityAgreement" id="agree" value="agree" v-model="formData.liabilityAgreement" ref="agreeRadio">
                        <label class="form-check-label" for="agree">동의</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="liabilityAgreement" id="disagree" value="disagree" v-model="formData.liabilityAgreement">
                        <label class="form-check-label" for="disagree">비동의</label>
                    </div>
                </div>
                <div class="form-control mt-2" style="font-size: 11px; height: 100px; overflow-y: auto; border: 1px solid #ced4da; padding: 0.375rem 0.75rem; border-radius: 0.25rem; white-space: pre-wrap;">
                    보노보노물보노 동호회(이하 "보노")는 개인의 개별가입과 동시에 "보노"에서 개최하는 모든 행사 및 모임관련 일체(온.오프라인) 행사에 . 본인의  개인정보를 수집 · 이용함을 설명 · 안내 받았으며, "보노"에서 정보를 제공하는 일체의 활동에 대해 면책 동의가 적용된다 것에 동의한다. (게스트: 보노회원이 동반한 회원의 지인 포함)<br>
                    <br>
                    이 면책 동의서는 "보노" 모임 시작과 동시에 효력이 발생하며 "보노"에서 주최하는 모든 모임의 안전사고와 재해사고 및 재해 사망사고 시 일체의 책임(민,형사상)을 본 동호회 운영진과 회원 및 모든 참가자에게 그 책임을 전가하지 못하며 또한 본인 이외에 법적 대리인(직계존속 등)도 그 책임을 본 동호회에 전가하지 아니한다. 사고자는 본인의 자발적인 동호회행사에 참가하였으며, 모든 책임은 본인의 과실로 인정한다.(게스트: 회원이 동반한 회원의 지인에게도 동일하게 적용됨)<br>
                    <br>
                    비록 자필서명이 없더라도 면책동의 후 행사신청 또는 참석 시 본 동호회에 면책동의를 한것으로 간주한다.<br>
                    이에 각 개인은 면책동의에 대한  설명 · 안내 받았으며, 상기의 면책동의서 사항에 다시 한번 동의함을 확인한다.<br>
                </div>
                <p class="text-danger mt-2" v-if="errorMessage[1] === 10">{{errorMessage[0]}}</p>
            </div>
            <button
                type="submit"
                class="btn w-100"
                :class="isDeadlinePassed || apiData.length === firstComeLimit ? 'btn-danger' : 'btn-primary'"
                :disabled="isDeadlinePassed || apiData.length === firstComeLimit"
            >
                {{isDeadlinePassed || apiData.length === firstComeLimit ? '마감' : '신청'}} ({{apiData.length}} / {{ firstComeLimit }})
                <span style="font-weight: bold; padding-left:10px;" v-if="!isDeadlinePassed && apiData.length < firstComeLimit">{{ remainingTime }}</span>
            </button>
            <div style="font-size:15px; background:#f9fbfd; border:1px solid #e5e8eb; border-radius:6px; padding:14px 16px; margin:24px 0; max-width:420px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <label class="form-label fw-bold" style="margin:0;">💳 입금 계좌번호 안내</label>
                    <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                        @click="copyAccountNumber"
                        style="font-size:11px; padding:2px 6px;">
                        입금 계좌번호 복사
                    </button>
                </div>

                <p ref="accountText" style="font-size:15px; font-weight:bold; color:#1a1a1a; margin:0 0 10px;">
                    {{accountText}}
                </p>

                <div style="background:#f1f5f9; border-radius:4px; padding:8px 10px;">
                    <p style="font-size:13px; font-weight:bold; margin:0 0 4px; color:#333;">※ 환불 규정</p>
                    <ul style="font-size:13px; margin:0; padding-left:18px; line-height:2.2;">
                        <li>대회 신청마감후 환불 불가</li>
                        <li>입금 후 미참석자는 환불 불가</li>
                        <li style="font-size:13px;">
                            입금 후
                            <span style="font-size:12px; background:#ffec99; color:#7a5900; padding:1px 8px; border-radius:12px; font-weight:bold; border:1px solid #ffd324;">
                                미입금
                            </span>
                            &nbsp;→
                            <span style="font-size:12px; background:#81c784; color:#1b5e20; padding:1px 8px; border-radius:12px; font-weight:bold; border:1px solid #4caf50;">
                                입완
                            </span>
                            &nbsp;버튼 클릭
                        </li>
                        <li style="font-size:13px;">
                            종목 변경은
                            <span style="font-size:12px; background:#ff4d4f; color:#ffffff; padding:1px 8px; border-radius:12px; font-weight:bold; border:1px solid #ff1f1f;">
                                삭제
                            </span>
                            &nbsp;후 다시
                            <span style="font-size:12px; background:#ff69b4; color:#ffffff; padding:1px 8px; border-radius:12px; font-weight:bold; border:1px solid #ff1493;">
                                신청
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </form>
        <div class="col-12 p-1">
            <div
                class="boxstyle6"
                style="font-size: 20px; "
            >
                <a href="https://open.kakao.com/o/gkA9Izfi" target="_blank" style="text-decoration: none; color: inherit;">
                    ZONE5 창원 대회 채팅방 (실명)
                </a>
            </div>
        </div>
        <div class="mt-3">
            <div class="mt-3 text-right">
                <button class="btn btn-primary btn-sm" @click="downloadExcel">
                    📥 신청자 엑셀 다운로드
                </button>
            </div>
            <p style="font-size: 12px; padding: 0 0 0 10px; text-align: right; margin-top:20px;">대회 신청자 {{apiData.length}}명</p>
            <div
                v-for="(item) in apiData.slice().reverse()"
                :key="item.key"
                class="mb-2"
                style="padding:10px; border:1px solid #dee2e6; border-radius: 5px; font-size: 15px"
            >
                <!-- 상단 버튼 영역 -->
                <div class="d-flex justify-content-between">
                    <!-- 오른쪽: 대회비 버튼 -->
                    <button
                        class="btn"
                        :class="{ 'paid': item.paid, 'unpaid': !item.paid }"
                        style="padding:0.2rem 0.5rem; font-size:10px; margin-right:8px; border-radius:12px; font-weight:bold; border:1px solid;"
                        @click="togglePayment(item.key)"
                    >
                        {{ item.paid ? '대회비 입완' : '대회비 미입금' }}
                    </button>
                    <button
                        @click="deleteApplicant(item.key)"
                        class="btn"
                        style="padding:0.2rem 0.5rem; font-size:10px; margin-left:8px; border-radius:12px; font-weight:bold; border:1px solid #ff1f1f; background:#ff4d4f; color:#ffffff;"
                    >
                        삭제
                    </button>
                </div>

                <!-- 하단 사용자 정보 -->
                <div class="font-weight-bold mt-1">
                    <!--{{ item.name }}, {{ item.sex }}, {{ item.age }}, {{ formatPhone(item.phone) }},-->
                    {{ item.name }}, {{ item.age }}, {{ formatPhone(item.phone) }},
                </div>
                <div class="font-weight-bold">
                    {{ item.group }}, {{ item.events1 }}, {{ item.events2 }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getDatabase, ref, set, get, onValue, push, remove, update } from "firebase/database";
import * as XLSX from "xlsx"; // 추가

export default {
    data(){
        return {
            dbPath: "competition",
            apiData: [], // DB 데이터를 바로 사용
            formData  :{
                checked      :'',
                name      :'',
                age      :'',
                // sex      :'',
                phone      :'',
                group      :'',
                events1      :'',
                events2      :'',
                // tsize      :'',
                paid   :"",
                ok:'',
                liabilityAgreement: ''
            },
            groups: [
                { id: 'group1', val: '1그룹', text: '1그룹 (고등학생∼2007년)' },
                { id: 'group2', val: '2그룹', text: '2그룹 (1997년∼2006년)' },
                { id: 'group3', val: '3그룹', text: '3그룹 (1987년∼1996년)' },
                { id: 'group4', val: '4그룹', text: '4그룹 (1977년∼1986년)' },
                { id: 'group5', val: '5그룹', text: '5그룹 (1967년~1976년)' },
                { id: 'group6', val: '6그룹', text: '6그룹 (1966년 이전)' },
            ],
            events: ['자유형50', '평영50', '배영50', '접영50', '핀자유형50', '핀접영50'],
            firstComeLimit: 50,
            deadline: new Date('2026-03-11T15:59:59'),
            remainingTime: "계산 중...", // 남은 시간 초기값
            isDeadlinePassed: false, // 마감 여부를 체크하는 변수
            errorMessage: ['', 0],
            accountText: '3333-20-4133950 카카오뱅크 노원기 30,000원'
        };
    },
    mounted(){
        this.startTimer();
        this.getData();

    },
    beforeDestroy() {
        if (this.intervalId) clearInterval(this.intervalId);
    },
    methods:{
        getData(){
            const db = getDatabase();
            const dbRef = ref(db, this.dbPath);
            onValue(dbRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    // Firebase 객체를 배열로 변환하고 key 포함
                    this.apiData = Object.keys(data).map(key => ({
                        key,
                        ...data[key]
                    }));
                } else {
                    this.apiData = [];
                }
            });
        },
        // 타이머 로직
        startTimer() {
            this.updateRemainingTime();
            this.intervalId = setInterval(this.updateRemainingTime, 1000);
        },
        updateRemainingTime() {
            const now = new Date();
            const timeDiff = this.deadline - now;

            if (timeDiff <= 0) {
                this.isDeadlinePassed = true;
                this.remainingTime = "마감되었습니다.";
                clearInterval(this.intervalId);
            } else {
                const totalSeconds = Math.floor(timeDiff / 1000);
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = totalSeconds % 60;
                this.remainingTime = `${hours}시간 ${minutes}분 ${seconds}초`;
            }
        },
        // 폼 유효성 검사
        validateForm() {
            const { name, age, phone, group, events1, events2, ok, liabilityAgreement } = this.formData;
            const checks = [
                { val: name, msg: "성함을 입력해주세요", no: 1, ref: 'name' },
                { val: age, msg: "생년월일 형식을 확인해주세요", no: 3, ref: 'age' },
                { val: phone, msg: "전화번호를 입력해주세요", no: 4, ref: 'phone' },
                { val: group, msg: "그룹을 선택해주세요", no: 5, ref: 'group' },
                { val: events1, msg: "종목 1을 선택해주세요", no: 6, ref: 'events1' },
                { val: events2, msg: "종목 2를 선택해주세요", no: 7, ref: 'events2' },
                { val: ok, msg: "입금 확인을 선택해주세요", no: 9, ref: 'sizeSelect' },
                { val: liabilityAgreement === 'agree', msg: "면책 동의가 필요합니다", no: 10, ref: 'agreeRadio' }
            ];

            for (let check of checks) {
                if (!check.val) {
                    this.errorMessage = [check.msg, check.no];
                    this.$refs[check.ref].focus();
                    return false;
                }
            }
            return true;
        },

        submitForm() {
            if (!this.validateForm()) return;
            if (this.apiData.length >= this.firstComeLimit) {
                alert("정원이 초과되었습니다.");
                return;
            }

            const db = getDatabase();
            const newListRef = push(ref(db, this.dbPath));

            set(newListRef, { ...this.formData, paid: false })
            .then(() => {
                alert("신청이 완료되었습니다!");
                this.resetForm();
            })
             .catch((error) => {
                console.error("저장 오류:", error);
                alert("저장에 실패했습니다.");
            });
        },
        togglePayment(key) {
            const item = this.apiData.find(i => i.key === key);
            if (!item) return;

            const db = getDatabase();
            update(ref(db, `${this.dbPath}/${key}`), { paid: !item.paid })
            .then(() => {
                console.log("상태가 업데이트되었습니다.");
            })
             .catch((error) => {
                console.error("업데이트 실패:", error);
            });
        },
        deleteApplicant(key) {
            if (!confirm("정말 삭제하시겠습니까?")) return;

            const db = getDatabase();
            remove(ref(db, `${this.dbPath}/${key}`))
            .then(() => {
                alert("삭제되었습니다.");
            })
             .catch((error) => {
                console.error("삭제 실패:", error);
            });
        },
        resetForm() {
            this.formData = {
                name: '', age: '', phone: '', group: '',
                events1: '', events2: '', paid: false, ok: '',
                liabilityAgreement: ''
            };
            this.errorMessage = ['', 0];
        },
        formatPhone(phone) {
            if (!phone) return '';

            // 1. 숫자만 남기기 (010-3637-1234 -> 01036371234)
            const cleanNumber = phone.replace(/[^0-9]/g, '');

            // 2. 가운데 4자리를 마스킹 (01036371234 -> 010-****-1234)
            // $1: 앞 3자리(010), $2: 가운데 3~4자리, $3: 마지막 4자리
            return cleanNumber.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-****-$3');
        },
        copyAccountNumber() {
            navigator.clipboard.writeText(this.accountText)
            .then(() => alert("계좌번호가 복사되었습니다."))
                      .catch(() => alert("복사 실패"));
        },
        downloadExcel() {
            if (!this.apiData.length) {
                alert("다운로드할 신청자가 없습니다.");
                return;
            }

            // 엑셀용 데이터 변환
            const excelData = this.apiData.map((item, index) => ({
                번호: index + 1,
                이름: item.name,
                생년월일: item.age,
                // 성별: item.sex,
                그룹: item.group,
                종목1: item.events1,
                종목2: item.events2,
                전화번호: item.phone,
                대회비: item.paid ? "입금완료" : "미입금"
            }));

            // 워크시트 생성
            const worksheet = XLSX.utils.json_to_sheet(excelData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "zone5 신청자명단");

            // 파일 다운로드
            XLSX.writeFile(workbook, "zone5 신청자명단.xlsx");
        }
    }
};
</script>

<style>
/* 스타일 추가 (예: form 스타일링) */
</style>

