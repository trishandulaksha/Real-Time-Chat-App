import {capitalChar, simpleChar} from './validateChar';

export const userNameValidator = (
  text: string,
  setErrMsg: (errMsg: string[]) => void,
  setErr: (err: boolean) => void,
  setCanSubmit: (err: boolean) => void,
) => {
  const trimText = text.trim();
  const dataForCheck = String(trimText).split('');

  const validChar = simpleChar.concat(capitalChar);

  if (dataForCheck.includes(' ') || dataForCheck.length <= 0) {
    setCanSubmit(true);
    setErr(true);
    setErrMsg(['User name cannot contain spaces.']);
  } else if (dataForCheck.length > 0) {
    const validDataCheck: boolean[] = [];
    dataForCheck.forEach(checkData => {
      let valid = true;
      validChar.forEach(vChar => {
        if (checkData === vChar) {
          valid = false;
        }
      });
      validDataCheck.push(valid);
    });

    if (validDataCheck.includes(true)) {
      setCanSubmit(true);
      setErr(true);
      setErrMsg(['User name can contain only simple and capital letters.']);
    }
  }
};
