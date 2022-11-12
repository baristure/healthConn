import * as FontAwesome from "react-icons/fa";

export default function Card({ children, icon, title, description }) {
  const Icon = FontAwesome[icon];
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-md shadow-md overflow-hidden w-full">
      <div className="flex-1 items-center justify-center bg-white p-6 flex flex-col w-full">
        <div className="flex-1">
          <div className="flex flex-col mt-2 items-center justify-center">
            {icon && (
              <div className="h-10 w-10 bg-contrast-5 rounded-full flex items-center justify-center">
                <Icon className="block h-5 w-5 text-primary" />
              </div>
            )}
            {title && (
              <h5 className="text-xl m-6 mb-0 font-medium text-contrast-90 text-center">
                {title}
              </h5>
            )}
            {description && (
              <p className="text-sm text-contrast-50 m-6 text-center">
                {description}
              </p>
            )}
          </div>
        </div>

        {children && <div>{children}</div>}
      </div>
    </div>
  );
}
