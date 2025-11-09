"use client";
import styles from "./studiox3D.module.css";
import { createElement, useEffect, useRef, useState } from "react";

interface ModelViewerProps {
  src?: string;
  alt?: string;
  "auto-rotate"?: boolean | string;
  "camera-controls"?: boolean | string;
  "rotation-per-second"?: string;
  "interaction-prompt"?: string;
  "disable-zoom"?: boolean | string;
  "disable-pan"?: boolean | string;
  exposure?: string;
  className?: string;
  ref?: React.Ref<any>;
}

const ModelViewer = (props: ModelViewerProps) => {
  const { ref, ...restProps } = props;
  return createElement("model-viewer", { ...restProps, ref });
};

const Studiox3D = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const modelViewerRef = useRef<any>(null);

  // Timer for detecting when the camera is idle
  const idleTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // *** NEW ***
  // This is the "flag" to prevent our reset logic from triggering itself.
  const isResettingRef = useRef(false);

  // Load model-viewer on client side only (avoids SSR issues)
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("@google/model-viewer").then(() => {
        setIsLoaded(true);
      });
    }
  }, []);

  useEffect(() => {
    if (!isLoaded || !modelViewerRef.current) return;

    const mv = modelViewerRef.current;
    const INITIAL_ORBIT = "0deg 75deg 105%";
    const IDLE_TIMEOUT_MS = 300; // How long to wait after camera stops moving

    // This is the function that performs the actual reset
    const resetCamera = () => {
      isResettingRef.current = true; // Set flag: "We are resetting"
      mv.cameraOrbit = INITIAL_ORBIT;
      mv.autoRotate = true;

      // After a tiny delay, clear the flag.
      // This gives time for the 'camera-change' event from the orbit snap to pass.
      setTimeout(() => {
        isResettingRef.current = false;
      }, 100);
    };

    // 1. When interaction starts, stop auto-rotate and clear any pending reset
    const handleInteractionStart = () => {
      isResettingRef.current = false; // Stop any pending reset
      clearTimeout(idleTimerRef.current);
      mv.autoRotate = false;
    };

    // 2. When the camera moves, this event fires.
    const handleCameraChange = () => {
      // If we are currently resetting OR if we are auto-rotating,
      // ignore this event completely.
      if (isResettingRef.current || mv.autoRotate) {
        return;
      }

      // If we're here, it means the user is interacting or coasting.
      // Clear any old timer and set a new one.
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(resetCamera, IDLE_TIMEOUT_MS);
    };

    // Set initial orbit once
    mv.cameraOrbit = INITIAL_ORBIT;

    mv.addEventListener("interaction-start", handleInteractionStart);
    mv.addEventListener("camera-change", handleCameraChange);

    // Cleanup
    return () => {
      clearTimeout(idleTimerRef.current);
      mv.removeEventListener("interaction-start", handleInteractionStart);
      mv.removeEventListener("camera-change", handleCameraChange);
    };
  }, [isLoaded]);
  return (
    <section className="studiox-web" aria-labelledby="3d-experience-heading">
      <div className="container">
        <div className={styles.studiox3DWrapper}>
          <div className={styles.studiox3DModelWrapper}>
            {isLoaded ? (
              <ModelViewer
                ref={modelViewerRef}
                src="/studiox_cube_glb_v5.glb"
                alt="Interactive 3D product visualization - rotate to explore"
                auto-rotate
                camera-controls
                rotation-per-second="-10deg"
                interaction-prompt="none"
                disable-zoom
                disable-pan
                className={styles.modelViewer}
                exposure="1"
                aria-label="Interactive 3D product model"
              />
            ) : (
              <div className={styles.placeholder} aria-label="Loading 3D model" />
            )}
            <div className={styles.studiox3DRotateWrapper}>
              <span aria-hidden="true">
                <svg
                  id="Capa_1"
                  data-name="Capa 1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 402 402"
                  aria-hidden="true"
                >
                  <defs></defs>
                  <path
                    d="M402,200.96c0-34.8-50.8-64-125.36-75.76C264.96,51.12,235.76,0,200.96,0s-64,51.2-75.76,125.36C49.44,136.96,0,166.64,0,200.96s51.2,64,125.28,75.68c11.68,74.16,40.88,125.36,75.68,125.36,9.94-.21,19.49-3.92,26.96-10.48,3.42-2.81,3.93-7.86,1.12-11.28s-7.86-3.93-11.28-1.12c-4.62,4.19-10.57,6.62-16.8,6.88-22.88,0-48-41.44-59.04-106.96,19.59,2.32,39.31,3.47,59.04,3.44,19.73.03,39.45-1.12,59.04-3.44-1.89,11.24-4.35,22.37-7.36,33.36l-10.16-16.4c-2.48-3.65-7.46-4.61-11.11-2.12-3.43,2.33-4.51,6.9-2.49,10.52l19.52,31.36.56.64.64.72.96.8.72.48,1.28.56h.64c.69.09,1.39.09,2.08,0,1.08-.03,2.14-.27,3.12-.72l37.04-17.28c4.1-1.65,6.08-6.32,4.42-10.41s-6.32-6.08-10.41-4.42c-.36.15-.71.32-1.05.52l-20.16,9.92c3.39-13.02,6.06-26.21,8-39.52,74.56-12.08,125.76-41.28,125.76-76.08ZM279.04,141.92c65.92,11.44,106.96,36.32,106.96,59.04s-41.52,48-107.04,59.04h-.08c2.38-19.59,3.58-39.31,3.6-59.04.03-19.73-1.12-39.45-3.44-59.04ZM122.96,260h-.08c-65.44-11.04-106.88-36.16-106.88-59.04,0-24.8,43.68-48,106.96-59.12-4.61,39.25-4.61,78.91,0,118.16ZM262.56,262.48h-.08c-20.42,2.68-41,4.02-61.6,4-20.57.02-41.12-1.32-61.52-4-5.29-40.87-5.29-82.25,0-123.12l10-1.2c4.42-.46,7.62-4.42,7.16-8.84-.46-4.42-4.42-7.62-8.84-7.16l-5.76.72c11.04-65.44,36.16-106.88,59.04-106.88s48,41.44,59.04,106.96c-10-1.2-20.32-2.08-31.04-2.64l12.4-12.48c3.12-3.14,3.1-8.21-.04-11.32s-8.21-3.1-11.32.04l-26,26.24c-.24.33-.46.68-.64,1.04-.33.4-.63.83-.88,1.28-.18.47-.31.95-.4,1.44-.05.51-.05,1.01,0,1.52-.05.51-.05,1.01,0,1.52-.04.48-.04.96,0,1.44.22.51.48.99.8,1.44.16.36.35.71.56,1.04l26,31.6c2.59,3.58,7.6,4.37,11.17,1.78s4.37-7.6,1.78-11.17c-.2-.27-.41-.53-.63-.77l-15.28-18.8c12.59.64,24.59,1.73,36,3.28,2.68,20.42,4.01,41,4,61.6.02,20.54-1.29,41.07-3.92,61.44Z"
                    fill="#FFFFFF"
                  ></path>
                </svg>
              </span>
              <p className={styles.studiox3DRotate}>Rotate in 360°</p>
            </div>
          </div>
          <div className={styles.studiox3DContentWrapper}>
            <h2 className={styles.studiox3DTitle} id="3d-experience-heading">
              Decades of 3D Experience. One Scalable Platform
            </h2>
            <p className={styles.studiox3DDescription}>
              With years of hands-on experience in high-precision 3D modeling,
              we’ve helped top brands bring their products to life from STEP and
              CAD files. That expertise led us to create Studio<sup>X</sup>, a
              rendering platform built to deliver speed, accuracy, and
              scalability. From expert 3D Modeling to on-demand, photorealistic
              visuals, Studio<sup>X</sup> combines everything we’ve learned into
              one powerful, browser-based solution.
            </p>
            <div className={styles.studiox3DIconsWrapper}>
              <div className={styles.studiox3DIconsItem}>
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    opacity="0.7"
                    cx="44"
                    cy="44"
                    r="20"
                    fill="#6441A5"
                  ></circle>
                  <path
                    d="M48.6805 25.5156H18.5305C18.0886 25.5156 17.7305 25.8738 17.7305 26.3156V38.6106C17.7305 39.0525 18.0886 39.4106 18.5305 39.4106H48.6805C49.1223 39.4106 49.4805 39.0525 49.4805 38.6106V26.3156C49.4805 25.8738 49.1223 25.5156 48.6805 25.5156Z"
                    fill="white"
                  ></path>
                  <path
                    d="M42.0759 32.7053V10.4403L33.2059 1.57031H8.72594C6.57594 1.57031 4.83594 3.31031 4.83594 5.46031L4.84594 44.9753C4.84594 47.1253 6.58594 48.8653 8.73594 48.8653H37.7359C40.1309 48.8653 42.0759 46.9253 42.0759 44.5253V32.7003V32.7053Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M33.207 1.57031V10.4403H42.077"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M22.1577 36.2152C21.7127 36.0152 21.3627 35.7352 21.1127 35.3802C20.8627 35.0252 20.7277 34.6152 20.7227 34.1502H21.9127C21.9527 34.5502 22.1177 34.8852 22.4077 35.1602C22.6977 35.4352 23.1177 35.5702 23.6727 35.5702C24.2277 35.5702 24.6227 35.4352 24.9277 35.1702C25.2327 34.9052 25.3877 34.5652 25.3877 34.1502C25.3877 33.8252 25.2977 33.5602 25.1177 33.3552C24.9377 33.1502 24.7127 32.9952 24.4427 32.8902C24.1727 32.7852 23.8127 32.6702 23.3527 32.5452C22.7877 32.4002 22.3377 32.2502 21.9977 32.1052C21.6577 31.9602 21.3677 31.7302 21.1277 31.4152C20.8877 31.1002 20.7677 30.6802 20.7677 30.1502C20.7677 29.6852 20.8877 29.2752 21.1227 28.9152C21.3577 28.5552 21.6927 28.2802 22.1227 28.0802C22.5527 27.8802 23.0427 27.7852 23.5977 27.7852C24.3977 27.7852 25.0527 27.9852 25.5627 28.3852C26.0727 28.7852 26.3627 29.3152 26.4277 29.9752H25.2027C25.1627 29.6502 24.9927 29.3602 24.6877 29.1102C24.3877 28.8602 23.9877 28.7352 23.4877 28.7352C23.0227 28.7352 22.6427 28.8552 22.3477 29.0952C22.0527 29.3352 21.9077 29.6752 21.9077 30.1052C21.9077 30.4152 21.9927 30.6702 22.1727 30.8652C22.3477 31.0602 22.5627 31.2102 22.8227 31.3102C23.0827 31.4102 23.4427 31.5302 23.9077 31.6602C24.4727 31.8152 24.9227 31.9702 25.2677 32.1202C25.6127 32.2702 25.9027 32.5052 26.1477 32.8202C26.3927 33.1352 26.5127 33.5602 26.5127 34.1002C26.5127 34.5152 26.4027 34.9102 26.1827 35.2752C25.9627 35.6402 25.6377 35.9402 25.2027 36.1702C24.7677 36.4002 24.2577 36.5152 23.6727 36.5152C23.0877 36.5152 22.6077 36.4152 22.1627 36.2152H22.1577Z"
                    fill="black"
                  ></path>
                  <path
                    d="M33.4011 27.9004V28.8054H31.0761V36.4304H29.9611V28.8054H27.6211V27.9004H33.4011Z"
                    fill="black"
                  ></path>
                  <path
                    d="M35.8845 28.8056V31.6556H38.9945V32.5756H35.8845V35.5156H39.3595V36.4356H34.7695V27.8906H39.3595V28.8106H35.8845V28.8056Z"
                    fill="black"
                  ></path>
                  <path
                    d="M46.0258 32.1653C45.5408 32.6353 44.8008 32.8703 43.8058 32.8703H42.1658V36.4353H41.0508V27.9053H43.8058C44.7708 27.9053 45.5008 28.1353 46.0008 28.6053C46.5008 29.0703 46.7558 29.6703 46.7558 30.4053C46.7558 31.1403 46.5108 31.7053 46.0258 32.1753V32.1653ZM45.1758 31.5453C45.4708 31.2753 45.6158 30.8903 45.6158 30.3953C45.6158 29.3403 45.0108 28.8153 43.8058 28.8153H42.1658V31.9503H43.8058C44.4258 31.9503 44.8808 31.8153 45.1758 31.5453Z"
                    fill="black"
                  ></path>
                </svg>
                <p>Share your STEP file</p>
              </div>
              <div className={styles.studiox3DIconsItem}>
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    opacity="0.7"
                    cx="44"
                    cy="20"
                    r="20"
                    fill="#DA4524"
                  ></circle>
                  <path
                    d="M15.9102 59.9206V32.4229"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M46.3532 26.3558L46.5852 53.6426L16.4579 60.3642C16.1063 60.4345 15.7478 60.3642 15.4525 60.1603L3.02187 50.4787V28.233L3.00781 23.0794M46.3532 26.3558L31.0821 17.8906L3.00781 23.0864L15.9095 32.4375L46.3532 26.3558Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M4.98047 31.0566L8.13733 33.1589"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M5.45312 36.7031L9.39745 39.5436"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M11.5781 41.4326L13.4835 42.7755"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M10.5234 35.2793L13.4975 37.2128"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M5.11719 42.5439L7.65534 44.6462"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M5.58984 48.1924L9.53417 51.0258"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M11.7109 52.9346L13.6163 54.2845"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M10.4531 47.0029L12.9983 49.1052"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
                <p>We create a 3D model</p>
              </div>
              <div className={styles.studiox3DIconsItem}>
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    opacity="0.7"
                    cx="44"
                    cy="44"
                    r="20"
                    fill="#6441A5"
                  ></circle>
                  <path
                    d="M46.0258 7.38965H3.97078C2.49618 7.38965 1.30078 8.58505 1.30078 10.0596V40.3746C1.30078 41.8493 2.49618 43.0446 3.97078 43.0446H46.0258C47.5004 43.0446 48.6958 41.8493 48.6958 40.3746V10.0596C48.6958 8.58505 47.5004 7.38965 46.0258 7.38965Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M48.7008 13.6104H1.30078"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M36.94 11.1495C37.3211 11.1495 37.63 10.8406 37.63 10.4595C37.63 10.0785 37.3211 9.76953 36.94 9.76953C36.5589 9.76953 36.25 10.0785 36.25 10.4595C36.25 10.8406 36.5589 11.1495 36.94 11.1495Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M40.9244 11.1495C41.3055 11.1495 41.6144 10.8406 41.6144 10.4595C41.6144 10.0785 41.3055 9.76953 40.9244 9.76953C40.5433 9.76953 40.2344 10.0785 40.2344 10.4595C40.2344 10.8406 40.5433 11.1495 40.9244 11.1495Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M44.8306 11.1495C45.2117 11.1495 45.5206 10.8406 45.5206 10.4595C45.5206 10.0785 45.2117 9.76953 44.8306 9.76953C44.4496 9.76953 44.1406 10.0785 44.1406 10.4595C44.1406 10.8406 44.4496 11.1495 44.8306 11.1495Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M22.125 39.5099V25.5049"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M37.6247 22.4096L37.7397 36.3046L22.3997 39.7246C22.2247 39.7596 22.0397 39.7246 21.8897 39.6246L15.5597 34.6946V20.7446M37.6247 22.4096L29.8497 18.0996L15.5547 20.7446L22.1247 25.5046L37.6247 22.4096Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M16.5586 24.8047L18.1636 25.8747"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M16.8008 27.6797L18.8108 29.1247"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M19.918 30.0898L20.888 30.7748"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M19.3789 26.9551L20.8939 27.9401"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M16.625 30.6592L17.92 31.7292"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M16.8633 33.5342L18.8733 34.9792"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M19.9844 35.9443L20.9544 36.6293"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M19.3438 32.9248L20.6388 33.9948"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
                <p>
                  You render with Studio<sup>X</sup>
                </p>
              </div>
            </div>
            <button className={styles.studiox3DButton} aria-label="Explore our 3D Services">Explore our 3D Services</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Studiox3D;
