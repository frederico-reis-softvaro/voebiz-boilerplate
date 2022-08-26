import React from "react";

interface RegisterContentInterface {
  text?: any;
  label?: string;
  className?: string;
  idMessage: string;
}

const RegisterContent: React.FC<RegisterContentInterface> = ({ text, label, children, idMessage }) => {
  return (
    <>
      <div className="voebiz-register">
        <div className={`voebiz-register_content `}>
          <div className="voebiz-register_content_default fadeIn">
            {text && (
              <p className="voebiz-register_content_default_description" id={idMessage}>
                {text}
              </p>
            )}
            <h3 className="voebiz-register_content_default_label">{label}</h3>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default RegisterContent;
