<template>
    <div>
        <!--<img src="@/assets/image/superbono.jpg" class="img-fluid" alt="썸네일">-->
        <!--<h2 class="page_title mb-4">📣📣슈퍼보노 7월 12일 7시 정관 아쿠아드림파크 📣📣</h2>-->
        <!--<h2 class="page_title mb-4">📣📣슈퍼보노 7월 5일 2시-4시📣📣<br>선착순 {{firstComeLimit}}명 </h2>-->
        <h2 class="mb-4 text-center">신청서 작성</h2>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="name" class="form-label fw-bold">이름</label>
                <input type="text" class="form-control" id="name" v-model="formData.name" ref="nameInput">
                <p class="text-danger mt-2" v-if="errorMessage[1] === 1">{{errorMessage[0]}}</p>
            </div>
            <div class="mb-3">
                <label class="form-label fw-bold">소속</label>
                <div>
                    <div class="form-check d-inline-block me-3 mt-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="affiliation" id="bonobono" value="보노보노" v-model="formData.affiliation" ref="affiliationRadios">
                        <label class="form-check-label" for="bonobono">보노보노</label>
                    </div>
                    <!--<div class="form-check d-inline-block me-3 mt-3"> &lt;!&ndash; d-inline-block을 사용하여 인라인 블록으로 설정 &ndash;&gt;-->
                    <!--    <input class="form-check-input" type="radio" name="affiliation" id="zoo" value="팀동물원" v-model="formData.affiliation">-->
                    <!--    <label class="form-check-label" for="zoo">팀동물원</label>-->
                    <!--</div>-->
                    <!--<div class="form-check d-inline-block me-3 mt-3"> &lt;!&ndash; d-inline-block을 사용하여 인라인 블록으로 설정 &ndash;&gt;-->
                    <!--    <input class="form-check-input" type="radio" name="affiliation" id="shoulder" value="어깨탈골" v-model="formData.affiliation">-->
                    <!--    <label class="form-check-label" for="shoulder">팀어깨이</label>-->
                    <!--</div>-->
                    <!--<div class="form-check d-inline-block me-3 mt-3"> &lt;!&ndash; d-inline-block을 사용하여 인라인 블록으로 설정 &ndash;&gt;-->
                    <!--    <input class="form-check-input" type="radio" name="affiliation" id="gosu" value="팀김다은" v-model="formData.affiliation">-->
                    <!--    <label class="form-check-label" for="gosu">팀김다은</label>-->
                    <!--</div>-->
                    <!--<div class="form-check d-inline-block me-3 mt-3"> &lt;!&ndash; d-inline-block을 사용하여 인라인 블록으로 설정 &ndash;&gt;-->
                    <!--    <input class="form-check-input" type="radio" name="affiliation" id="gosu" value="팀고수정" v-model="formData.affiliation">-->
                    <!--    <label class="form-check-label" for="gosu">팀고수정</label>-->
                    <!--</div>-->
                    <!--<div class="form-check d-inline-block me-3 mt-3"> &lt;!&ndash; d-inline-block을 사용하여 인라인 블록으로 설정 &ndash;&gt;-->
                    <!--    <input class="form-check-input" type="radio" name="affiliation" id="umpa" value="음파핫" v-model="formData.affiliation">-->
                    <!--    <label class="form-check-label" for="umpa">음파핫</label>-->
                    <!--</div>-->
                    <!--<div class="form-check d-inline-block me-3 mt-3"> &lt;!&ndash; d-inline-block을 사용하여 인라인 블록으로 설정 &ndash;&gt;-->
                    <!--    <input class="form-check-input" type="radio" name="affiliation" id="kimboss" value="KIMBOSS" v-model="formData.affiliation">-->
                    <!--    <label class="form-check-label" for="kimboss">KIMBOSS</label>-->
                    <!--</div>-->

                    <!-- 기타 옵션 -->
                    <div class="form-check mt-3 d-flex align-items-center"> <!-- d-flex 클래스를 사용하여 flexbox로 정렬 -->
                        <input class="form-check-input" type="radio" name="affiliation" id="other" value="기타" v-model="formData.affiliation">
                        <label class="form-check-label me-2" for="other">기타</label> <!-- 오른쪽 마진 추가 -->
                        <input
                            type="text"
                            class="form-control"
                            v-model="formData.otherAffiliation"
                            placeholder="ex) 배하정 지인, 게스트"
                            :disabled="formData.affiliation !== '기타'"
                            style="width: auto; flex-grow: 1;"
                        >
                    </div>
                </div>
                <p class="text-danger mt-2" v-if="errorMessage[1] === 2">{{errorMessage[0]}}</p>
            </div>
            <div class="mb-3">
                <label for="openClass" class="form-label fw-bold">레대비 + 입장료</label>
                <select class="form-select" id="openClass" v-model="formData.openClass" ref="openClassSelect">
                    <option value="" disabled>비용 확인</option>
                    <option value="비용 확인">레대비 + 입장료 10,000</option>
                </select>
                <p class="text-danger mt-2" v-if="errorMessage[1] === 3">{{errorMessage[0]}}</p>
            </div>
            <div style="background:#f6faff; border:1px solid #eee; border-radius: 2px; padding:10px; margin: 30px 0">
                <label class="form-label fw-bold">보노보노 정모 안내</label>
                <p style="font-size:12px;">
                    📣📣 훈련 장소 정관 아쿠아드림파크 새벽 7시 (1시간)📣📣<br>
                    1. 아드파 레인 대여는 7시 부터 시작 입니다<br>
                    2. 7시 입장은 입장료 포함<br>
                    3. 6시 입장은 개별 입장 하여 자유 수영 가능<br>
                    4. 게스트 참여 가능<br>
                    5. 9월 19일 까지 신청 가능<br>
                    6. 30명 이상 참여 불가<br>
                    <!--2. 코치진 (황영균, 안소현, 강민규) <br>-->
                    <!--3. 50미터 레인 1시간 (울트라핀, 대쉬 연습)<br>-->
                    <!--4. 6시 입장하실분은 입장료 별도로 끊고 입장하시면 됩니다.<br>-->
                    ! 문의사항은 인스타그램 댓글/DM 으로 남겨주세요.<br>
                </p>
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
                <p class="text-danger mt-2" v-if="errorMessage[1] === 4">{{errorMessage[0]}}</p>
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


            <div style="background:#f6faff; border:1px solid #eee; border-radius: 2px; padding:10px; margin: 30px 0">
                <label class="form-label fw-bold">입금 계좌번호 안내</label> <button type="button" class="btn btn-sm btn-outline-secondary" @click="copyAccountNumber" style="font-size:10px">계좌번호 복사</button>
                <p class="highlighted-text" ref="accountText">79420390777 카카오뱅크 배하정 (보노보노) 10,000원</p>
                <!--<div class="refund-policy">-->
                <!--    <p>※ 환불규정</p>-->
                <!--    <ul>-->
                <!--        &lt;!&ndash;<li>입장 최소 인원 10명 미달 시 훈련 취소 전액 환불 가능.</li>&ndash;&gt;-->
                <!--        <li>훈련 취소 시 개별 환불 절차가 진행됩니다.</li>-->
                <!--        <li>훈련이 시작되는 매월 3일 전부터 환불 불가</li>-->
                <!--        &lt;!&ndash;<li>입장 최소 인원 결정 및 환불은 스탓벙 진행 후 확정하며 진행 당일 환불 예정입니다. 진행 후에 최종 환불됩니다.</li>&ndash;&gt;-->
                <!--    </ul>-->
                <!--</div>-->

            </div>
        </form>
        <table class="table mt-3">
            <tbody>
            <tr v-for="(item, index) in apiData.slice().reverse()" :key="item.key"> <!-- key를 index로 사용 -->
                <td style="width:20px;">
                    <input class="form-check-input" type="checkbox" v-model="item.checked" @change="updateChecked(item)" style="font-size:16px">
                </td> <!-- 번호를 1부터 시작하도록 설정 -->
                <td style="width:20px;">{{ apiData.length - index  }}</td> <!-- 번호를 1부터 시작하도록 설정 -->
                <td style="width:80px;">{{ item.name }}</td>
                <td>
                    <span v-if="item.affiliation === '기타'">{{ item.otherAffiliation }}</span>
                    <span v-else>{{ item.affiliation }}</span>
                </td>
                <!--<td style="width: 90px">{{ item.openClass }}</td>-->
                <td style="width:60px;" class="text-center">
                    <button
                        class="btn"
                        :class="{
                            'btn-success': item.paid,
                            'btn-warning': !item.paid,
                        }"
                        style="padding: 0.2rem 0.5rem; font-size:10px"
                    >
                        {{ item.paid ? '입금' : '미입금' }}
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { getDatabase, ref, onValue, update, push } from "firebase/database"; // Firebase SDK에서 필요한 모듈을 임포트합니다.

export default {
    metaInfo: {
        title: '슈퍼보노',
        meta: [
            { property: 'og:title', content: '슈퍼보노' },
            { property: 'og:description', content: '강력한 보노보노, "슈퍼보노"가 되다!' },
            { property: 'og:image', content: 'https://moolbono.com/superbono.png' },
            { property: 'og:url', content: 'https://moolbono.com/super_bono' }
        ]
    },
    data(){
        return {
            dbPath: 'superBono', // ← 전역 경로 설정
            formData  :{
                checked      :'',
                name      :'',
                affiliation     :'',
                otherAffiliation:'',
                paid   :"",
                openClass           :'',
                liabilityAgreement: ''
            },
            firstComeLimit: 30,
            deadline: new Date('2025-09-19T23:59:59'),
            remainingTime: "계산 중...", // 남은 시간 초기값
            isDeadlinePassed: false, // 마감 여부를 체크하는 변수
            apiData:[],
            result   :'',
            applicantCount: 0, // 전역 변수 초기화
            errorMessage:'',
            db: null, // 데이터베이스 참조 추가
        };
    },
    mounted(){
        this.updateRemainingTime();
        this.intervalId = setInterval(() => {
            this.updateRemainingTime(); // 화살표 함수로 'this' 바인딩
        }, 1000); // 1초마다 갱신

        this.db = getDatabase(); // Firebase 데이터베이스 초기화
        // this.getData();
        // 데이터 변경 감지를 위해 리스너 추가
        this.dataRef = ref(this.db, this.dbPath); // cheering 경로에 대한 참조
        onValue(this.dataRef, (snapshot) => {
            const getData = snapshot.val() || {};
            this.apiData = Object.keys(getData)
                .map(key => ({
                    key: key, // Firebase에서의 고유 키
                    ...getData[key] // 나머지 데이터
                }));
        });
    },
    beforeDestroy() {
        clearInterval(this.intervalId); // 인터벌 중지
    },
    methods:{
        updateRemainingTime() {
            const now = new Date();
            const timeDiff = this.deadline - now; // 마감 시간과 현재 시간의 차이
            if (timeDiff <= 0) {
                this.isDeadlinePassed = true;  // 마감 시간이 지나면 true로 설정
                this.remainingTime = ""; // 마감되었을 때
            } else {
                const totalSeconds = Math.floor(timeDiff / 1000); // 전체 초
                const hours = Math.floor(totalSeconds / 3600); // 총 시간
                const minutes = Math.floor((totalSeconds % 3600) / 60); // 분
                const seconds = totalSeconds % 60; // 초

                this.isDeadlinePassed = false;  // 마감 시간이 지나지 않으면 false
                this.remainingTime = `${hours}시간 ${minutes}분 ${seconds}초`;  // 총 시간, 분, 초로 표시
            }
        },
        updateChecked(item) {
            if (item) {
                const itemRef = ref(this.db, `${this.dbPath}/${item.key}`);
                update(itemRef, { checked: item.checked })
                .then(() => {
                    console.log("출석 상태 업데이트 완료, 행님!");
                })
                 .catch(error => {
                    console.error('출석체크 업데이트 오류:', error);
                });
            } else {
                console.error('출석체크 오류:', item.key);
            }
        },
        // togglePayment(key) {
        //     const item = this.apiData[key];
        //     item.paid = !item.paid;
        //
        //     // Firebase에 상태 업데이트
        //     this.$axios.put(`${this.apiUrl.replace('.json', '')}/${key}.json`, item)
        //     .then(() => {
        //         console.log('입금 상태가 업데이트되었습니다.');
        //     })
        //         .catch(error => {
        //         console.error('입금 상태 업데이트 오류:', error);
        //     });
        // },
        validateForm() {
            const { name, affiliation, openClass, liabilityAgreement } = this.formData;

            if (!name) {
                this.showMessage("와타시노 나마에와.." , 1); // 사용자에게 메시지 표시
                this.$refs.nameInput.focus(); // 이름 입력 필드에 포커스
                this.$refs.nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 입력 필드로 부드럽게 스크롤
                return false;
            }
            if (!affiliation) {
                this.showMessage("누구냐 너....", 2);
                this.$refs.affiliationRadios.focus(); // 소속 라디오 버튼에 포커스
                this.$refs.affiliationRadios.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 입력 필드로 부드럽게 스크롤
                return false;
            }
            if (!openClass) {
                this.showMessage("얼만지 압니꺼?", 3);
                this.$refs.openClassSelect.focus(); // 수업 선택 드롭다운에 포커스
                this.$refs.openClassSelect.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 입력 필드로 부드럽게 스크롤
                return false;
            }
            if (!liabilityAgreement) {
                this.showMessage("면책 동의좀 해주이소..", 4);
                this.$refs.agreeRadio.focus(); // 면책 동의 라디오 버튼에 포커스
                this.$refs.agreeRadio.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 입력 필드로 부드럽게 스크롤
                return false;
            }
            return true; // 모든 필드가 유효한 경우
        },

        showMessage(message , no) {
            // 메시지를 화면에 표시하는 로직을 구현합니다.
            // 예를 들어, Vue의 data 속성이나 상태 관리 라이브러리를 사용하여 메시지를 표시할 수 있습니다.
            this.errorMessage = [message, no]; // errorMessage는 화면에 표시할 메시지
            // 추가적인 UI 로직을 구현하여 사용자에게 알림을 줄 수 있습니다.
        },

        // getData(){
        //     this.$axios.get(this.apiUrl).then(response => {
        //         const apiData = response.data || {};
        //         this.apiData = Object.keys(apiData)
        //             .filter(key => key !== 'exemptCount') // exemptCount를 제외
        //             .map(key => ({
        //                 key: key, // Firebase에서의 고유 키
        //                 ...apiData[key] // 나머지 데이터
        //             })
        //         );
        //         console.log(' this.apiData',  this.apiData)
        //     }).catch(error => {
        //         console.error("신청자 목록 가져오기 오류:", error);
        //     });
        // },
        submitForm(){
            if(!this.validateForm()){
                return;
            }

            const applicantData = {
                checked         :this.formData.checked,
                name            :this.formData.name,
                affiliation     :this.formData.affiliation,
                otherAffiliation:this.formData.otherAffiliation,
                paid            :false,
                openClass         :this.formData.openClass,
                liabilityAgreement: this.formData.liabilityAgreement // 면책 동의 추가
            };

            push(this.dataRef, applicantData)
            .then(() => {
                this.result = '너 너의 동료가 되라! 완료!';
                alert(this.result)
                // this.getData(); // 신청자 목록 갱신
                this.formData = {
                    checked: '',
                    name : '',
                    affiliation     :'',
                    otherAffiliation:'',
                    paid   :'',
                    openClass           :'',
                    liabilityAgreement: '' // 초기화
                };
            }).catch(error => {
                console.error('데이터 저장 오류:', error);
                this.result = '데이터 저장 오류가 발생했습니다.';
                alert(this.result)
            });
        },
        // deleteApplicant(key) {
        //     // Firebase에서 데이터 삭제
        //     this.$axios.delete(`${this.apiUrl.replace('.json', '')}/${key}.json`).then(() => {
        //         this.getData(); // 신청자 목록 갱신
        //     }).catch(error => {
        //         console.error('삭제 오류:', error);
        //     });
        // },
        copyAccountNumber(event) {
            event.preventDefault(); // 기본 동작 방지
            // 참조된 계좌번호 텍스트 가져오기
            const accountText = '79420390777 카카오뱅크 10,000원'

            // 클립보드에 텍스트 복사
            navigator.clipboard.writeText(accountText)
            .then(() => {
                alert("계좌번호가 복사되었습니다: ");
            })
                      .catch(error => {
                console.error("계좌번호 복사 실패:", error);
            });
        }
    }
};
</script>

<style>
/* 스타일 추가 (예: form 스타일링) */
</style>
