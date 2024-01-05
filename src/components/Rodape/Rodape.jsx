import React from "react";
import "./Rodape.css";

function Rodape() {
  return (
    <>
      <footer>
        <p>&copy; Food love 2024</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1606.7056815829387!2d-49.37329650016962!3d-16.706299596054766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1702695994068!5m2!1spt-BR!2sbr"
          width="400"
          height="400"
          style={{border:0}}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </footer>
    </>
  );
}

export default Rodape;
