import { useMemo, useRef, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { Button } from "../../common/Elements";
import { useTranslation } from "react-i18next";
const Note = ({ txt }) => {
  const { t } = useTranslation();
  return (
    <div className="fixed bottom-0 m-auto p-4 bg-white opacity-90 pointer-events-none">
      <strong>{t("note")}: </strong> {txt}
    </div>
  );
};

export const AppointmentDetailReview = ({
  date,
  userType,
  rating,
  comment,
  doctorNote,
  onReviewSet,
  onDoctorNoteSet,
}) => {
  const { t } = useTranslation();
  const textAreaRef = useRef(document.createElement("textarea"));
  const [ratingValue, setRatingValue] = useState(null);

  const onReviewSubmit = () => {
    onReviewSet({ rating: ratingValue, comment: textAreaRef.current.value });
  };
  const isAppointmentCompleted = useMemo(() => {
    return new Date() > new Date(date);
  }, [date]);

  if (!isAppointmentCompleted) {
    if (userType === "patient") {
      return (
        <Note
          txt={t("you.have.to.wait.to.review.until.the.appointment.is.done")}
        />
      );
    }
    if (userType === "doctor") {
      return (
        <Note
          txt={t(
            "you.have.to.wait.to.add.notes.for.your.patient.until.the.appointment.is.done"
          )}
        />
      );
    }
    return null;
  }
  if (userType === "patient") {
    if (rating === null) {
      // Editable
      return (
        <div className="flex flex-col items-center">
          <Rating
            initialValue={ratingValue}
            readonly={false}
            size={36}
            showTooltip={true}
            onClick={setRatingValue}
          />
          <p>{t('patient.comments')}</p>
          <textarea
            className="mb-4"
            style={{ minHeight: 20, maxHeight: 240 }}
            rows={4}
            cols={50}
            ref={textAreaRef}
          />
          <Button callback={onReviewSubmit}>{t("save")}</Button>
        </div>
      );
    }
    // readonly
    return (
      <div className="flex flex-col items-center">
        <Rating
          initialValue={rating}
          readonly
          size={36}
          showTooltip
        />
        <textarea
          className="mb-4"
          readOnly
          disabled
          value={comment}
          style={{ minHeight: 20, maxHeight: 240 }}
          rows={4}
          cols={50}
          ref={textAreaRef}
        />
      </div>
    );
  }
  if (userType !== "doctor") {
    return <div>{t("error")}</div>;
  }
  const isEditable = doctorNote === null;
  return (
    <div className="mx-auto max-w-2xl px-4 pt-4 sm:px-6 lg:max-w-7xl lg:px-8  w-full">
      <h1 className="text-xl font-bold tracking-tight text-gray-900 text-center">
        {t("doctor.notes")}
      </h1>
      <div className="mt-4 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <div className="lg:col-span-2"></div>
        <section className="lg:col-span-8 w-full">
          <ul className="divide-y divide-gray-200 border-t border-gray-200 w-full">
            <li className="flex py-4 sm:py-10 w-full">
              <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6 w-full">
                <div className="relative sm:pr-0 w-full">
                  <div>
                    <div className="mt-1 flex text-base w-full">
                      {isEditable ? (
                        <textarea
                          style={{ minHeight: 80, maxHeight: 240 }}
                          value={undefined}
                          ref={textAreaRef}
                          rows={24}
                          cols={50}
                        />
                      ) : (
                        <textarea
                          style={{ minHeight: 80, maxHeight: 240 }}
                          value={doctorNote}
                          readOnly
                          disabled
                          rows={24}
                          cols={50}
                        />
                      )}
                      <Button
                        disabled={!isEditable}
                        callback={() =>
                          onDoctorNoteSet(textAreaRef.current.value)
                        }
                        className="ml-4"
                      >
                        {t("save")}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </section>
        <div className="lg:col-span-2"></div>
      </div>
    </div>
  );
};
