import React, { useCallback, useState, useEffect } from "react";
import { Input } from "reactstrap";

import { IInputPassword } from "./types";

export const VoebizInputPassword: React.FC<IInputPassword> = ({
  idInput = "",
  placeholder = "",
  idPreviewOn = "",
  idPreviewOff = "",
  idErrorMsg = "",
  className = "voeBizInput",
  textLabel = "",
  disabled = false,
  error = false,
  onlyNumbers = false,
  errorMessageList = ["Error message1", "Error message2", "Error message3"],
  innerRef,
  ref,
  flipFlopClear,
  onChange,
  onKeyPress,
  onFocus,
  onBlur,
  onPaste,
  ...params
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const mapToCssModules = (cssModule: Array<string | undefined> = []): string => {
    if (!cssModule) {
      return cssModule;
    }

    return cssModule.filter((classNameElement: string | undefined) => !!classNameElement).join(" ");
  };

  const enableOutline = useCallback((e) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  }, []);
  const disableOutline = useCallback((e) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  }, []);

  const handleDebouncedValue = () => {
    const hasValue = value.length > 0;
    setIsTyping(false);
    setIsFilled(hasValue);
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(handleDebouncedValue, 500);
    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [value]);

  useEffect(() => {
    setValue("");
  }, [flipFlopClear]);

  const handleOnChange = useCallback(
    (event) => {
      const text = event.target.value.slice(0, 20);
      let updatedMask = "";
      for (let i = 0; i < 4; i += 1) {
        updatedMask += i < text.length ? " " : "o";
      }

      setIsTyping(true);
      setValue(text);
      onChange &&
        onChange({
          ...event,
          target: {
            value: text,
          },
        });
    },
    [onlyNumbers],
  );

  return (
    <div
      className={mapToCssModules([
        "input-group icon password",
        isVisible ? "visible" : "",
        disabled ? "disabled" : "",
        isTyping ? "typing" : "",
        isFilled ? "filled" : "",
        isFocused ? "input-outline" : "",
        error ? "error" : "",
      ])}
    >
      {textLabel && <label htmlFor={idInput}>{textLabel}</label>}
      <div>
        <Input
          data-testid="password"
          id={idInput}
          className={className}
          disabled={disabled}
          value={value}
          type={isVisible ? "text" : "password"}
          ref={ref}
          onChange={handleOnChange}
          onFocus={enableOutline}
          onBlur={disableOutline}
          onPaste={onPaste}
          onKeyPress={onKeyPress}
          innerRef={innerRef}
          placeholder={placeholder}
          {...params}
        />
        <i
          id={idPreviewOff}
          onClick={() => setIsVisible((prevState) => !prevState)}
          className="material-icons notranslate"
        >
          &#xe8f5;
        </i>
        <i id={idPreviewOn} onClick={() => setIsVisible(() => !isVisible)} className="material-icons notranslate">
          &#xe8f4;
        </i>
        {/* <span id="mask" data-mask={mask} /> */}
      </div>
      <div className="input-error">
        {error && (
          <>
            <i className="material-icons notranslate">&#xe001;</i>
            <div className="password-error-list">
              {errorMessageList.map((item) => {
                return (
                  <label id={idErrorMsg} htmlFor="input-text">
                    {item}
                  </label>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
