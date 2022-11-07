const MissionUtils = require('@woowacourse/mission-utils');

//console.log(MissionUtils.Random.pickNumberInList([1, 2, 3]));
// console.log(MissionUtils.Random.pickUniqueNumbersInRange(1, 10, 3));
//랜덤으로 지정해 3숫자 변수에 저장
//숫자를 선택해주세요 하고 사용자가 3개의 숫자 입력
//결과 출력 하고 -> 못맞췄으면 다시 숫자 3개 입력하게 or 맞췄으면 계속/끝 1,2 입력하게
//끝(2) 선택하면 종료
//다시(1) 선택하면 숫자다시 랜덤으로 지정하고 처음부터
// MissionUtils.Console.readLine('닉네임을 입력해주세요.', (answer) => {
//   console.log(`닉네임: ${answer}`);
//   if (answer) {
//     MissionUtils.Console.close();
//   }
// });
// 이름 입력시 종료

/* 
0. npm start 시 app.play 실행
1. 컴퓨터가 숫자 정하기
2. 사용자한테 숫자 입력하라고 하기
3. 사용자 숫자 받기
4. 사용자 숫자 계산
5. 리턴값 출력
5-1. 틀리면 그에 맞는 결과 출력
5-2. 맞추면 '3개의 숫자를 모두 맞히셨습니다! 게임 종료'
5-3. 또 '게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.' 출력
6. 1하면 다시 반복, 2하면 종료
*/

class App {
  constructor() {
    this.correctAnswer = this.setNumber();
  }
  play() {
    this.print('숫자 야구 게임을 시작합니다.');
    console.log(this.correctAnswer);
    this.selectNumber();
  }
  print(str) {
    return MissionUtils.Console.print(str);
  }
  setNumber() {
    return MissionUtils.Random.pickUniqueNumbersInRange(1, 9, 3);
  }
  selectNumber() {
    MissionUtils.Console.readLine('숫자를 입력해주세요 : ', (answer) => {
      const checkNumber = /[^0-9]/g;
      const checkNumberOver = false;
      for (let i = 0; i < answer.length; i++) {
        const answerCopy = [...answer];
        const splice = answerCopy.splice(i, 1);
        console.log(answerCopy.includes(splice));
        if (answerCopy.includes(splice)) {
          checkNumberOver = true;
          console.log('하이', checkNumberOver);
        }
      }
      if (
        !(answer.length === 3) ||
        checkNumber.test(answer) ||
        checkNumberOver
      ) {
        // 숫자가 아니거나, 글자수가 3보다 적고 크면 thow문 사용하여 예외 처리
        //!애플리케이션 종료
        this.gameOver();
      } else {
        const result = this.solve(answer);
        console.log(result);
        if (result[1] === 3) {
          this.print('3개의 숫자를 모두 맞히셨습니다! 게임 종료');
          return this.reStart();
        } else {
          result[1] === 0 && result[0] === 0
            ? this.print('낫싱')
            : this.print(`${result[0]}볼 ${result[1]}스트라이크`);
          this.selectNumber();
        }
      }
    });
  }

  reStart() {
    MissionUtils.Console.readLine(
      '게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.',
      (answer) => {
        if (answer === '2') {
          this.gameOver();
        } else if (answer === '1') {
          this.correctAnswer = this.setNumber();
          this.selectNumber();
        }
      }
    );
  }
  solve(numbers) {
    const copyCorrectAnswer = this.correctAnswer;
    const userAnswer = [...numbers];
    const checkStrike = copyCorrectAnswer.filter(
      (el, idx) => el != userAnswer[idx]
    );
    const strike = 3 - checkStrike.length;
    let ball = 0;
    userAnswer.forEach((el) => checkStrike.includes(Number(el)) && ball++);
    return [ball, strike];
  }
  gameOver() {
    return MissionUtils.Console.close();
  }
}
const app = new App();
app.play();

module.exports = App;
