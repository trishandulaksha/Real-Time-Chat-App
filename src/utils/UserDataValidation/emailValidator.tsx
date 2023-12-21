import {emailDomain, numberChar, simpleChar} from './validateChar';

export const emailValidator = (
  data: string,
  setErrMsg: (errMsg: string[]) => void,
  setErr: (err: boolean) => void,
  setCanSubmit: (err: boolean) => void,
) => {
  const trimText = data.trim();
  const dataForCheck = String(trimText).split('@');

  if (dataForCheck.includes(' ') || dataForCheck.length <= 0) {
    setCanSubmit(true);
    setErr(true);
    setErrMsg(['Email cannot contain spaces.']);
  } else if (dataForCheck.length === 2) {
    const validChar = simpleChar.concat(numberChar);
    const tempErrMsg: string[] = [];
    const userName = dataForCheck[0].split('');
    const validCharCheck: boolean[] = [];
    userName.forEach(userNameChar => {
      let userNameValid = true;
      validChar.forEach(vChar => {
        if (userNameChar === vChar) {
          userNameValid = false;
        }
      });
      validCharCheck.push(userNameValid);
    });

    if (validCharCheck.includes(true)) {
      setCanSubmit(true);
      setErr(true);
      tempErrMsg.push('user name of the email address is not valid');
    }

    let emailValid = false;
    emailDomain.forEach(domain => {
      if (domain === dataForCheck[1]) {
        emailValid = true;
      }
    });

    if (!emailValid) {
      setCanSubmit(true);
      setErr(true);
      tempErrMsg.push('domain of the email is not valid');
    }

    if (tempErrMsg.length > 0) {
      setErr(true);
      setCanSubmit(true);
      setErrMsg(tempErrMsg);
    }
  } else {
    setCanSubmit(true);
    setErr(true);
    setErrMsg(['Please enter a valid email address']);
  }
};
