<template>
    <div class="training-card">
        <h3>뭐하는 덴고?</h3>

        <p>🏊‍♂️ 보노보노는 말이죠</p>

        <ol>
            <li>
                <strong>수영 동호회 입니다.</strong>
                <ul>
                    <li>보노보노는 수영을 사랑하는 사람들이 모인 활기찬 수영 동호회입니다.</li>
                    <li>성인을 대상으로 하며 만 20 세부터 50세까지 참여할 수 있습니다.</li>
                    <li>신청 조건 으로는 IM 기준 3분이내 완영 가능자 입니다. </li>
                    <li>자세한 내용은 회원가입 페이지에서 확인하세요</li>
                </ul>
            </li>
            <li>
                <strong>정기모임</strong>
                <ul>
                    <li>정기적인 오프라인 수영 모임을 중심으로 현직 강사님의 강습을 받을 수 있습니다.</li>
                    <li>매주 2,4주 토/일요일 이며 일정은 변동성이 있으니 확인후 참여 부탁드립니다.</li>
                    <li>훈련 신청은 정기모임 메뉴에서 확인할 수 있습니다.</li>
                </ul>
            </li>
            <li>
                <strong>번개모임</strong>
                <ul>
                    <li>수영 외에 바다수영, 러닝, 헬스 등 다양한 운동 모임을 즐길 수 있습니다.</li>
                    <li>운동을 목적으로 회원들끼리 자유롭게 모임에 참가 할 수있습니다.</li>
                    <li>번개모임은 주로 카톡방내 투표에서 진행됩니다.</li>
                </ul>
            </li>
            <li>
                <strong>대회참석</strong>
                <ul>
                    <li>수영대회, 마라톤, 철인삼종 경기에 참가할 수 있습니다.</li>
                    <li>수영대회의 경우 메이저 대회를 목표로 훈련하고 참가하고 있습니다.</li>
                    <li>수영 이외의 대회에도 회원들끼리 모여 참가할 수 있습니다.</li>
                </ul>
            </li>
            <li>
                <strong>공동구매</strong>
                <ul>
                    <li>공동구매를 통해 고품질의 운동용품을 보다 합리적인 가격에 구매 할 수 있습니다.</li>
                    <li>물품 수령은 오프라인 모임에서 수령이 가능합니다.</li>
                </ul>
            </li>
            <li>
                <strong>회원제 운영</strong>
                <ul>
                    <li>회원제 운영으로 연회원은 연 4만원, 월회원은 월 5천원으로 활동 가능 합니다.</li>
                    <li>회원제가 부담스러운 분은 게스트로 1회 참석하여 체험 할 수 있습니다.</li>
                </ul>
            </li>
        </ol>
        <div class="col-12 p-1">
            <div
                class="boxstyle6"
                style="font-size: 20px; "
                @click="$router.push('/signup')"
            >
                보노보노 회원신청
            </div>
        </div>

        <p class="contact">❗ 문의: 010-3637-6693 (황영균)</p>

    </div>
</template>

<style lang="scss">
$card-bg: rgb(246, 250, 255);
$card-border: #e1e5ea;
$primary-color: #007BFF;
$highlight-color: #ff4d4f;

.training-card {
    max-width: 600px;
    margin: 30px auto;
    padding: 25px 30px;
    background-color: $card-bg;
    border: 1px solid $card-border;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    font-family: 'Noto Sans KR', sans-serif;
    color: #333;
    line-height: 1.6;

    h3 {
        font-size: 1.8rem;
        color: $primary-color;
        margin-bottom: 20px;
        text-align: center;
    }

    p {
        font-size: 1rem;
        margin: 5px 0;

        &.contact {
            color: $highlight-color;
            font-weight: 700;
            margin-top: 15px;
        }
    }

    ol {
        margin: 15px 0;
        padding-left: 20px;

        li {
            margin-bottom: 15px;

            strong {
                font-weight: 700;
                color: $primary-color;
                display: block;
                margin-bottom: 5px;
            }

            ul {
                padding-left: 20px;
                list-style-type: disc;

                li {
                    font-weight: 400;
                    margin-bottom: 3px;
                }
            }
        }
    }
}

// 모바일 반응형
@media (max-width: 480px) {
    .training-card {
        padding: 20px;

        h3 {
            font-size: 1.5rem;
        }

        p, ol li ul li {
            font-size: 0.95rem;
        }
    }
}
</style>
<script setup lang="ts">
</script>