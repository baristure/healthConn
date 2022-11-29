import * as FontAwesome from "react-icons/fa";
import { Rating } from "react-simple-star-rating";

export default function Card({
  children,
  icon,
  img,
  title,
  description,
  className,
  initialRating,
  position
}) {
  const Icon = FontAwesome[icon];
  return (
    <div
      className={`flex flex-col items-center justify-center bg-white rounded-md shadow-md overflow-hidden w-full ${className}`}
    >
      <div className="flex-1 items-center justify-center bg-white p-6 flex flex-col w-full">
        <div className="flex-1">
          <div className={`flex ${position || "flex-col"} mt-2 items-center justify-center`}>
            {icon && (
              <div className="h-10 w-10 bg-contrast-5 rounded-full flex items-center justify-center">
                <Icon className="block h-5 w-5 text-primary" />
              </div>
            )}
            {img && (
              <img
                className="h-32 w-32 bg-contrast-5 rounded-full flex items-center justify-center"
                src={img}
                alt={img}
              />
            )}
            {title && (
              <h5 className="text-xl m-6 mb-0 font-medium text-contrast-90 text-center">
                {title}
              </h5>
            )}
            {description && (
              <p className="text-md text-contrast-50 m-2 text-center">
                {description}
              </p>
            )}
            {initialRating && (
              <Rating
                initialValue={initialRating}
                readonly={true}
                allowFraction={true}
                size={15}
                showTooltip={true}
              />
            )}
          </div>
        </div>

        {children && <div>{children}</div>}
      </div>
    </div>
  );
}
