import {capitalChar, numberChar, simpleChar, symbolChar} from './validateChar';

const passwordCharCheckFunction = (
  password: string[],
  checkCharset: string[],
) => {
  let state = false;
  password.forEach(pwData => {
    checkCharset.forEach(chData => {
      if (pwData === chData) {
        if (!state) {
          state = true;
        }
      }
    });
  });
  return state;
};

let enteredPasssword = '';

export const passwordValidator = (
  data: string,
  setErrMsg: (errMsg: string[]) => void,
  setErr: (err: boolean) => void,
  setCanSubmit: (err: boolean) => void,
) => {
  const trimPassword = data.trim();
  const dataForCheck = String(trimPassword).split('');
  enteredPasssword = trimPassword;

  if (trimPassword.length > 8) {
    const tempErrMsg = [];
    const simpleCharState = passwordCharCheckFunction(dataForCheck, simpleChar);
    const capitalCharState = passwordCharCheckFunction(
      dataForCheck,
      capitalChar,
    );
    const symbolCharState = passwordCharCheckFunction(dataForCheck, symbolChar);
    const numberCharState = passwordCharCheckFunction(dataForCheck, numberChar);

    if (!simpleCharState) {
      tempErrMsg.push('Password must be a at least one simple character');
    }
    if (!capitalCharState) {
      tempErrMsg.push('Password must be a at least one capital character');
    }
    if (!symbolCharState) {
      tempErrMsg.push('Password must be a at least one symbol character');
    }
    if (!numberCharState) {
      tempErrMsg.push('Password must be a at least one number character');
    }
    if (tempErrMsg.length > 0) {
      setErr(true);
      setCanSubmit(true);
      setErrMsg(tempErrMsg);
    }
  } else {
    setCanSubmit(true);
    setErr(true);
    setErrMsg(['Password length must be 8 characters.']);
  }
};

// CONFIRM PASSWORD VALIDATOR
export const confirmPasswordValidator = (
  data: string,
  setErrMsg: (errMsg: string[]) => void,
  setErr: (err: boolean) => void,
  setCanSubmit: (err: boolean) => void,
) => {
  if (enteredPasssword !== data) {
    setCanSubmit(true);
    setErr(true);
    setErrMsg(['Password does not match.']);
  }
};
