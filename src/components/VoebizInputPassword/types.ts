import { Input } from "reactstrap";

export interface IInputPassword {
  /**
   * Element input id
   */
  idInput?: string;
  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Element icon preview on id
   */
  idPreviewOn?: string;
  /**
   * Element icon preview off id
   */
  idPreviewOff?: string;
  /**
   * Error msg id
   */
  idErrorMsg?: string;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Label text
   */
  textLabel?: string;
  /**
   * Disabled flag
   */
  disabled?: boolean;
  /**
   * Is wrong
   */
  error?: boolean;
  /**
   * AczipCodet only numbers
   */
  onlyNumbers?: boolean;
  /**
   * Error message for input validation
   */
  errorMessageList?: string[];
  /**
   * Element ref
   */
  ref?: React.RefObject<Input>;
  /**
   * Element ref
   */
  innerRef?: React.RefObject<HTMLInputElement>;
  /**
   * Flip the value to clean
   */
  flipFlopClear?: boolean;
  /**
   * Typing event
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Key pressing event
   */
  onKeyPress?: (event: React.KeyboardEvent) => void;
  /**
   * On focus event
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * On blur event
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * On paste event
   */
  onPaste?: (event: React.ClipboardEvent<HTMLInputElement>) => void;
}
