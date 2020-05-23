import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>; // recebe o componente como tipo
}

/* pegar todas as props do input, e passar para o componente
 * com spreads "{...rest}"
 * É preciso transformar o nome do componente para nome Proprio "icon:Icon"
 * senão o react não entende como "<Componente />"
 */
const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  // #region useCallback
  /* Sempre que criar uma função dentro de um componente, transformar
   * para "const" e utilizar useCallback para não chamar a função toda vez que o
   * componente é recriado, se não passar nada "[]" só cria uma vez
   */
  // #endregion
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    // #region !!
    /* if (inputRef.current?.value) {
     *   setIsFilled(true);
     * } else {
     *   setIsFilled(false);
     * }
     * os !! transforma a variavel em booleano e simplifica a expressão acima
     */
    // #endregion

    setIsFilled(!!inputRef.current?.value);
  }, []);

  // #region useCallback
  /* Assim garantir que a função seja criada apenas uma vez,
   * independente de quantas vezes o componente atualize, ou
   * mude de estado.
   */
  // #endregion
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size="20" />
        </Error>
      )}
    </Container>
  );
};

export default Input;
