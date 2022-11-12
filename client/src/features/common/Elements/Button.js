export default function Button(props) {
  const sizeClass =
    props.size === "xl"
      ? "btn-xl"
      : props.size === "lg"
      ? "btn-lg"
      : props.size === "md"
      ? "btn-md"
      : props.size === "sm"
      ? "btn-sm"
      : props.size === "xs"
      ? "btn-xs"
      : "btn-md";

  const colorClass =
    props.color === "primary"
      ? "btn-primary"
      : props.color === "primary-soft"
      ? "btn-primary-soft"
      : props.color === "success"
      ? "btn-success"
      : props.color === "success-soft"
      ? "btn-success-soft"
      : props.color === "warning"
      ? "btn-warning "
      : props.color === "warning-soft"
      ? "btn-warning-soft "
      : props.color === "error"
      ? "btn-error"
      : props.color === "error-soft"
      ? "btn-error-soft"
      : props.color === "gray"
      ? "btn-gray"
      : "btn-primary";

  const formClass =
    props.form === "square"
      ? "btn-square"
      : props.form === "rounded"
      ? "btn-rounded"
      : "btn-square";

  const hoverClass =
    props.hover === "primary"
      ? "hover-primary"
      : props.hover === "success"
      ? "hover-success"
      : props.hover === "warning"
      ? "hover-warning"
      : props.hover === "error"
      ? "hover-error"
      : props.hover === "gray"
      ? "hover-gray"
      : "hover-opacity";

  const outlineClass = props.outline ? "btn-outline" : null;

  const disabledClass = props.disabled && "opacity-50 hover:!opacity-50";

  return (
    // <div>
    <button
      className={`btn ${sizeClass} ${colorClass} ${formClass} ${outlineClass} ${disabledClass} ${hoverClass} ${props.className}`}
      type={props.type}
      onClick={props.callback}
      disabled={props.disabled}
      tabIndex="-1"
    >
      {props.loading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      <span className="whitespace-nowrap flex items-center">
        {props.children}
      </span>
    </button>
    // </div>
  );
}
