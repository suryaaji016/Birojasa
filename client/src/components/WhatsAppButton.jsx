import React from "react";
import "./WhatsAppButton.css";
import { WHATSAPP_NUMBER } from "../config";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = ({
  phone = WHATSAPP_NUMBER,
  message = "Halo, saya ingin bertanya tentang layanan Anda.",
}) => {
  const encoded = encodeURIComponent(message);
  const href = `https://wa.me/${phone}?text=${encoded}`;

  return (
    <a
      className="whatsapp-button"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
    >
      <FaWhatsapp className="whatsapp-icon" size={28} color="white" />
    </a>
  );
};

export default WhatsAppButton;
