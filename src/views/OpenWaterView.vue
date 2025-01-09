<template>
    <div>
        <!--<img src="@/assets/image/bear.png" class="img-fluid" alt="bear" />-->
        <h2 class="page_title mb-4">11월 24일 일요일 라온호텔앞 6시 30분</h2>
        <!--<p class="text-center">13시 ~ 14시 데크에 다른팀 같이 사용</p>-->
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="name" class="form-label fw-bold">이름</label>
                <input type="text" class="form-control" id="name" v-model="formData.name" ref="nameInput">
                <p class="text-danger mt-2" v-if="errorMessage[1] === 1">{{errorMessage[0]}}</p>
            </div>
            <div class="mb-3">
                <label class="form-label fw-bold">소속</label>
                <div>
                    <div class="form-check d-inline-block me-3"> <!-- d-inline-block을 사용하여 인라인 블록으로 설정 -->
                        <input class="form-check-input" type="radio" name="affiliation" id="bonobono" value="보노보노" v-model="formData.affiliation" ref="affiliationRadios">
                        <label class="form-check-label" for="bonobono">보노보노</label>
                    </div>
                    <!-- 기타 옵션 -->
                    <div class="form-check d-inline-block d-flex align-items-center"> <!-- d-flex 클래스를 사용하여 flexbox로 정렬 -->
                        <input class="form-check-input" type="radio" name="affiliation" id="other" value="기타" v-model="formData.affiliation">
                        <label class="form-check-label me-2" for="other">&nbsp;기타</label> <!-- 오른쪽 마진 추가 -->
                        <input
                            type="text"
                            class="form-control"
                            v-model="formData.otherAffiliation"
                            placeholder="ex) 고수정 친구"
                            :disabled="formData.affiliation !== '기타'"
                            style="width: auto; flex-grow: 1;"
                        >
                    </div>
                </div>
                <p class="text-danger mt-2" v-if="errorMessage[1] === 2">{{errorMessage[0]}}</p>
            </div>
            <div class="mb-3">
                <label for="size" class="form-label fw-bold">장소 시간 확인하세요</label>
                <select class="form-select" id="size" v-model="formData.ok" ref="sizeSelect">
                    <option value="" disabled>바수 장소 및 시간</option>
                    <option value="장소, 시간 확인함">11월 24일 송정 라온호텔앞 6시 30분 집합</option>
                </select>
                <p class="text-danger mt-2" v-if="errorMessage[1] === 3">{{errorMessage[0]}}</p>
            </div>
            <div style="background:#f6faff; border:1px solid #eee; border-radius: 2px; padding:10px; margin: 30px 0">
                <label class="form-label fw-bold">보노보노 바다수영 안내</label>
                <p style="font-size:12px;">
                    ※ 수트, 부이, 핀등 개인장비 준비해서 오세요<br>
                    1. 공지된 시간에 주차장에 모여 준비합니다.<br>
                    2. 20분 내외 준비후 백사장에서 체조후 입수<br>
                    3. 거리는 바다 사정에따라 약 1.5키로 - 2키로 사이예상<br>
                    4. 카메라 장비가 있을경우 중간에 릴스타임이 있습니다<br>
                    5. 촬영된 영상은 인스타그램 댓글/DM 으로 신청하세요<br><br>
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

            <button type="submit" class="btn btn-primary w-100">신청</button>
        </form>
        <table class="table mt-3">
            <tbody>
            <tr v-for="(item, index) in apiData.slice().reverse()" :key="item.key"> <!-- key를 index로 사용 -->
                <!--<td style="width:20px;">-->
                <!--    <input class="form-check-input" type="checkbox" v-model="item.checked" @change="updateChecked(item)" style="font-size:16px">-->
                <!--</td> -->
                <td style="width:20px;">{{ apiData.length - index  }}</td> <!-- 번호를 1부터 시작하도록 설정 -->
                <td style="width:100px;">{{ item.name }}</td>
                <td>
                    <span v-if="item.affiliation === '기타'">{{ item.otherAffiliation }}</span>
                    <span v-else>{{ item.affiliation }}</span>
                </td>
                <td>{{ item.ok }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { getDatabase, ref, onValue } from "firebase/database"; // Firebase SDK에서 필요한 모듈을 임포트합니다.

export default {
    data(){
        return {
            apiUrl : "https://bonobono-e6ed4-default-rtdb.asia-southeast1.firebasedatabase.app/open_water.json",
            formData  :{
                checked      :'',
                name      :'',
                affiliation     :'',
                otherAffiliation:'',
                ok:'',
                liabilityAgreement: ''
            },
            apiData:[],
            result   :'',
            applicantCount: 0, // 전역 변수 초기화
            errorMessage:'',
            db: null, // 데이터베이스 참조 추가
        };
    },
    mounted(){
        this.db = getDatabase(); // Firebase 데이터베이스 초기화
        this.getData();
        // 데이터 변경 감지를 위해 리스너 추가
        const dataRef = ref(this.db, 'open_water'); // cheering 경로에 대한 참조
        onValue(dataRef, (snapshot) => {
            const getData = snapshot.val() || {};
            this.apiData = Object.keys(getData)
                .filter(key => key !== 'open_water_exemptCount') // exemptCount를 제외
                .map(key => ({
                    key: key, // Firebase에서의 고유 키
                    ...getData[key] // 나머지 데이터
                }));
        });
    },
    beforeUnmount() {
    },
    methods:{
        updateChecked(item) {
            if (item) {
                this.$axios.put(`${this.apiUrl.replace('.json', '')}/${item.key}.json`, {
                    ...item, // 기존 데이터와 checked 상태 포함
                    checked: item.checked // checked 속성을 포함하여 업데이트
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
            const { name, affiliation, ok, liabilityAgreement } = this.formData;

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
            if (!ok) {
                this.showMessage("장소 시간 한번더 확인!!!", 3);
                this.$refs.sizeSelect.focus(); // 수업 선택 드롭다운에 포커스
                this.$refs.sizeSelect.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 입력 필드로 부드럽게 스크롤
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

        getData(){
            this.$axios.get(this.apiUrl).then(response => {
                const apiData = response.data || {};
                this.apiData = Object.keys(apiData)
                    .filter(key => key !== 'open_water_exemptCount') // exemptCount를 제외
                    .map(key => ({
                        key: key, // Firebase에서의 고유 키
                        ...apiData[key] // 나머지 데이터
                    })
                );
                console.log(' this.apiData',  this.apiData)
            }).catch(error => {
                console.error("신청자 목록 가져오기 오류:", error);
            });
        },
        submitForm(){
            if(!this.validateForm()){
                return;
            }

            const bearData = {
                checked         :this.formData.checked,
                name            :this.formData.name,
                affiliation     :this.formData.affiliation,
                otherAffiliation:this.formData.otherAffiliation,
                ok              :this.formData.ok,
                liabilityAgreement: this.formData.liabilityAgreement // 면책 동의 추가
            };

            this.$axios.post(this.apiUrl, bearData).then(() => {
                this.result = '너 나의 동료가 되라! 완료!';
                alert(this.result)
                this.getData(); // 신청자 목록 갱신
                this.formData = {
                    checked: '',
                    name : '',
                    affiliation     :'',
                    otherAffiliation:'',
                    ok           :'',
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
    }
};
</script>

<style>
/* 스타일 추가 (예: form 스타일링) */
</style>
