import {
  FaCircleCheck,
  FaCircleExclamation,
  FaCircleInfo,
  FaCircleXmark,
} from "react-icons/fa6";

export type IToastType = "info" | "success" | "error" | "warning";

export interface IToast {
  id: number;
  message: string;
  type: IToastType;
}

type ToastProps = {
  message: string;
  onClose: () => void;
  type: IToastType;
};

const alertConfigMap = {
  info: {
    className: "alert-info",
    icon: <FaCircleInfo />,
  },
  success: {
    className: "alert-success",
    icon: <FaCircleCheck />,
  },
  error: {
    className: "alert-error",
    icon: <FaCircleXmark />,
  },
  warning: {
    className: "alert-warning",
    icon: <FaCircleExclamation />,
  },
};

function Toast({ message, type, onClose }: ToastProps) {
  const alertConfig = alertConfigMap[type];

  return (
    <div className={`alert ${alertConfig.className} shadow-lg`} role="alert">
      {alertConfig.icon}

      <p>{message}</p>

      <button className="btn btn-xs" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

export default Toast;
