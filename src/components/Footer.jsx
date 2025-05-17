import React from "react";

function Footer({ isDetailsOpen }) {
  return (
    <footer
      className={`text-center ${
        isDetailsOpen ? "static" : "absolute"
      } bottom-2 left-0 right-0`}
    >
      <small>
        copyright 2024-present Doubles by{" "}
        <a
          href='https://patriciosalazar.dev'
          target='_blank'
          className='underline text-inherit hover:text-blue-500'
        >
          Patricio Salazar
        </a>
      </small>
    </footer>
  );
}

export default Footer;
