import {Alert, TextStyle} from 'react-native';

type CustomAlertProps = {
  message: string;
  textStyle?: TextStyle;
};

const CustomAlert = ({message}: CustomAlertProps) => {
  Alert.alert('Error', message, [{text: 'OK', style: 'cancel'}], {
    cancelable: false,
  });
};

export default CustomAlert;
