import React from "react";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t, i18n } = useTranslation();
  const dir = i18n.language === "ar" ? "rtl" : "ltr";

  return (
    <div
      className="max-w-6xl mx-auto px-4 py-8 font-sans text-gray-800 "
      dir={dir}
    >
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">{t("about")} </h1>
        {/* animated svg still undone  */}
      </div>
      <div className="mb-12 leading-relaxed ">
        <p>{t("header")}</p>
        {/* <p className="mt-4">
         خطوة بخطوة، نضمن لك تجربة سلسة وآمنة من البداية إلى النهاية

        </p> */}
      </div>

      <div className="flex flex-col md:flex-row-reverse  gap-8 mb-12">
        <div className="md:w-1/2">
          <div className="rounded-lg shadow-md overflow-hidden w-full h-auto relative group">
            <img
              src="https://tradesmenonline.co.uk/wp-content/uploads/2025/09/tradesmen1-1024x683.png"
              alt="حرفيون أثناء العمل"
              className="rounded-lg shadow-md w-full h-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
              loading="lazy"
            />
          </div>
        </div>

        <div className="md:w-1/2 ">
          <h2 className="text-3xl font-bold mb-4">{t("services")}</h2>
          <ol className="space-y-4 pr-4">
            <li>
              <strong>1.</strong> {t("services1")}
            </li>
            <li>
              <strong>2.</strong> {t("services2")}{" "}
            </li>
            <li>
              <strong>3.</strong> {t("services3")}
            </li>
          </ol>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-8 mb-12">
        {[
          {
            svg: (
              <svg
                aria-hidden="true"
                className="e-font-icon-svg e-fas-user-tie"
                viewBox="0 0 448 512"
                width="24"
                height="24"
                fill="#372b70"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136 32-56h-96l32 56-32 136-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z" />
              </svg>
            ),
            label: t("label1"),
          },
          {
            svg: (
              <svg
                aria-hidden="true"
                className="e-font-icon-svg e-fas-phone-alt"
                viewBox="0 0 512 512"
                width="20"
                height="20"
                fill="#372b70"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" />
              </svg>
            ),
            label: t("label2"),
          },
          {
            svg: (
              <svg
                aria-hidden="true"
                className="e-font-icon-svg e-fas-star"
                viewBox="0 0 576 512"
                width="20"
                height="20"
                fill="#372b70"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
              </svg>
            ),
            label: t("label3"),
          },
          {
            svg: (
              <svg
                aria-hidden="true"
                className="e-font-icon-svg e-fas-handshake "
                viewBox="0 0 640 512"
                width="24"
                height="24"
                fill="#372b70"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M434.7 64h-85.9c-8 0-15.7 3-21.6 8.4l-98.3 90c-.1.1-.2.3-.3.4-16.6 15.6-16.3 40.5-2.1 54.6 12.7 13.9 39.4 17.6 56.1 2.7.1-.1.3-.1.4-.2l79.9-73.2c6.5-5.9 16.7-5.5 22.6 1 6 6.5 5.5 16.6-1 22.6l-26.1 23.9L504 313.8c2.9 2.4 5.5 5 7.9 7.7V128l-54.6-54.6c-5.9-6-14.1-9.4-22.6-9.4zM544 128.2v223.9c0 17.7 14.3 32 32 32h64V128.2h-96zm48 223.9c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zM0 384h64c17.7 0 32-14.3 32-32V128.2H0V384zm48-63.9c8.8 0 16 7.2 16 16s-7.2 16-16 16-16 7.2-16 16c0-8.9 7.2-16 16-16zm435.9 18.6L334.6 217.5l-30 27.5c-29.7 27.1-75.2 24.5-101.7-4.4-26.9-29.4-24.8-74.9 4.4-101.7L289.1 64h-83.8c-8.5 0-16.6 3.4-22.6 9.4L128 128v223.9h18.3l90.5 81.9c27.4 22.3 67.7 18.1 90-9.3l.2-.2 17.9 15.5c15.9 13 39.4 10.5 52.3-5.4l31.4-38.6 5.4 4.4c13.7 11.1 33.9 9.1 45-4.7l9.5-11.7c11.2-13.8 9.1-33.9-4.6-45.1z" />
              </svg>
            ),
            label: t("label4"),
          },
        ].map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span>{item.svg}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4 ">{t("why us")}</h2>
        <div className=" space-y-4 mb-6">
          <p>
            <strong>{t("title")}</strong> {t("why1")}
          </p>
          <p>{t("why2")}</p>
          <p>{t("why3")}</p>
        </div>
        <div className="text-center">
          <img
            src="https://tradesmenonline.co.uk/wp-content/uploads/2025/09/tradesmen3-1024x372.jpg"
            alt="فريق عمل يراجع مخططات"
            className="w-full h-auto h-[200px] rounded-none shadow-none mt-6 mb-6"
            loading="lazy"
          />
        </div>
      </div>

      <div className=" mb-10">
        <h2 className="text-3xl font-bold mb-4">{t("tradeTitle")}</h2>
        <div className="space-y-4">
          <p>"{t("tradeHeader")}"</p>

          <p>{t("trade1")}</p>

          <p>{t("trade2")}</p>
          <p>{t("trade3")}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
