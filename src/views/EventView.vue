<template>
    <div>
        <h2 class="page_title mb-4">bonobono Adieu 2024</h2>
        <img src="@/assets/image/event_main.jpg" class="img-fluid" alt="썸네일" />
        <br><br><br>
        <p>　　＊　'　*　.★　＊　　'＊　　　*<br>＊　　.　'　　+:..:+ 　　　 ' 　＊<br>.　　　＊　　☆☆☆　＊　Merry '　　.<br>　　*　　'　+:...+....:+　　Christmas<br>'　　　　'　☆☆☆☆☆　　　＊　'　　<br>　＊　＊　+:...:+＠+:...:+ 　　　'　　*<br>＊　.　　.☆☆☆☆☆☆☆ ＊　'　*　.<br>　　.　　+:..:+&amp;+:...:+:...:+ <br>　*　.　☆☆☆☆☆☆☆☆☆　＊　'　　　*<br>'　.　　+:...:+♡+:...:+§+:..:+<br>.　*　☆☆☆☆☆☆☆☆☆☆☆　　'　*<br>　　.+:..:+♡+:..:+@+:..:+♡+:..:+<br>　.　　　　　.　▨ 　 '　' ＊　　　　　*<br>　　　.　*　　　　　　.　　　.　　' <br>　 ,·´ ¸,·´`) <br>　(¸,·´　(¸＊♥Merry Christmas &amp;<br>　　　　　　　　　　Happy New Year ♥〃´`)</p>
        📣📣 보노보노 송년의밤 신청마감 📣📣<br>
        <div style="background: linear-gradient(90deg, #ff9a9e, #fad0c4, #fbc2eb, #f6d365, #fdc830);
          background-size: 400% 400%;
          animation: gradientAnimation 6s ease infinite;
          margin: 10px 0;
          padding: 20px 10px;
          border-radius: 5px;
          color: #000;
          font-weight: bold;">
            1. 날자 : 앞으로 해도 1221 뒤로해도 1221<br>
            2. 장소 : 우리 집앞 동네 말고 동래구 동래<br>
            3. 최종 24인 한정판 굿즈 제공<br>
            4. 드레스코드 : 블랙, 그린, 레드 3종세트 <br>
            5. 파티용품 : 머리띠, 선글라스 개인지참 <br>
        </div>
        ! 문의사항은 인스타그램 댓글/DM 으로 남겨주세요.<br>
        <br><br><br><br><br>
        <!--<form @submit.prevent="submitForm">-->
        <!--    <div class="mb-3">-->
        <!--        <label for="name" class="form-label fw-bold">이름</label>-->
        <!--        <input type="text" class="form-control" id="name" v-model="formData.name" ref="nameInput">-->
        <!--        <p class="text-danger mt-2" v-if="errorMessage[1] === 1">{{errorMessage[0]}}</p>-->
        <!--    </div>-->
        <!--    <div class="mb-3">-->
        <!--        <label class="form-label fw-bold">소속</label>-->
        <!--        <div>-->
        <!--            <div class="form-check d-inline-block me-3"> &lt;!&ndash; d-inline-block을 사용하여 인라인 블록으로 설정 &ndash;&gt;-->
        <!--                <input class="form-check-input" type="radio" name="affiliation" id="bonobono" value="보노보노" v-model="formData.affiliation" ref="affiliationRadios">-->
        <!--                <label class="form-check-label" for="bonobono">보노보노</label>-->
        <!--            </div>-->
        <!--            <div class="form-check d-inline-block me-3"> &lt;!&ndash; d-inline-block을 사용하여 인라인 블록으로 설정 &ndash;&gt;-->
        <!--                <input class="form-check-input" type="radio" name="affiliation" id="shoulder" value="어깨탈골" v-model="formData.affiliation">-->
        <!--                <label class="form-check-label" for="shoulder">어깨탈골</label>-->
        <!--            </div>-->
        <!--            <div class="form-check d-inline-block"> &lt;!&ndash; d-inline-block을 사용하여 인라인 블록으로 설정 &ndash;&gt;-->
        <!--                <input class="form-check-input" type="radio" name="affiliation" id="swimmy" value="스위미" v-model="formData.affiliation">-->
        <!--                <label class="form-check-label" for="swimmy">스위미</label>-->
        <!--            </div>-->

        <!--            &lt;!&ndash; 기타 옵션 &ndash;&gt;-->
        <!--            <div class="form-check mt-3 d-flex align-items-center"> &lt;!&ndash; d-flex 클래스를 사용하여 flexbox로 정렬 &ndash;&gt;-->
        <!--                <input class="form-check-input" type="radio" name="affiliation" id="other" value="기타" v-model="formData.affiliation">-->
        <!--                <label class="form-check-label me-2" for="other">기타</label> &lt;!&ndash; 오른쪽 마진 추가 &ndash;&gt;-->
        <!--                <input-->
        <!--                    type="text"-->
        <!--                    class="form-control"-->
        <!--                    v-model="formData.otherAffiliation"-->
        <!--                    placeholder="ex) 고수정 친구"-->
        <!--                    :disabled="formData.affiliation !== '기타'"-->
        <!--                    style="width: auto; flex-grow: 1;"-->
        <!--                >-->
        <!--            </div>-->
        <!--        </div>-->
        <!--        <p class="text-danger mt-2" v-if="errorMessage[1] === 2">{{errorMessage[0]}}</p>-->
        <!--    </div>-->
        <!--    <div class="mb-3">-->
        <!--        <label for="openClass" class="form-label fw-bold">참석시간</label>-->
        <!--        <select class="form-select" id="openClass" v-model="formData.openClass" ref="openClassSelect">-->
        <!--            <option value="" disabled>참석시간을 알려주세요</option>-->
        <!--            <option value="5시참석">5시참석</option>-->
        <!--            <option value="6시참석">6시참석</option>-->
        <!--            <option value="7시참석">7시참석</option>-->
        <!--            <option value="8시참석">8시참석</option>-->
        <!--            <option value="9시참석">9시참석</option>-->
        <!--            <option value="10시참석">10시 고마집에가소</option>-->
        <!--        </select>-->
        <!--        <p class="text-danger mt-2" v-if="errorMessage[1] === 3">{{errorMessage[0]}}</p>-->
        <!--    </div>-->
        <!--    <div style="background:#f6faff; border:1px solid #eee; border-radius: 2px; padding:10px; margin: 30px 0">-->
        <!--        <label class="form-label fw-bold">송년회 안내 (필독)</label>-->
        <!--        <p style="font-size:12px;">-->
        <!--            1. 드레스코드 : 블랙, 그린, 레드 3종세트<br>-->
        <!--            2. 파티용품 : 머리띠, 선글라스 개인지참<br>-->
        <!--            3. 노쇼방지 : 회비 4매논 선입금<br>-->
        <!--            4. 경품 추첨 이씀<br>-->
        <!--            <span class="text-bg-info">5. 참석자 전원 한정판 보노보노 굿즈 무료증정</span><br>-->
        <!--            <br>-->
        <!--            ! 문의사항은 인스타그램 댓글/DM 으로 남겨주세요.-->
        <!--        </p>-->
        <!--    </div>-->
        <!--    <div class="mb-3">-->
        <!--        <label class="form-label fw-bold">면책 동의</label>-->
        <!--        <div class="d-flex justify-content-end">-->
        <!--            <div class="form-check me-3">-->
        <!--                <input class="form-check-input" type="radio" name="liabilityAgreement" id="agree" value="agree" v-model="formData.liabilityAgreement" ref="agreeRadio">-->
        <!--                <label class="form-check-label" for="agree">동의</label>-->
        <!--            </div>-->
        <!--            <div class="form-check">-->
        <!--                <input class="form-check-input" type="radio" name="liabilityAgreement" id="disagree" value="disagree" v-model="formData.liabilityAgreement">-->
        <!--                <label class="form-check-label" for="disagree">비동의</label>-->
        <!--            </div>-->
        <!--        </div>-->
        <!--        <div class="form-control mt-2" style="font-size: 11px; height: 100px; overflow-y: auto; border: 1px solid #ced4da; padding: 0.375rem 0.75rem; border-radius: 0.25rem; white-space: pre-wrap;">-->
        <!--            보노보노물보노 동호회(이하 "보노")는 개인의 개별가입과 동시에 "보노"에서 개최하는 모든 행사 및 모임관련 일체(온.오프라인) 행사에 . 본인의  개인정보를 수집 · 이용함을 설명 · 안내 받았으며, "보노"에서 정보를 제공하는 일체의 활동에 대해 면책 동의가 적용된다 것에 동의한다. (게스트: 보노회원이 동반한 회원의 지인 포함)<br>-->
        <!--            <br>-->
        <!--            이 면책 동의서는 "보노" 모임 시작과 동시에 효력이 발생하며 "보노"에서 주최하는 모든 모임의 안전사고와 재해사고 및 재해 사망사고 시 일체의 책임(민,형사상)을 본 동호회 운영진과 회원 및 모든 참가자에게 그 책임을 전가하지 못하며 또한 본인 이외에 법적 대리인(직계존속 등)도 그 책임을 본 동호회에 전가하지 아니한다. 사고자는 본인의 자발적인 동호회행사에 참가하였으며, 모든 책임은 본인의 과실로 인정한다.(게스트: 회원이 동반한 회원의 지인에게도 동일하게 적용됨)<br>-->
        <!--            <br>-->
        <!--            비록 자필서명이 없더라도 면책동의 후 행사신청 또는 참석 시 본 동호회에 면책동의를 한것으로 간주한다.<br>-->
        <!--            이에 각 개인은 면책동의에 대한  설명 · 안내 받았으며, 상기의 면책동의서 사항에 다시 한번 동의함을 확인한다.<br>-->
        <!--        </div>-->
        <!--        <p class="text-danger mt-2" v-if="errorMessage[1] === 4">{{errorMessage[0]}}</p>-->





        <!--    </div>-->

        <!--    <button type="submit" class="btn btn-primary w-100">신청</button>-->


        <!--    <div style="background:#f6faff; border:1px solid #eee; border-radius: 2px; padding:10px; margin: 30px 0">-->
        <!--        <label class="form-label fw-bold">입금 계좌번호 안내</label> <button type="button" class="btn btn-sm btn-outline-secondary" @click="copyAccountNumber" style="font-size:10px">계좌번호 복사</button>-->
        <!--        <p class="highlighted-text" ref="accountText">79420390777 카카오뱅크 배하정 (보노보노) 40,000원</p>-->
        <!--        <div class="refund-policy">-->
        <!--            <p>※ 환불규정</p>-->
        <!--            <ul>-->
        <!--                <li>장소대관을 위해 노쇼방지! 낙장불입! 환불불가!</li>-->
        <!--            </ul>-->
        <!--        </div>-->

        <!--    </div>-->
        <!--</form>-->
        <table class="table mt-3">
            <tbody>
            <tr v-for="(item, index) in apiData.slice().reverse()" :key="item.key"> <!-- key를 index로 사용 -->
                <td style="width:20px;">
                    <input class="form-check-input" type="checkbox" v-model="item.checked" @change="updateChecked(item)" style="font-size:16px">
                </td> <!-- 번호를 1부터 시작하도록 설정 -->
                <td style="width:20px;">{{ apiData.length - index  }}</td> <!-- 번호를 1부터 시작하도록 설정 -->
                <td style="width:60px;">{{ item.name }}</td>
                <td>
                    <span v-if="item.affiliation === '기타'">{{ item.otherAffiliation }}</span>
                    <span v-else>{{ item.affiliation }}</span>
                </td>
                <td style="width: 110px">{{ item.openClass }}</td>
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
import { getDatabase, ref, onValue } from "firebase/database"; // Firebase SDK에서 필요한 모듈을 임포트합니다.

export default {
    data(){
        return {
            apiUrl : "https://bonobono-e6ed4-default-rtdb.asia-southeast1.firebasedatabase.app/event.json",
            formData  :{
                checked      :'',
                name      :'',
                affiliation     :'',
                otherAffiliation:'',
                paid   :"",
                openClass           :'',
                liabilityAgreement: ''
            },
            apiData:[],
            result   :'',
            applicantCount: 0, // 전역 변수 초기화
            errorMessage: [],
            db: null, // 데이터베이스 참조 추가

        };
    },
    mounted(){
        this.db = getDatabase(); // Firebase 데이터베이스 초기화
        this.getData();
        // 데이터 변경 감지를 위해 리스너 추가
        const dataRef = ref(this.db, 'event'); // cheering 경로에 대한 참조
        onValue(dataRef, (snapshot) => {
            const getData = snapshot.val() || {};
            this.apiData = Object.keys(getData)
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
                this.showMessage("늦게오면 손해...", 3);
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

        getData(){
            this.$axios.get(this.apiUrl).then(response => {
                const apiData = response.data || {};
                this.apiData = Object.keys(apiData)
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

            const applicantData = {
                checked         :this.formData.checked,
                name            :this.formData.name,
                affiliation     :this.formData.affiliation,
                otherAffiliation:this.formData.otherAffiliation,
                paid            :false,
                openClass         :this.formData.openClass,
                liabilityAgreement: this.formData.liabilityAgreement // 면책 동의 추가
            };

            this.$axios.post(this.apiUrl, applicantData).then(() => {
                this.errorMessage = []
                this.result = '너 너의 동료가 되라! 완료!';
                alert(this.result)
                this.getData(); // 신청자 목록 갱신
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
            const accountText = '79420390777 카카오뱅크 40,000원'

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
@keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}
</style>
