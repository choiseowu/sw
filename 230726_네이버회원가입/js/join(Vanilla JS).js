document.querySelectorAll('input').forEach(function(input){
  input.addEventListener('focus', function(){
    this.parentNode.classList.add('border-act');
  })
})

document.querySelectorAll('input').forEach(function(input){
  input.addEventListener('focusout', function(){
    this.parentNode.classList.remove('border-act');
  })
})

let idveri = pwveri = pwchkveri = nameveri = birthveri = genderveri = phoneveri = addressveri = false;
let mailveri = true;
// Essential Information
let essnInfo = '<span class="text-red">필수 정보입니다.</span>'



// 아이디
document.querySelector('.userid input').addEventListener('focusout', function(){
  let userId = this.value;
  let idExp = /^[a-z0-9]{5,8}$/
  let idWarn = document.querySelector('.userid .warn');

  if(userId.length == 0) {
    idWarn.innerHTML = essnInfo;
  } else if(!idExp.test(userId)) {
    // 정규식에 맞지 않을 때 = 조건이 참 
    idWarn.innerHTML = '<span class="text-red>5~8자의 영문 소문자만 사용 가능</span>'
  } else {
    // 위 조건에 둘 다 해당하지 않고 값을 잘 입력했을 때 
    idveri = true;
    idWarn.innerHTML = '<span class="text-green">멋진 아이디네요!</span>'
  }
})

let userPw = document.querySelector('.userpw input');

// 비밀번호
userPw.addEventListener('focusout', function(){
  let userPwVal = userPw.value;
  let pwExp = /^[A-Za-z0-9`~!@#\$%\^&\*\(\)\{\}\[\]\-_=\+\\|;:'"<>,\./\?]{8,20}$/

  let pwWarn = document.querySelector('.userpw .warn');
  let pwText = document.querySelector('.userpw .inputbox p');
  let pwImg = document.querySelector('.userpw .inputbox img');

  if(userPwVal.length == 0){
    pwWarn.innerHTML = essnInfo;
    // pwText 내용 비우기
    pwText.innerHTML = '';
    pwImg.src = './images/m_icon_pw_step_01.png'
  } else if(!pwExp.test(userPwVal)) {
    pwWarn.innerHTML = '<span class="text-red">8~20자 영문 대 소문자, 숫자, 특수문자를 사용하세요.</span>'
    pwText.innerHTML = '<span class="text-red">사용불가</span>'
    pwImg.src = './images/m_icon_pw_step_10.png'
  } else {
    pwveri = true;
    pwWarn.innerHTML = '';
    pwText.innerHTML = '<span class="text-green">안전</span>'
    pwImg.src = './images/m_icon_pw_step_04.png'
  }
})


// 비밀번호 재확인
document.querySelector('.userpw-chk input').addEventListener('focusout', function(){
  let userpwChk = this.value;
  let pwChkWarn = document.querySelector('.userpw-chk .warn');
  let pwChkImg = document.querySelector('.userpw-chk .inputbox img');

  if(userpwChk.length == 0){
    pwChkWarn.innerHTML = essnInfo;
  } else if(userpwChk == userPw.value){
    pwChkveri = true;
    pwChkWarn.innerHTML = '';
    pwChkImg.src = './images/m_icon_pw_step_07.png';
  } else {
    // 입력은 했는데 .userpw value랑 일치하지 않을 때 
    pwChkWarn.innerHTML = '<span class="text-red">비밀번호가 일치하지 않습니다.</span>'
    pwChkImg.src = './imges/m_icon_pw_step_02.png';
  }
})


// 이름 
document.querySelector('.username input').addEventListener('focusout', function(){
  let userName = this.value;
  let nameExp = /^[가-힣]{2,5}$/;
  let nameWarn = document.querySelector('.username .warn');

  if(userName.length == 0) {
    nameWarn.innerHTML = essnInfo;
  } else if(!nameExp.test(userName)) {
    nameWarn.innerHTML = '<span class="text-red">2~5글자 사이의 한글로 입력하세요.</span>'
  } else {
    nameveri = true;
    nameWarn.innerHTML = '';
  }
})



// 생년월일

let birthList = document.querySelectorAll('.birth-item');
function birthWarnTxt (text){
  document.querySelector('.birth .warn').innerHTML = `<span class="text-red">${text}</span>`
}

birthList.forEach(function(item){
  item.addEventListener('focusout', function(){
    let year = birthList[0].value;
    let month = birthList[1].value;
    let date = birthList[2].value;

    let now = new Date();
    let nowstamp = now.getTime();
    now = now.getFullYear();

    let birth = new Date(year, month, date);
    birth = birth.getTime();

    if(year.length != 4) {
      birthWarnTxt('태어난 년도 4자리를 정확하게 입력하세요.');
    } else if(month.length == 0) {
      birthWarnTxt('태어난 월을 선택하세요.');
    } else if(date.length == 0 || date > 31 || date <= 0 ) {
      birthWarnTxt('태어난 일(날짜) 2자리를 정확하게 입력하세요.')
    } else if(isNaN(year * month * date)){
      birthWarnTxt('생년월일을 다시 확인해주세요.');
    } else if( now - year > 100) {
      birthWarnTxt('정말이세요?');
    } else if( nowstamp < birth) {
      birthWarnTxt('미래에서 오셨군요 ^^');
    } else {
      birthveri = true;
      birthWarnTxt('');
    }
  })
})



// 성별
let genderInputs = document.querySelectorAll('.gender .inputbox');


genderInputs.forEach(function(input){
  input.addEventListener('click',function(){
    genderInputs.forEach(function(item){
      item.classList.remove('btn-primary');
      item.querySelector('input[type="radio"]').checked = false;
    })

    genderveri = true;
    this.classList.add('btn-primary');
    this.querySelector('input[type="radio"]').checked = true;
  })
})



// 본인 확인 이메일
document.querySelector('.usermail input').addEventListener('focusout', function(){
  let userMail = this.value;
  let mailExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  let mailWarn = document.querySelector('.usermail .warn');

  if(userMail.length == 0) {
    mailWarn.innerHTML = '';
  } else if(!mailExp.test(userMail)) {
    mailWarn.innerHTML = '<span class="text-red">이메일 주소를 다시 확인해주세요.</span>';
  } else {
    mailWarn.innerHTML = '';
  }
})



// 휴대전화
let numWarn = document.querySelector('.phone .warn');

document.querySelector('.phonenum input').addEventListener('focusout', function(){
  let phoneNum = this.value;

  if(phoneNum.length == 0) {
    numWarn.innerHTML = essenInfo;
  } else {
    numWarn.innerHTML = '';
  }
})

document.getElementById('veribtn').addEventListener('click', function(){
  let phoneNum = document.querySelector('.phonenum input').value;
  phoneNum = phoneNum.replace(/[^0-9]/g, '');
  document.querySelector('.phonenum input').value = phoneNum;
  let veriText = document.getElementById('veritext');

  let phoneLeng;
  if(phoneNum.length < 10 || phoneNum.length > 11) {
    phoneLeng = false;
  } else {
    phoneLeng = true;
  }

  let phoneNaN;
  if(isNaN(phoneNum)) {
    phoneNaN = false;
  } else {
    phoneNaN = true;
  }

  
  if(phoneLeng && phoneNaN) {
    numWarn.innerHTML = '<span class="text-green">인증번호가 발송되었습니다.</span>';
    veriText.parentNode.classList.remove('disinput');
    veriText.disabled = false;
  } else {
    numWarn.innerHTML = '<span class="text-red">형식에 맞지 않는 번호입니다.</span>'
    veriText.parentNode.classList.add('disinput');
    veriText.disabled = true;
  }
})