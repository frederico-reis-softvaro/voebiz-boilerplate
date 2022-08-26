import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

export interface IItem {
  id?: string;
  labelId?: string;
  key?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  label?: string;
  href?: string;
  disabled?: boolean;
  value?: any;
}

interface ModalItemListInterface {
  list: Array<IItem>;
  type?: "check" | "arrow";
}
const ModalItemList: React.FC<ModalItemListInterface> = ({ list, type = "arrow", children }) => {
  const history = useHistory();
  const { t } = useTranslation("summary");

  return (
    <ul className="smls-modal-list" data-testid="modal-list">
      {list.map((item) => {
        if (item.label) {
          return (
            <li key={`index-key${item.key}-${item.id}`} className="smls-modal-item">
              <div
                className={`smls-modal-range ${item.disabled ? " disabled" : ""}${
                  !item.value && !item.disabled ? " current" : ""
                }`}
                onClick={(e) => {
                  if (item.onClick) {
                    item.onClick(e);
                  }
                  if (!item.onClick && !item.disabled) {
                    history.push(item.href || "");
                  }
                }}
              >
                <div className="smls-modal-text">
                  <label id={item.id} htmlFor="smls-modal-sub" className="smls-modal-label">
                    {t(item.label)}
                  </label>
                  {item.value && (
                    <p id={item.labelId} className="smls-modal-sub">
                      {item.value}
                    </p>
                  )}
                  {!item.value && !item.disabled && <p id={item.labelId} className="smls-modal-sub" />}
                </div>
                <i className={`material-icons ${item.value ? "checked" : ""}`}>
                  {type === "arrow" ? "keyboard_arrow_right" : "done"}
                </i>
              </div>
              <hr />
            </li>
          );
        }
        return <div />;
      })}
      {children}
    </ul>
  );
};

export default ModalItemList;
