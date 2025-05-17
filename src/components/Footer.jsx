import React from "react";

function Footer({ isDetailsOpen }) {
  return (
    <footer
      className={`text-center text-stone-200 dark:text-stone-700 ${
        isDetailsOpen ? "static" : "absolute"
      } bottom-2 left-0 right-0`}
    >
      copyright 2024 Doubles by{" "}
      <a
        href='https://patriciosalazar.dev'
        target='_blank'
        className='text-stone-200 dark:text-stone-700 underline hover:text-stone-400'
      >
        Patricio Salazar
      </a>
    </footer>
  );
}

export default Footer;
