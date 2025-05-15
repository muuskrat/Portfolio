import { motion } from "framer-motion";
import { FaMusic, FaHome, FaFilePdf } from "react-icons/fa";
import resume from '../assets/Mario_Orlando_Resume.pdf';
import { useSound } from '../components/useSound';
import openSound from '../assets/button_click.wav';
import closeSound from '../assets/button_close.wav';

const buttons = [
  { label: "home", id: "MainPage", icon: <FaHome /> },
  { label: "jazz.mp3", id: "Music", icon: <FaMusic /> },
];

export default function ButtonPanel({ openWindow }) {
  const openResume = () => {
    window.open("/resume.pdf", "_blank");
  };

  const playOpen = useSound(openSound);
  const playClose = useSound(closeSound);

  return (
    <div className="button-panel">
      {buttons.map(({ label, id, icon }) => (
        <motion.button
          key={id}
          whileHover={{
            scale: 1.0,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          }}
          transition={{ duration: 0.1 }}
          className="windows-button"
          onClick={() => {playOpen(); openWindow(id);}}
        >
          <span className="icon">{icon}</span>
          <span className="label">{label}</span>
        </motion.button>
      ))}

      <motion.button
        whileHover={{
          scale: 1.0,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        }}
        transition={{ duration: 0.05 }}
        className="windows-button"
        onClick={() => window.open(resume, "_blank")}
      >
        <span className="icon"><FaFilePdf /></span>
        <span className="label">resume</span>
      </motion.button>
    </div>
  );
}
