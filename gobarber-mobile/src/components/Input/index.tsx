import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

/** RefForwardingComponent
 * Utilizar somente no caso de receber o parametro "ref"
 * @param param0 { name, icon, ...rest }
 * @param ref // recebe a referencia do outro componente
 */
const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  /** Criar dois estados, que vão anotar quando que o input recebeu o foco e
   * outro quando o input foi preenchido */
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  /** Criar as funções que irão ler/setar os estados */
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    // #region
    /** verifica se o input contem valor seta o preenchimento
     * dessa maneira */
    // if (inputValueRef.current.value) {
    //   setIsFilled(true);
    // } else {
    //   setIsFilled(false);
    // }
    // ou desta maneira, mais simplificada
    // #endregion
    setIsFilled(!!inputValueRef.current.value);
  }, []);

  /* passar parametro do componente filho para o pai
   * de um componente interno para um componente externo */
  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(_ref: any, value) {
        inputValueRef.current.value = value;
        /* essa linha é responsavel por mudar visualmente o texto que está dentro do input */
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    // passagem de parametro para styles. "isFocused"
    <Container isFocused={isFocused} isErrored={!!error}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#ff9000' : '#666360'}
      />

      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

/* quando utilizar RefForwardingComponent deve utilizar tambem o
 * forwardRef(<componente>) no final  */
export default forwardRef(Input);
